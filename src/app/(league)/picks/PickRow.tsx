'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { upsertPick, updateConfidence } from './actions'
import type { EventWithUserPick, PickDistribution } from '@/lib/types/database'
import { PICK_TYPE_POINTS, BONUS_MULTIPLIER } from '@/lib/types/database'

const CATEGORY_STYLE: Record<string, string> = {
  'Sports-Major': 'bg-blue-50 text-blue-600 border-blue-100',
  'Sports-Niche': 'bg-cyan-50 text-cyan-600 border-cyan-100',
  'Sports-Olympic': 'bg-indigo-50 text-indigo-600 border-indigo-100',
  Politics: 'bg-red-50 text-red-600 border-red-100',
  RealityTV: 'bg-pink-50 text-pink-600 border-pink-100',
  Awards: 'bg-yellow-50 text-yellow-600 border-yellow-100',
  Influencer: 'bg-orange-50 text-orange-600 border-orange-100',
  Culture: 'bg-purple-50 text-purple-600 border-purple-100',
  NicheChamp: 'bg-lime-50 text-lime-600 border-lime-100',
  Tech: 'bg-zinc-100 text-zinc-500 border-zinc-200',
  Weather: 'bg-sky-50 text-sky-600 border-sky-100',
  Esports: 'bg-violet-50 text-violet-600 border-violet-100',
}

interface ConfidenceBudget {
  double: number
  triple: number
}

interface PickRowProps {
  event: EventWithUserPick
  budget: ConfidenceBudget
  onBudgetChange: (delta: { double: number; triple: number }) => void
  distribution: PickDistribution[]
}

