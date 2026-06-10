'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { EventCategory } from '@/lib/types/database'

const PICK_TYPE_STYLE: Record<string, string> = {
  P: 'bg-violet-100 text-violet-700',
  M: 'bg-blue-100 text-blue-700',
  X: 'bg-amber-100 text-amber-700',
}

const PICK_TYPE_LABELS: Record<string, string> = {
  P: 'Pre-Season',
  M: 'Monthly',
  X: 'Pop Prop',
}

const CATEGORY_STYLE: Record<EventCategory, string> = {
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

interface Event {
  id: string
  slug?: string
  name: string
  month: string
  category: string
  pick_type: string
  verification: string
  bonus_window?: boolean
  date_tbc?: boolean
}

interface MonthSectionProps {
  month: string
  summary: string
  isBonus: boolean
  events: Event[]
}

export default function MonthSection({ month, summary, isBonus, events }: MonthSectionProps) {
  const [open, setOpen] = useState(true)

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden">
      {/* Month header — clickable */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-full px-6 py-4 flex items-center justify-between text-left ${
          isBonus ? 'bg-amber-50 border-b border-amber-100' : 'border-b border-zinc-100'
        }`}
      >
        <div className="flex items-center gap-3">
          <h2 className={`font-bold text-base ${isBonus ? 'text-amber-900' : 'text-zinc-950'}`}>
            {month}
          </h2>
          {isBonus && (
            <span className="rounded-full bg-amber-200 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
              ★ Bonus month
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-400">{events.length} events</span>
          <svg
            className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </div>
      </button>

      {open && (
        <>
          {summary && (
            <div
              className={`px-6 py-2 border-b ${
                isBonus ? 'bg-amber-50/50 border-amber-100/50' : 'bg-zinc-50 border-zinc-100'
              }`}
            >
              <p className={`text-xs ${isBonus ? 'text-amber-700' : 'text-zinc-400'}`}>{summary}</p>
            </div>
          )}

          {/* Events */}
          <div className="divide-y divide-zinc-50">
            {events.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.slug ?? event.id}`}
                className="px-6 py-3.5 flex items-center gap-3 hover:bg-zinc-50/60 transition-colors"
              >
                <span
                  className={`shrink-0 rounded-md border px-2 py-0.5 text-xs font-medium ${
                    CATEGORY_STYLE[event.category as EventCategory] ?? 'bg-zinc-50 text-zinc-500 border-zinc-100'
                  }`}
                >
                  {event.category}
                </span>
                <span className="flex-1 text-sm text-zinc-900 min-w-0 truncate">
                  {event.name}
                  {event.date_tbc && (
                    <span className="ml-2 text-xs text-zinc-400 font-normal">[TBC]</span>
                  )}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  {event.bonus_window && (
                    <span className="text-xs font-semibold text-amber-500">★</span>
                  )}
                  <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${PICK_TYPE_STYLE[event.pick_type]}`}>
                    {PICK_TYPE_LABELS[event.pick_type]}
                  </span>
                  <span className="text-xs text-zinc-400 w-4 text-center">
                    {event.verification === 'A' ? '⚡' : '✎'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
