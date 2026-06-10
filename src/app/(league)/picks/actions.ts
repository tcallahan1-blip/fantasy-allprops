'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { CONFIDENCE_BUDGET } from '@/lib/types/database'

export async function upsertPick(
  eventId: string,
  pickValue: string
): Promise<{ error?: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  const trimmed = pickValue.trim()
  if (!trimmed) return { error: 'Enter a value before saving.' }

  const { data: event, error: eventError } = await supabase
    .from('events')
    .select('options, status')
    .eq('id', eventId)
    .single()

  if (eventError || !event) return { error: 'Event not found.' }
  if (event.status !== 'upcoming' && event.status !== 'window_open') {
    return { error: 'Pick window is closed for this event.' }
  }

  const options: string[] | null = event.options
  if (options && options.length > 0 && !options.includes(trimmed)) {
    return { error: 'Pick must be one of the listed options.' }
  }

  const { error } = await supabase
    .from('picks')
    .upsert(
      { user_id: user.id, event_id: eventId, pick_value: trimmed, status: 'draft' },
      { onConflict: 'user_id,event_id' }
    )

  if (error) return { error: error.message }

  revalidatePath('/picks')
  return {}
}

export async function updateConfidence(
  eventId: string,
  confidence: 1 | 2 | 3
): Promise<{ error?: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  if (confidence === 2 || confidence === 3) {
    // Count existing boosts for this user (excluding the current pick being updated)
    const { count: doubleCount } = await supabase
      .from('picks')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('confidence', 2)
      .neq('event_id', eventId)
      .in('status', ['draft', 'locked'])

    const { count: tripleCount } = await supabase
      .from('picks')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('confidence', 3)
      .neq('event_id', eventId)
      .in('status', ['draft', 'locked'])

    if (confidence === 2 && (doubleCount ?? 0) >= CONFIDENCE_BUDGET.double) {
      return { error: `2× boost limit reached (${CONFIDENCE_BUDGET.double} picks).` }
    }
    if (confidence === 3 && (tripleCount ?? 0) >= CONFIDENCE_BUDGET.triple) {
      return { error: `3× boost limit reached (${CONFIDENCE_BUDGET.triple} picks).` }
    }
  }

  const { error } = await supabase
    .from('picks')
    .update({ confidence })
    .eq('user_id', user.id)
    .eq('event_id', eventId)
    .eq('status', 'draft')

  if (error) return { error: error.message }

  revalidatePath('/picks')
  return {}
}

export async function getConfidenceBudget(): Promise<{ double: number; triple: number }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { double: CONFIDENCE_BUDGET.double, triple: CONFIDENCE_BUDGET.triple }

  const [{ count: doubleUsed }, { count: tripleUsed }] = await Promise.all([
    supabase
      .from('picks')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('confidence', 2)
      .in('status', ['draft', 'locked']),
    supabase
      .from('picks')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('confidence', 3)
      .in('status', ['draft', 'locked']),
  ])

  return {
    double: CONFIDENCE_BUDGET.double - (doubleUsed ?? 0),
    triple: CONFIDENCE_BUDGET.triple - (tripleUsed ?? 0),
  }
}
