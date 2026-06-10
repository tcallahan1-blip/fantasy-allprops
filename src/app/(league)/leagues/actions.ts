'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)
}

export async function createLeague(formData: FormData): Promise<{ error?: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const name = (formData.get('name') as string).trim()
  if (!name || name.length < 2) return { error: 'League name must be at least 2 characters.' }
  if (name.length > 60) return { error: 'League name must be 60 characters or fewer.' }

  const base = slugify(name)
  const slug = `${base}-${Math.random().toString(36).slice(2, 6)}`

  const { data: league, error: leagueErr } = await supabase
    .from('leagues')
    .insert({ name, slug, owner_id: user.id })
    .select('id, slug')
    .single()

  if (leagueErr || !league) return { error: leagueErr?.message ?? 'Failed to create league.' }

  // Auto-join the creator
  await supabase
    .from('league_memberships')
    .insert({ league_id: league.id, user_id: user.id })

  revalidatePath('/leagues')
  redirect(`/leagues/${league.slug}`)
}

export async function joinLeague(token: string): Promise<{ error?: string; slug?: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { data: league, error } = await supabase
    .from('leagues')
    .select('id, slug')
    .eq('invite_token', token)
    .single()

  if (error || !league) return { error: 'Invalid invite link.' }

  const { error: joinErr } = await supabase
    .from('league_memberships')
    .upsert({ league_id: league.id, user_id: user.id }, { onConflict: 'league_id,user_id' })

  if (joinErr) return { error: joinErr.message }

  revalidatePath(`/leagues/${league.slug}`)
  return { slug: league.slug }
}

export async function leaveLeague(leagueId: string): Promise<{ error?: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('league_memberships')
    .delete()
    .eq('league_id', leagueId)
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/leagues')
  redirect('/leagues')
}
