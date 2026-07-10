'use client'

import { useMemo, useState, useTransition } from 'react'
import EventForm from './EventForm'
import { deleteEvent } from './actions'
import { EVENT_STATUS_LABELS, type Event, type EventStatus } from '@/lib/types/database'

const FILTERS: { label: string; status: EventStatus | 'All' }[] = [
  { label: 'All', status: 'All' },
  { label: 'Upcoming', status: 'upcoming' },
  { label: 'Window Open', status: 'window_open' },
  { label: 'Result Pending', status: 'result_pending' },
  { label: 'Scored', status: 'scored' },
]

export default function EventsTable({ events }: { events: Event[] }) {
  const [filter, setFilter] = useState<EventStatus | 'All'>('All')
  const [formMode, setFormMode] = useState<'closed' | 'create' | Event>('closed')
  const [deleteError, setDeleteError] = useState<{ id: string; text: string } | null>(null)
  const [isPending, startTransition] = useTransition()

  const filtered = useMemo(
    () => filter === 'All' ? events : events.filter(e => e.status === filter),
    [events, filter]
  )

  function handleDelete(event: Event) {
    setDeleteError(null)
    if (!confirm(`Delete "${event.name}"? This can't be undone.`)) return
    startTransition(async () => {
      const res = await deleteEvent(event.id)
      if (res.error) setDeleteError({ id: event.id, text: res.error })
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Events</h1>
          <p className="text-gray-500 mt-1">Manage events, pick windows, and results</p>
        </div>
        <button
          onClick={() => setFormMode(formMode === 'create' ? 'closed' : 'create')}
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
        >
          {formMode === 'create' ? 'Close' : 'Add event'}
        </button>
      </div>

      {formMode === 'create' && (
        <EventForm onDone={() => setFormMode('closed')} onCancel={() => setFormMode('closed')} />
      )}

      {typeof formMode === 'object' && (
        <EventForm event={formMode} onDone={() => setFormMode('closed')} onCancel={() => setFormMode('closed')} />
      )}

      <div className="flex gap-2">
        {FILTERS.map(({ label, status }) => (
          <button
            key={label}
            onClick={() => setFilter(status)}
            className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
              filter === status
                ? 'border-black bg-black text-white'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-4 py-3 font-medium text-gray-500">Event</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Category</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Month</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Pick Type</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Result</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-gray-400">
                  No events match this filter.
                </td>
              </tr>
            ) : (
              filtered.map(event => (
                <tr key={event.id}>
                  <td className="px-4 py-3 font-medium text-gray-900">{event.name}</td>
                  <td className="px-4 py-3 text-gray-500">{event.category}</td>
                  <td className="px-4 py-3 text-gray-500">{event.month}</td>
                  <td className="px-4 py-3 text-gray-500">{event.pick_type}</td>
                  <td className="px-4 py-3 text-gray-500">{EVENT_STATUS_LABELS[event.status]}</td>
                  <td className="px-4 py-3 text-gray-500">{event.official_result ?? '—'}</td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button
                      onClick={() => setFormMode(event)}
                      className="text-gray-500 hover:text-gray-900 px-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event)}
                      disabled={isPending}
                      className="text-red-500 hover:text-red-700 px-2 disabled:opacity-40"
                    >
                      Delete
                    </button>
                    {deleteError?.id === event.id && (
                      <div className="text-xs text-red-600 mt-1">{deleteError.text}</div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
