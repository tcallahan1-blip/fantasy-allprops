import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import InviteLink from './InviteLink'
import type { LeaderboardEntry } from '@/lib/types/database'

export default async function LeaguePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: league } = await supabase
    .from('leagues')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!league) notFound()

  // Verify membership
  const { data: membership } = user
    ? await supabase
        .from('league_memberships')
        .select('user_id')
        .eq('league_id', league.id)
        .eq('user_id', user.id)
        .maybeSingle()
    : { data: null }

  if (!membership) notFound()

  // Fetch member IDs
  const { data: members } = await supabase
    .from('league_memberships')
    .select('user_id')
    .eq('league_id', league.id)

  const memberIds = (members ?? []).map((m: any) => m.user_id)

  // Leaderboard filtered to members
  const { data: standings } = await supabase
    .from('leaderboard')
    .select('*')
    .in('user_id', memberIds)

  const isOwner = league.owner_id === user?.id
  const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/join/${league.invite_token}`

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-start justify-between">
        <div>
          <Link href="/leagues" className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors mb-1 block">
            ← My Leagues
          </Link>
          <h1 className="text-2xl font-bold text-zinc-950">{league.name}</h1>
          <p className="text-zinc-500 mt-1 text-sm">{memberIds.length} member{memberIds.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <InviteLink url={inviteUrl} isOwner={isOwner} />

      {/* Standings */}
      <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden">
        <div className="grid grid-cols-[3rem_1fr_6rem_5rem_6rem] border-b border-zinc-100 bg-zinc-50 px-6 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          <div>#</div>
          <div>Player</div>
          <div className="text-right">Points</div>
          <div className="text-right">Picks</div>
          <div className="text-right">Accuracy</div>
        </div>

        {(standings ?? []).length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-zinc-400">No picks resolved yet. Standings appear once events score.</p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-50">
            {(standings as LeaderboardEntry[]).map((row, i) => (
              <div
                key={row.user_id}
                className={`grid grid-cols-[3rem_1fr_6rem_5rem_6rem] items-center px-6 py-4 ${
                  row.user_id === user?.id ? 'bg-violet-50/50' : ''
                }`}
              >
                <div className="text-sm font-bold text-zinc-400">{i + 1}</div>
                <div>
                  <div className="text-sm font-semibold text-zinc-950">
                    {row.display_name ?? row.username}
                    {row.user_id === user?.id && (
                      <span className="ml-1.5 text-xs font-normal text-violet-500">you</span>
                    )}
                  </div>
                  <div className="text-xs text-zinc-400">@{row.username}</div>
                </div>
                <div className="text-right text-sm font-bold text-zinc-950">{row.total_points}</div>
                <div className="text-right text-sm text-zinc-500">{String(row.total_picks)}</div>
                <div className="text-right text-sm text-zinc-400">
                  {row.accuracy_pct != null ? `${row.accuracy_pct}%` : '—'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
