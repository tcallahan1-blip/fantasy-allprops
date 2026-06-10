'use client'

import { useState, useTransition } from 'react'
import { createLeague } from './actions'

export default function CreateLeagueForm() {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string>()
  const [isPending, startTransition] = useTransition()

  function handleSubmit(formData: FormData) {
    setError(undefined)
    startTransition(async () => {
      const result = await createLeague(formData)
      if (result?.error) setError(result.error)
    })
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 space-y-4">
      <h2 className="font-semibold text-zinc-950">Create a league</h2>
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="rounded-lg bg-zinc-950 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors"
        >
          New league
        </button>
      ) : (
        <form action={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <label htmlFor="name" className="text-sm font-medium text-zinc-700">
              League name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              maxLength={60}
              placeholder="e.g. The Lads, Office Props, Callahan League"
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-950 placeholder:text-zinc-400 focus:border-zinc-950 focus:bg-white focus:outline-none transition-colors"
            />
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-lg bg-zinc-950 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors disabled:opacity-50"
            >
              {isPending ? 'Creating…' : 'Create league'}
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-sm text-zinc-400 hover:text-zinc-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
