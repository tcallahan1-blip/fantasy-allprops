import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import type { Event, Pick } from '@/lib/types/database'
import { PICK_TYPE_POINTS, PICK_TYPE_LABELS, CONFIDENCE_BUDGET } from '@/lib/types/database'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let totalPoints = 0
  let totalPicks = 0
  let correctPicks = 0
  let openEvents: Event[] = []
  let recentResults: Array<{ event: Event; pick: Pick | null }> = []
  let doubleRemaining = CONFIDENCE_BUDGET.double
  let tripleRemaining = CONFIDENCE_BUDGET.triple

  if (user) {
    const [
      { data: leaderboardRow },
      { data: openEventsData },
      { data: recentEventsData },
      { data: userPicks },
    ] = await Promise.all([
      supabase.from('leaderboard').select('*').eq('user_id', user.id).maybeSingle(),
      supabase
        .from('events')
        .select('*')
        .eq('status', 'window_open')
        .order('pick_window_closes_at', { ascending: true })
        .limit(5),
      supabase
        .from('events')
        .select('*')
        .eq('status', 'scored')
        .order('result_confirmed_at', { ascending: false })
        .limit(5),
      supabase.from('picks').select('*').eq('user_id', user.id),
    ])

    totalPoints = leaderboardRow?.total_points ?? 0
    totalPicks = Number(leaderboardRow?.total_picks ?? 0)
    correctPicks = Number(leaderboardRow?.correct_picks ?? 0)
    openEvents = openEventsData ?? []

    const pickMap = new Map<string, Pick>()
    for (const p of (userPicks ?? [])) pickMap.set(p.event_id, p)

    // Filter open events to ones the user hasn't picked yet
    openEvents = openEvents.filter(e => !pickMap.get(e.id))

    recentResults = (recentEventsData ?? []).map((e: Event) => ({
      event: e,
      pick: pickMap.get(e.id) ?? null,
    }))

    const activePicks = userPicks ?? []
    const doubleUsed = activePicks.filter(
      (p: Pick) => p.confidence === 2 && (p.status === 'draft' || p.status === 'locked')
    ).length
    const tripleUsed = activePicks.filter(
      (p: Pick) => p.confidence === 3 && (p.status === 'draft' || p.status === 'locked')
    ).length
    doubleRemaining = CONFIDENCE_BUDGET.double - doubleUsed
    tripleRemaining = CONFIDENCE_BUDGET.triple - tripleUsed
  }

  const accuracyPct = totalPicks > 0
    ? Math.round((correctPicks / totalPicks) * 1000) / 10
    : null

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-950">Dashboard</h1>
        <p className="text-zinc-500 mt-1 text-sm">Season 1 · August 2026 → July 2027</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 space-y-2">
          <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Total Points</div>
          <div className="text-4xl font-extrabold text-zinc-950">{totalPoints || '—'}</div>
          <div className="text-xs text-zinc-400">Season 1</div>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 space-y-2">
          <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Picks Made</div>
          <div className="text-4xl font-extrabold text-zinc-950">{totalPicks || '—'}</div>
          <div className="text-xs text-zinc-400">{correctPicks} correct</div>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 space-y-2">
          <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Accuracy</div>
          <div className="text-4xl font-extrabold text-zinc-950">
            {accuracyPct != null ? `${accuracyPct}%` : '—'}
          </div>
          <div className="text-xs text-zinc-400">Scored picks only</div>
        </div>
        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5 space-y-2">
          <div className="text-xs font-medium text-amber-500 uppercase tracking-wider">Boosts left</div>
          <div className="text-2xl font-extrabold text-amber-700">
            {doubleRemaining}<span className="text-base font-normal text-amber-400 ml-1">2×</span>
            <span className="mx-1.5 text-amber-300">·</span>
            {tripleRemaining}<span className="text-base font-normal text-amber-400 ml-1">3×</span>
          </div>
          <div className="text-xs text-amber-500">Confidence boosts</div>
        </div>
      </div>

      {/* Action queue */}
      {openEvents.length > 0 && (
        <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
            <h2 className="font-semibold text-zinc-950">Picks open now</h2>
            <span className="text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-full px-2 py-0.5">
              {openEvents.length} unpicked
            </span>
          </div>
          <div className="divide-y divide-zinc-100">
            {openEvents.map(event => (
              <div key={event.id} className="px-6 py-4 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-zinc-950 truncate">{event.name}</div>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    {PICK_TYPE_LABELS[event.pick_type]} · +{PICK_TYPE_POINTS[event.pick_type]} pts
                    {event.bonus_window && ' · ★ bonus'}
                    {event.pick_window_closes_at && (
                      <> · Closes {new Date(event.pick_window_closes_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</>
                    )}
                  </div>
                </div>
                <Link
                  href="/picks"
                  className="shrink-0 rounded-lg bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors"
                >
                  Pick now
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent results */}
      {recentResults.length > 0 && (
        <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-100">
            <h2 className="font-semibold text-zinc-950">Recent results</h2>
          </div>
          <div className="divide-y divide-zinc-100">
            {recentResults.map(({ event, pick }) => (
              <div key={event.id} className="px-6 py-4 flex items-center gap-4">
                <div className={`shrink-0 w-2 h-2 rounded-full ${
                  !pick ? 'bg-zinc-200' : pick.status === 'correct' ? 'bg-green-400' : 'bg-red-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-zinc-950 truncate">{event.name}</div>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    Result: <span className="font-medium text-zinc-600">{event.official_result}</span>
                    {pick && (
                      <> · Your pick: <span className="font-medium text-zinc-600">{pick.pick_value}</span></>
                    )}
                    {!pick && <span className="italic"> · No pick</span>}
                  </div>
                </div>
                {pick?.status === 'correct' && pick.points_earned != null && (
                  <span className="shrink-0 text-xs font-semibold text-green-600">+{pick.points_earned} pts</span>
                )}
                {pick?.status === 'incorrect' && (
                  <span className="shrink-0 text-xs text-zinc-400">0 pts</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scoring reference */}
      <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-100">
          <h2 className="font-semibold text-zinc-950">Scoring</h2>
        </div>
        <div className="divide-y divide-zinc-100">
          {[
            { type: 'Pre-Season (P)', base: 15, desc: 'Long-horizon picks, locked before Aug 2026' },
            { type: 'Monthly (M)', base: 10, desc: 'Submitted by the 7th of each month' },
            { type: 'Pop Prop (X)', base: 5, desc: '24–72 hr windows around specific events' },
          ].map((row) => (
            <div key={row.type} className="px-6 py-4 flex items-center gap-6">
              <div className="flex-1">
                <div className="text-sm font-medium text-zinc-950">{row.type}</div>
                <div className="text-xs text-zinc-400 mt-0.5">{row.desc}</div>
              </div>
              <div className="text-right shrink-0 space-y-0.5">
                <div className="text-sm font-semibold text-zinc-950">{row.base} pts</div>
                <div className="text-xs text-zinc-400">{row.base * 2} / {row.base * 3} with 2× / 3× boost</div>
                <div className="text-xs text-amber-600 font-medium">{row.base * 1.5} pts ★ bonus</div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-3 bg-amber-50 border-t border-amber-100">
          <p className="text-xs text-amber-700">
            <span className="font-semibold">★ Bonus windows</span> — Oct 2026, Mar/Apr/Jun 2027 earn 1.5× on flagged events.
          </p>
        </div>
      </div>
    </div>
  )
}
