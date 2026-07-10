'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { SupabaseClient } from '@supabase/supabase-js'
import type {
  EventCategory,
  EventStatus,
  PickType,
  VerificationType,
} from '@/lib/types/database'

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)
}

async function requireAdmin(supabase: SupabaseClient): Promise<{ error?: string }> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()
  if (!profile?.is_admin) return { error: 'Admin only.' }

  return {}
}

interface EventInput {
  name: string
  slug: string
  category: EventCategory
  month: string
  event_date: string | null
  date_tbc: boolean
  pick_type: PickType
  verification: VerificationType
  bonus_window: boolean
  status: EventStatus
  pick_window_opens_at: string | null
  pick_window_closes_at: string | null
  options: string[] | null
  description: string | null
  website_url: string | null
  notes: string | null
}

function parseEventForm(formData: FormData): { input?: EventInput; error?: string } {
  const name = (formData.get('name') as string ?? '').trim()
  if (!name) return { error: 'Name is required.' }

  const slugRaw = (formData.get('slug') as string ?? '').trim()
  const slug = slugify(slugRaw || name)
  if (!slug) return { error: 'Slug is required.' }

  const category = formData.get('category') as EventCategory
  const month = (formData.get('month') as string ?? '').trim()
  if (!month) return { error: 'Month is required.' }

  const pick_type = formData.get('pick_type') as PickType
  const verification = formData.get('verification') as VerificationType
  const status = formData.get('status') as EventStatus

  const eventDateRaw = (formData.get('event_date') as string ?? '').trim()
  const opensAtRaw = (formData.get('pick_window_opens_at') as string ?? '').trim()
  const closesAtRaw = (formData.get('pick_window_closes_at') as string ?? '').trim()

  const optionsRaw = (formData.get('options') as string ?? '').trim()
  const options = optionsRaw
    ? optionsRaw.split('\n').map(o => o.trim()).filter(Boolean)
    : null

  return {
    input: {
      name,
      slug,
      category,
      month,
      event_date: eventDateRaw || null,
      date_tbc: formData.get('date_tbc') === 'on',
      pick_type,
      verification,
      bonus_window: formData.get('bonus_window') === 'on',
      status,
      pick_window_opens_at: opensAtRaw ? new Date(opensAtRaw).toISOString() : null,
      pick_window_closes_at: closesAtRaw ? new Date(closesAtRaw).toISOString() : null,
      options,
      description: (formData.get('description') as string ?? '').trim() || null,
      website_url: (formData.get('website_url') as string ?? '').trim() || null,
      notes: (formData.get('notes') as string ?? '').trim() || null,
    },
  }
}

export async function createEvent(formData: FormData): Promise<{ error?: string }> {
  const supabase = await createClient()
  const adminCheck = await requireAdmin(supabase)
  if (adminCheck.error) return adminCheck

  const { input, error } = parseEventForm(formData)
  if (error || !input) return { error }

  const { error: insertErr } = await supabase.from('events').insert({ ...input, season: 1 })
  if (insertErr) {
    return {
      error: insertErr.code === '23505'
        ? 'An event with that slug already exists.'
        : insertErr.message,
    }
  }

  revalidatePath('/admin/events')
  return {}
}

export async function updateEvent(eventId: string, formData: FormData): Promise<{ error?: string }> {
  const supabase = await createClient()
  const adminCheck = await requireAdmin(supabase)
  if (adminCheck.error) return adminCheck

  const { input, error } = parseEventForm(formData)
  if (error || !input) return { error }

  const { error: updateErr } = await supabase.from('events').update(input).eq('id', eventId)
  if (updateErr) {
    return {
      error: updateErr.code === '23505'
        ? 'An event with that slug already exists.'
        : updateErr.message,
    }
  }

  revalidatePath('/admin/events')
  revalidatePath('/calendar')
  return {}
}

export async function deleteEvent(eventId: string): Promise<{ error?: string }> {
  const supabase = await createClient()
  const adminCheck = await requireAdmin(supabase)
  if (adminCheck.error) return adminCheck

  const { count } = await supabase
    .from('picks')
    .select('id', { count: 'exact', head: true })
    .eq('event_id', eventId)
  if (count && count > 0) {
    return { error: `Can't delete — ${count} pick(s) already reference this event. Cancel it instead.` }
  }

  const { error } = await supabase.from('events').delete().eq('id', eventId)
  if (error) return { error: error.message }

  revalidatePath('/admin/events')
  return {}
}
