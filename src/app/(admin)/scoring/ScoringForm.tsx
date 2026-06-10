'use client'

import { useState, useTransition } from 'react'
import { scoreEvent } from './actions'
import type { Event } from '@/lib/types/database'

export default function ScoringForm({ events }: { events: Event[] }) {
  const [eventId, setEventId] = useState('')
  const [result, setResult] = useState('')
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null)
  const [isPending, startTransition] = useTransition()

  const selected = events.find(e => e.id === eventId)
  const hasOptions = selected?.options && selected.options.length > 0

  function handleSubmit() {
    setMessage(null)
    startTransition(async () => {
      const res = await scoreEvent(eventId, result)
      if (res.error) {
        setMessage({ text: res.error, ok: false })
      } else {
        setMessage({ text: `Scored ${res.scored} picks.`, ok: true })
        setEventId('')
        setResult('')
      }
    })
  }

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <label className="text-sm font-medium">Event</label>
        <select
          value={eventId}
          onChange={e => { setEventId(e.target.value); setResult('') }}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Select an event…</option>
          {events.map(e => (
            <option key={e.id} value={e.id}>
              [{e.pick_type}] {e.name} — {e.month}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Official result</label>
        {hasOptions ? (
          <select
            value={result}
            onChange={e => setResult(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">Select result…</option>
            {selected!.options!.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            value={result}
            onChange={e => setResult(e.target.value)}
            placeholder="e.g. Novak Djokovic"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={isPending || !eventId || !result}
        className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors disabled:opacity-40"
      >
        {isPending ? 'Scoring…' : 'Save result & score picks'}
      </button>

      {message && (
        <p className={`text-sm ${message.ok ? 'text-green-700' : 'text-red-600'}`}>
          {message.text}
        </p>
      )}
    </div>
  )
}