export default function PickRow({ event, budget, onBudgetChange, distribution }: PickRowProps) {
  const existingValue = event.user_pick?.pick_value ?? ''
  const existingConfidence = (event.user_pick?.confidence as 1 | 2 | 3) ?? 1
  const isLocked = event.user_pick?.status === 'locked'
  const isScored = event.user_pick?.status === 'correct' || event.user_pick?.status === 'incorrect'

  const [value, setValue] = useState(existingValue)
  const [editing, setEditing] = useState(!existingValue)
  const [saved, setSaved] = useState(!!existingValue)
  const [confidence, setConfidence] = useState<1 | 2 | 3>(existingConfidence)
  const [error, setError] = useState<string>()
  const [isPending, startTransition] = useTransition()
  const [confPending, startConfTransition] = useTransition()

  const datalistId = `opts-${event.id}`
  const hasOptions = event.options && event.options.length > 0
  const base = PICK_TYPE_POINTS[event.pick_type]
  const baseWithBonus = base * (event.bonus_window ? BONUS_MULTIPLIER : 1)
  const projectedPts = baseWithBonus * confidence

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

  function handleConfidence(next: 1 | 2 | 3) {
    if (next === confidence) return
    setError(undefined)
    const prev = confidence
    startConfTransition(async () => {
      const result = await updateConfidence(event.id, next)
      if (result.error) {
        setError(result.error)
      } else {
        // Update parent budget counts
        const delta = { double: 0, triple: 0 }
        if (prev === 2) delta.double += 1
        if (prev === 3) delta.triple += 1
        if (next === 2) delta.double -= 1
        if (next === 3) delta.triple -= 1
        onBudgetChange(delta)
        setConfidence(next)
      }
    })
  }

  const canDouble = confidence === 2 || budget.double > 0
  const canTriple = confidence === 3 || budget.triple > 0

  return (
    <div className="px-6 py-4 space-y-2.5 hover:bg-zinc-50/50 transition-colors border-b border-zinc-50 last:border-0">
      {/* Header row */}
      <div className="flex items-start gap-2.5">
        <span
          className={`shrink-0 mt-0.5 rounded-md border px-2 py-0.5 text-xs font-medium ${
            CATEGORY_STYLE[event.category] ?? 'bg-zinc-50 text-zinc-500 border-zinc-100'
          }`}
        >
          {event.category}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Link
              href={`/events/${event.slug}`}
              className="text-sm font-medium text-zinc-900 leading-snug hover:underline underline-offset-2"
            >
              {event.name}
            </Link>
            {event.date_tbc && (
              <span className="text-xs text-zinc-400">[TBC]</span>
            )}
            {event.website_url && (
              <a
                href={event.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-300 hover:text-zinc-500 transition-colors"
                title="Official website"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
            {event.bonus_window && (
              <span className="text-xs font-semibold text-amber-500">★ bonus</span>
            )}
          </div>

          {event.description && (
            <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
              {event.description}
            </p>
          )}
        </div>
      </div>

      {/* Pick input row */}
      <div className="flex items-center gap-2 pl-[calc(theme(space.2)+theme(space.10))]">
        {isLocked || isScored ? (
          <div className="flex items-center gap-2">
            <span className={`text-sm italic rounded-lg px-3 py-1.5 ${
              isScored
                ? event.user_pick?.status === 'correct'
                  ? 'bg-green-50 text-green-700'
                  : 'bg-red-50 text-red-600'
                : 'bg-zinc-100 text-zinc-500'
            }`}>
              {existingValue}
            </span>
            {isScored && event.user_pick?.points_earned != null && (
              <span className={`text-xs font-semibold ${
                event.user_pick.status === 'correct' ? 'text-green-600' : 'text-zinc-400'
              }`}>
                {event.user_pick.status === 'correct' ? `+${event.user_pick.points_earned} pts` : '0 pts'}
              </span>
            )}
            {confidence > 1 && (
              <span className="text-xs text-amber-600 font-medium">{confidence}×</span>
            )}
          </div>
        ) : editing ? (
          <>
            <div className="relative flex-1 max-w-xs">
              <input
                type="text"
                list={hasOptions ? datalistId : undefined}
                value={value}
                onChange={e => setValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSave()}
                placeholder={hasOptions ? 'Type to search options…' : 'Your pick…'}
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm text-zinc-950 placeholder:text-zinc-400 focus:border-zinc-950 focus:bg-white focus:outline-none transition-colors"
                autoFocus={!existingValue}
              />
              {hasOptions && (
                <datalist id={datalistId}>
                  {event.options!.map(opt => (
                    <option key={opt} value={opt} />
                  ))}
                </datalist>
              )}
            </div>

            <button
              onClick={handleSave}
              disabled={isPending}
              className="shrink-0 rounded-lg bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors disabled:opacity-50"
            >
              {isPending ? 'Saving…' : 'Save'}
            </button>

            {saved && (
              <button
                onClick={() => setEditing(false)}
                className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
              >
                Cancel
              </button>
            )}
          </>
        ) : (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-zinc-900 bg-zinc-100 rounded-lg px-3 py-1.5">
              {value}
            </span>
            <button
              onClick={() => setEditing(true)}
              className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors"
            >
              Edit
            </button>

            {/* Confidence selector */}
            <div className="flex items-center gap-1 ml-1">
              {([1, 2, 3] as const).map(c => (
                <button
                  key={c}
                  onClick={() => handleConfidence(c)}
                  disabled={confPending || (c === 2 && !canDouble) || (c === 3 && !canTriple)}
                  title={c === 1 ? '1× (standard)' : c === 2 ? '2× boost' : '3× boost'}
                  className={`rounded px-2 py-0.5 text-xs font-semibold transition-colors disabled:opacity-30 ${
                    confidence === c
                      ? c === 1
                        ? 'bg-zinc-200 text-zinc-700'
                        : 'bg-amber-400 text-white'
                      : 'bg-zinc-100 text-zinc-400 hover:bg-zinc-200 hover:text-zinc-700'
                  }`}
                >
                  {c}×{c > 1 ? '★'.repeat(c - 1) : ''}
                </button>
              ))}
            </div>

            <span className="text-xs text-zinc-400">
              If correct:{' '}
              <span className="font-semibold text-zinc-600">{projectedPts} pts</span>
              {confidence > 1 && (
                <span className="text-zinc-400"> ({baseWithBonus} × {confidence})</span>
              )}
              {event.bonus_window && confidence === 1 && (
                <span className="text-amber-500"> ★</span>
              )}
            </span>
          </div>
        )}

        {error && (
          <span className="text-xs text-red-600">{error}</span>
        )}
      </div>

      {/* Crowd % — visible after window closes */}
      {distribution.length > 0 && (
        <div className="pl-[calc(theme(space.2)+theme(space.10))] flex flex-wrap gap-x-4 gap-y-1">
          {distribution
            .slice()
            .sort((a, b) => b.pct - a.pct)
            .map(d => (
              <span
                key={d.pick_value}
                className={`text-xs ${d.pick_value === existingValue ? 'font-semibold text-zinc-700' : 'text-zinc-400'}`}
              >
                {d.pct}% {d.pick_value}
              </span>
            ))}
        </div>
      )}
    </div>
  )
}
