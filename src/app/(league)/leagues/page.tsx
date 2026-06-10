import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import CreateLeagueForm from './CreateLeagueForm'

export default async function LeaguesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: memberships } = user
    ? await supabase
        .from('league_memberships')
        .select('league_id, leagues(id, name, slug, owner_id, created_at)')
        .eq('user_id', user.id)
    : { data: [] }

  const leagues = (memberships ?? []).map((m: any) => ({
    ...(m.leagues as any),
    is_owner: (m.leagues as any)?.owner_id === user?.id,
  }))

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-zinc-950">My Leagues</h1>
        <p className="text-zinc-500 mt-1 text-sm">
          Private groups — compete against friends, not strangers.
        </p>
      </div>

      {leagues.length === 0 ? (
        <div className="rounded-2xl border border-zinc-200 bg-white px-6 py-12 text-center space-y-3">
          <p className="font-semibold text-zinc-950">No leagues yet</p>
          <p className="text-sm text-zinc-400">
            Create one and share the invite link, or join a friend's league below.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-200 bg-white divide-y divide-zinc-100 overflow-hidden">
          {leagues.map((league: any) => (
            <div key={league.id} className="px-6 py-4 flex items-center justify-between">
              <div>
                <Link
                  href={`/leagues/${league.slug}`}
                  className="font-semibold text-zinc-950 hover:underline underline-offset-2"
                >
                  {league.name}
                </Link>
                {league.is_owner && (
                  <span className="ml-2 text-xs text-zinc-400">owner</span>
                )}
              </div>
              <Link
                href={`/leagues/${league.slug}`}
                className="text-xs text-zinc-500 hover:text-zinc-800 transition-colors"
              >
                View standings →
              </Link>
            </div>
          ))}
        </div>
      )}

      <CreateLeagueForm />
    </div>
  )
}
