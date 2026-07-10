import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendPushToAllUsers } from '@/lib/push'

export const dynamic = 'force-dynamic'

/**
 * Opens and closes event pick windows on schedule (see vercel.json crons).
 * Idempotent — safe to call repeatedly or out of schedule (e.g. a manual
 * catch-up run after downtime just processes whatever is currently overdue).
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()
  const now = new Date().toISOString()

  const { data: opened, error: openErr } = await supabase
    .from('events')
    .update({ status: 'window_open' })
    .eq('status', 'upcoming')
    .lte('pick_window_opens_at', now)
    .select('id, name, slug, pick_type, pick_window_closes_at')

  if (openErr) return NextResponse.json({ error: openErr.message }, { status: 500 })

  let popPropsNotified = 0
  for (const event of opened ?? []) {
    if (event.pick_type !== 'X') continue
    try {
      const closes = event.pick_window_closes_at
        ? ` — closes ${new Date(event.pick_window_closes_at).toLocaleString('en-US', { timeZone: 'UTC', dateStyle: 'medium', timeStyle: 'short' })} UTC`
        : ''
      await sendPushToAllUsers({
        title: `New Pop Prop: ${event.name}`,
        body: `The pick window just opened${closes}.`,
        url: `/events/${event.slug}`,
      })
      popPropsNotified++
    } catch {
      // Push not configured (missing VAPID env vars) or delivery failed — don't block window automation.
    }
  }

  const { data: closing, error: closingSelectErr } = await supabase
    .from('events')
    .select('id')
    .in('status', ['upcoming', 'window_open'])
    .lte('pick_window_closes_at', now)

  if (closingSelectErr) return NextResponse.json({ error: closingSelectErr.message }, { status: 500 })

  const closingIds = (closing ?? []).map(e => e.id)
  let picksLocked = 0

  if (closingIds.length > 0) {
    const { data: lockedPicks, error: lockErr } = await supabase
      .from('picks')
      .update({ status: 'locked', locked_at: now })
      .in('event_id', closingIds)
      .eq('status', 'draft')
      .select('id')

    if (lockErr) return NextResponse.json({ error: lockErr.message }, { status: 500 })
    picksLocked = lockedPicks?.length ?? 0

    const { error: closeErr } = await supabase
      .from('events')
      .update({ status: 'window_closed' })
      .in('id', closingIds)

    if (closeErr) return NextResponse.json({ error: closeErr.message }, { status: 500 })
  }

  return NextResponse.json({
    windowsOpened: opened?.length ?? 0,
    windowsClosed: closingIds.length,
    picksLocked,
    popPropsNotified,
  })
}
