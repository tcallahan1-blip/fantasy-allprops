import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import JoinForm from './JoinForm'

export default async function JoinPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: league } = await supabase
    .from('leagues')
    .select('id, name, slug')
    .eq('invite_token', token)
    .single()

  if (!league) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="max-w-sm w-full text-center space-y-4 p-8">
          <h1 className="text-xl font-bold text-zinc-950">Invalid invite</h1>
          <p className="text-sm text-zinc-500">This invite link is invalid or has expired.</p>
          <Link href="/" className="text-sm font-medium text-zinc-950 underline underline-offset-2">
            Go home
          </Link>
        </div>
      </div>
    )
  }

  // If already a member, redirect straight to the league
  if (user) {
    const { data: existing } = await supabase
      .from('league_memberships')
      .select('user_id')
      .eq('league_id', league.id)
      .eq('user_id', user.id)
      .maybeSingle()

    if (existing) redirect(`/leagues/${league.slug}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <div className="max-w-sm w-full space-y-6 p-8">
        <div className="text-center space-y-2">
          <div className="text-sm font-medium text-zinc-400 uppercase tracking-wider">You're invited</div>
          <h1 className="text-2xl font-bold text-zinc-950">{league.name}</h1>
          <p className="text-sm text-zinc-500">
            Join this private Fantasy AllProps league and compete for Season 1.
          </p>
        </div>

        {user ? (
          <JoinForm token={token} leagueSlug={league.slug} />
        ) : (
          <div className="space-y-3">
            <Link
              href={`/login?redirect=/join/${token}`}
              className="block w-full rounded-lg bg-zinc-950 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-zinc-800 transition-colors"
            >
              Sign in to join
            </Link>
            <Link
              href={`/signup?redirect=/join/${token}`}
              className="block w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-center text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors"
            >
              Create an account
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
