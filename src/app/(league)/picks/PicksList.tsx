'use client'

import { useState } from 'react'
import PickRow from './PickRow'
import type { EventWithUserPick, PickType, PickDistribution } from '@/lib/types/database'
import { CONFIDENCE_BUDGET } from '@/lib/types/database'

const PICK_TYPE_LABELS: Record<PickType, string> = {
  P: 'Pre-Season',
  M: 'Monthly',
  X: 'Pop Prop',
}

const PICK_TYPE_POINTS: Record<PickType, number> = {
  P: 15,
  M: 10,
  X: 5,
}

const PICK_TYPE_STYLE: Record<PickType, string> = {
  P: 'bg-violet-100 text-violet-700',
  M: 'bg-blue-100 text-blue-700',
  X: 'bg-amber-100 text-amber-700',
}

const PICK_TYPE_BORDER: Record<PickType, string> = {
  P: 'border-violet-200',
  M: 'border-blue-200',
  X: 'border-amber-200',
}

const PICK_TYPE_DESC: Record<PickType, string> = {
  P: "Lock in your big calls before the season begins. These can't be changed after August 1.",
  M: 'Submitted by the 7th of each month based on recent form.',
  X: 'Short windows that open 24–72 hours before specific events.',
}

const PICK_TYPE_DEADLINE: Record<PickType, string> = {
  P: 'Locks August 1, 2026',
  M: 'Locks by 7th of each month',
  X: 'Window announced per event',
}

interface Props {
  events: EventWithUserPick[]
  initialDouble: number
  initialTriple: number
  distributions: PickDistribution[]
}

export default function PicksList({ events, initialDouble, initialTriple, distributions }: Props) {
  const [budget, setBudget] = useState({ double: initialDouble, triple: initialTriple })

  // Group distributions by event_id for fast lookup
  const distMap = new Map<string, PickDistribution[]>()
  for (const d of distributions) {
    const arr = distMap.get(d.event_id) ?? []
    arr.push(d)
    distMap.set(d.event_id, arr)
  }

  function handleBudgetChange(delta: { double: number; triple: number }) {
    setBudget(prev => ({
      double: Math.min(CONFIDENCE_BUDGET.double, prev.double + delta.double),
      triple: Math.min(CONFIDENCE_BUDGET.triple, prev.triple + delta.triple),
    }))
  }

  const grouped = {
    P: events.filter(e => e.pick_type === 'P'),
    M: events.filter(e => e.pick_type === 'M'),
    X: events.filter(e => e.pick_type === 'X'),
  }

  return (
    <>
      {/* Confidence budget banner */}
      <div className="rounded-xl border border-amber-100 bg-amber-50 px-5 py-3 flex items-center gap-6 text-sm">
        <span className="font-semibold text-amber-800">Confidence boosts</span>
        <span className="text-amber-700">
          <span className="font-bold">{budget.double}</span>
          <span className="text-amber-500"> / {CONFIDENCE_BUDGET.double}</span>
          <span className="ml-1">× 2× remaining</span>
        </span>
        <span className="text-amber-700">
          <span className="font-bold">{budget.triple}</span>
          <span className="text-amber-500"> / {CONFIDENCE_BUDGET.triple}</span>
          <span className="ml-1">× 3× remaining</span>
        </span>
        <span className="text-xs text-amber-500 ml-auto">Use after saving a pick</span>
      </div>

      <div className="space-y-8">
        {(['P', 'M', 'X'] as PickType[]).map((type) => {
          const typeEvents = grouped[type]
          const pickedCount = typeEvents.filter(e => e.user_pick).length

          return (
            <div key={type} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${PICK_TYPE_STYLE[type]}`}>
                    {PICK_TYPE_LABELS[type]}
                  </span>
                  <span className="text-sm font-semibold text-zinc-950">
                    {typeEvents.length} events
                  </span>
                  <span className="text-xs text-zinc-400">+{PICK_TYPE_POINTS[type]} pts each</span>
                </div>
                <div className="text-xs text-zinc-400">{pickedCount}/{typeEvents.length} picked</div>
              </div>

              <div className={`rounded-2xl border bg-white overflow-hidden ${PICK_TYPE_BORDER[type]}`}>
                <div className="px-6 py-3 border-b border-zinc-100 bg-zinc-50 flex items-center justify-between">
                  <p className="text-xs text-zinc-500">{PICK_TYPE_DESC[type]}</p>
                  <span className="text-xs font-medium text-zinc-400 shrink-0 ml-4">{PICK_TYPE_DEADLINE[type]}</span>
                </div>
                <div className="divide-y divide-zinc-50">
                  {typeEvents.map((event) => (
                    <PickRow
                      key={event.id}
                      event={event}
                      budget={budget}
                      onBudgetChange={handleBudgetChange}
                      distribution={distMap.get(event.id) ?? []}
                    />
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
