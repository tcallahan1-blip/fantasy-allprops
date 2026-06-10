'use client'

import { useState, useTransition } from 'react'
import { upsertPick } from '@/app/(league)/picks/actions'
import type { Event, Pick } from '@/lib/types/database'

interface EventPickInputProps {
  event: Event
  userPick: Pick | null
}

const WINDOW_CLOSED_STATUSES = new Set(['window_closed', 'result_pending', 'scored', 'cancelled'])

export default function EventPickInput({ event, userPick }: EventPickInputProps) {
  const existingValue = userPick?.pick_value ?? ''
  const isLocked = userPick?.status === 'locked'
  const isCorrect = userPick?.status === 'correct'
  const isIncorrect = userPick?.status === 'incorrect'
  const isScored = isCorrect || isIncorrect
  const windowClosed = WINDOW_CLOSED_STATUSES.has(event.status)
  const windowOpen = event.status === 'window_open'

  const [value, setValue] = useState(existingValue)
  const [editing, setEditing] = useState(!existingValue && windowOpen)
  const [saved, setSaved] = useState(!!existingValue)
  const [error, setError] = useState<string>()
  const [isPending, startTransition] = useTransition()

  const datalistId = `opts-${event.id}`
  const hasOptions = event.options && event.options.length > 0

  function handleSave() {
    setError(undefined)
    startTransition(async () => {
      const result = await upsertPick(event.id, value)
      if (result.error) {
        setError(result.error)
      } else {
        setSaved(true)
        setEditing(false)
      }
    })
  }

  if (event.status === 'upcoming') {
    return (
      <div className="space-y-1">
        <p className="text-sm text-zinc-500">The pick window hasn't opened yet.</p>
        {event.pick_window_opens_at && (
          <p className="text-xs text-zinc-400">
            Opens{' '}
            {new Date(event.pick_window_opens_at).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
            })}
          </p>
        )}
      </div>
    )
  }

  if (event.status === 'cancelled') {
    return <p className="text-sm text-zinc-400">This event was cancelled.</p>
  }

  if (windowClosed && !existingValue) {
    return <p className="text-sm text-zinc-400">You didn't submit a pick for this event.</p>
  }

  if (isLocked || windowClosed) {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm bg-zinc-100 rounded-lg px-3 py-2 text-zinc-700">
          {existingValue}
        </span>
        {isCorrect && (
          <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            ✓ Correct · +{userPick!.points_earned} pts
          </span>
        )}
        {isIncorrect && (
          <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-600">
            ✗ Incorrect
          </span>
        )}
        {(isLocked && !isScored) && (
          <span className="text-xs text-zinc-400">Locked in</span>
        )}
      </div>
    )
  }

  // Window open — editable
  return (
    <div className="space-y-2">
      {editing ? (
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <input
              type="text"
              list={hasOptions ? datalistId : undefined}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              placeholder={hasOptions ? 'Type to search options…' : 'Your pick…'}
              className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-950 placeholder:text-zinc-400 focus:border-zinc-950 focus:bg-white focus:outline-none transition-colors min-w-[200px]"
              autoFocus={!existingValue}
            />
            {hasOptions && (
              <datalist id={datalistId}>
                {event.options!.map((opt) => (
                  <option key={opt} value={opt} />
                ))}
              </datalist>
            )}
          </div>
          <button
            onClick={handleSave}
            disabled={isPending || !value.trim()}
            className="rounded-lg bg-zinc-950 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors disabled:opacity-50"
          >
            {isPending ? 'Saving…' : 'Save Pick'}
          </button>
          {saved && (
            <button
              onClick={() => setEditing(false)}
              className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-zinc-900 bg-zinc-100 rounded-lg px-3 py-2">
            {value}
          </span>
          <button
            onClick={() => setEditing(true)}
            className="text-sm text-zinc-400 hover:text-zinc-700 transition-colors"
          >
            Edit
          </button>
        </div>
      )}

      {error && <p className="text-xs text-red-600">{error}</p>}

      {!editing && (
        <p className="text-xs text-zinc-400">
          {userPick?.status === 'draft'
            ? 'Draft — locks when the pick window closes.'
            : windowOpen
              ? 'Window is open — enter your pick above.'
              : ''}
        </p>
      )}
    </div>
  )
}
