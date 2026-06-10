import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import CategoryLeaderboard from './CategoryLeaderboard'
import type { LeaderboardEntry } from '@/lib/types/database'
import { CATEGORY_LABELS } from '@/lib/types/database'

export default async function LeaderboardPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>
}) {
  const { cat } = await searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let standings: LeaderboardEntry[] = []

  if (cat) {
    const { data } = await supabase.rpc('category_leaderboard', { cat })
    standings = (data ?? []) as LeaderboardEntry[]
  } else {
    const { data } = await supabase.from('leaderboard').select('*')
    standings = (data ?? []) as LeaderboardEntry[]
  }

  const hasData = standings.length > 0

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-950">Leaderboard</h1>
          <p className="text-zinc-500 mt-1 text-sm">Season 1 standings</p>
        </div>
        {!hasData && (
          <div className="flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="text-xs font-semibold text-amber-700">Opens Aug 2026</span>
          </div>
        )}
      </div>

      {/* Category tabs */}
      <CategoryLeaderboard currentCat={cat} categories={CATEGORY_LABELS} />

      {/* Table */}
      <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden">
        <div className="grid grid-cols-[3rem_1fr_5rem_5rem_5rem_4rem] border-b border-zinc-100 bg-zinc-50 px-6 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          <div>#</div>
          <div>Player</div>
          <div className="text-right">Points</div>
          <div className="text-right">Picks</div>
          <div className="text-right">Accuracy</div>
          <div className="text-right">Streak</div>
        </div>

        {!hasData ? (
          <div className="px-6 py-16 text-center space-y-3">
            <p className="text-sm font-medium text-zinc-500">Standings appear once picks start resolving</p>
            <p className="text-xs text-zinc-400">
              Be the first on the board — join Season 1 and make your pre-season picks.
            </p>
            <Link
              href="/picks"
              className="inline-block mt-2 rounded-lg bg-zinc-950 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors"
            >
              Make picks
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-zinc-50">
            {standings.map((row, i) => (
              <div
                key={row.user_id}
                className={`grid grid-cols-[3rem_1fr_5rem_5rem_5rem_4rem] items-center px-6 py-4 ${
                  row.user_id === user?.id ? 'bg-violet-50/50' : ''
                }`}
              >
                <div className={`text-sm font-bold ${i < 3 ? 'text-zinc-950' : 'text-zinc-400'}`}>
                  {i + 1}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-sm font-semibold text-zinc-950">
                      {row.display_name ?? row.username}
                    </span>
                    {row.user_id === user?.id && (
                      <span className="text-xs font-normal text-violet-500">you</span>
                    )}
                    {(row.badges ?? []).slice(0, 2).map((badge: string) => (
                      <span key={badge} className="text-xs bg-zinc-100 text-zinc-500 rounded px-1.5 py-0.5">
                        {badge}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-zinc-400">@{row.username}</div>
                </div>
                <div className="text-right text-sm font-bold text-zinc-950">{row.total_points}</div>
                <div className="text-right text-sm text-zinc-500">{String(row.total_picks)}</div>
                <div className="text-right text-sm text-zinc-400">
                  {row.accuracy_pct != null ? `${row.accuracy_pct}%` : '—'}
                </div>
                <div className="text-right text-sm">
                  {row.current_streak > 0 ? (
                    <span className="font-semibold text-green-600">{row.current_streak}</span>
                  ) : (
                    <span className="text-zinc-300">—</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
