'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { calcPoints } from '@/lib/types/database'
import type { PickType } from '@/lib/types/database'

export async function scoreEvent(
  eventId: string,
  officialResult: string
): Promise<{ error?: string; scored?: number }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()
  if (!profile?.is_admin) return { error: 'Admin only.' }

  const result = officialResult.trim()
  if (!result) return { error: 'Enter the official result.' }

  const { data: event, error: evErr } = await supabase
    .from('events')
    .select('id, pick_type, bonus_window, options')
    .eq('id', eventId)
    .single()
  if (evErr || !event) return { error: 'Event not found.' }

  const options: string[] | null = event.options
  if (options && options.length > 0 && !options.includes(result)) {
    return { error: 'Official result must match one of the event options.' }
  }

  // Write result + mark event scored
  const { error: evUpdateErr } = await supabase
    .from('events')
    .update({ official_result: result, status: 'scored', result_confirmed_at: new Date().toISOString() })
    .eq('id', eventId)
  if (evUpdateErr) return { error: evUpdateErr.message }

  // Fetch all locked picks for this event
  const { data: picks, error: picksErr } = await supabase
    .from('picks')
    .select('id, user_id, pick_value, confidence')
    .eq('event_id', eventId)
    .eq('status', 'locked')
  if (picksErr) return { error: picksErr.message }

  let scored = 0
  const affectedUsers = new Set<string>()

  for (const pick of picks ?? []) {
    const correct = pick.pick_value === result
    const points = correct
      ? calcPoints(event.pick_type as PickType, event.bonus_window, pick.confidence ?? 1)
      : 0
    await supabase
      .from('picks')
      .update({ status: correct ? 'correct' : 'incorrect', points_earned: points })
      .eq('id', pick.id)
    affectedUsers.add(pick.user_id)
    scored++
  }

  // Update streaks for each affected user
  for (const userId of affectedUsers) {
    const { data: userPick } = await supabase
      .from('picks')
      .select('status')
      .eq('event_id', eventId)
      .eq('user_id', userId)
      .single()

    const wasCorrect = userPick?.status === 'correct'

    const { data: prof } = await supabase
      .from('profiles')
      .select('current_streak, longest_streak')
      .eq('id', userId)
      .single()

    if (prof) {
      const newStreak = wasCorrect ? prof.current_streak + 1 : 0
      const newLongest = Math.max(prof.longest_streak, newStreak)
      await supabase
        .from('profiles')
        .update({ current_streak: newStreak, longest_streak: newLongest })
        .eq('id', userId)
    }
  }

  revalidatePath('/admin/scoring')
  revalidatePath('/leaderboard')
  revalidatePath('/dashboard')
  return { scored }
}
