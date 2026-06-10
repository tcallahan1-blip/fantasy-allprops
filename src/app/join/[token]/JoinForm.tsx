'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { joinLeague } from '@/app/(league)/leagues/actions'

export default function JoinForm({ token, leagueSlug }: { token: string; leagueSlug: string }) {
  const router = useRouter()
  const [error, setError] = useState<string>()
  const [isPending, startTransition] = useTransition()

  function handleJoin() {
    setError(undefined)
    startTransition(async () => {
      const result = await joinLeague(token)
      if (result.error) {
        setError(result.error)
      } else {
        router.push(`/leagues/${leagueSlug}`)
      }
    })
  }

  return (
    <div className="space-y-3">
      <button
        onClick={handleJoin}
        disabled={isPending}
        className="w-full rounded-lg bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors disabled:opacity-50"
      >
        {isPending ? 'Joining…' : 'Join league'}
      </button>
      {error && <p className="text-xs text-red-600 text-center">{error}</p>}
    </div>
  )
}
