'use client'

import { useState, useTransition } from 'react'
import { createEvent, updateEvent } from './actions'
import {
  CATEGORY_LABELS,
  EVENT_STATUS_LABELS,
  PICK_TYPE_LABELS,
  SEASON_MONTHS,
  type Event,
  type EventCategory,
  type EventStatus,
} from '@/lib/types/database'

function toDateTimeLocal(value: string | null): string {
  if (!value) return ''
  const d = new Date(value)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export default function EventForm({
  event,
  onDone,
  onCancel,
}: {
  event?: Event
  onDone: () => void
  onCancel: () => void
}) {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const isEdit = !!event

  function handleSubmit(formData: FormData) {
    setError(null)
    startTransition(async () => {
      const res = isEdit
        ? await updateEvent(event!.id, formData)
        : await createEvent(formData)
      if (res.error) {
        setError(res.error)
      } else {
        onDone()
      }
    })
  }

  return (
    <form
      action={handleSubmit}
      className="rounded-xl border border-gray-100 p-6 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">{isEdit ? `Edit: ${event!.name}` : 'Add event'}</h2>
        <button type="button" onClick={onCancel} className="text-sm text-gray-400 hover:text-gray-700">
          Cancel
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <label className="space-y-1 col-span-2">
          <span className="text-sm font-medium">Name</span>
          <input
            name="name"
            defaultValue={event?.name}
            required
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </label>

        <label className="space-y-1 col-span-2">
          <span className="text-sm font-medium">Slug</span>
          <input
            name="slug"
            defaultValue={event?.slug}
            placeholder="auto-generated from name if left blank"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium">Category</span>
          <select
            name="category"
            defaultValue={event?.category}
            required
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            {(Object.keys(CATEGORY_LABELS) as EventCategory[]).map(c => (
              <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
            ))}
          </select>
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium">Month</span>
          <select
            name="month"
            defaultValue={event?.month}
            required
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            {SEASON_MONTHS.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium">Pick type</span>
          <select
            name="pick_type"
            defaultValue={event?.pick_type ?? 'M'}
            required
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            {(['P', 'M', 'X'] as const).map(t => (
              <option key={t} value={t}>{PICK_TYPE_LABELS[t]} ({t})</option>
            ))}
          </select>
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium">Verification</span>
          <select
            name="verification"
            defaultValue={event?.verification ?? 'A'}
            required
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="A">Automated</option>
            <option value="M">Manual</option>
          </select>
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium">Status</span>
          <select
            name="status"
            defaultValue={event?.status ?? 'upcoming'}
            required
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            {(Object.keys(EVENT_STATUS_LABELS) as EventStatus[]).map(s => (
              <option key={s} value={s}>{EVENT_STATUS_LABELS[s]}</option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 pt-6">
          <input type="checkbox" name="bonus_window" defaultChecked={event?.bonus_window} className="rounded" />
          <span className="text-sm font-medium">Bonus window (1.5×)</span>
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium">Event date</span>
          <input
            type="date"
            name="event_date"
            defaultValue={event?.event_date ?? ''}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </label>

        <label className="flex items-center gap-2 pt-6">
          <input type="checkbox" name="date_tbc" defaultChecked={event?.date_tbc} className="rounded" />
          <span className="text-sm font-medium">Date TBC</span>
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium">Pick window opens</span>
          <input
            type="datetime-local"
            name="pick_window_opens_at"
            defaultValue={toDateTimeLocal(event?.pick_window_opens_at ?? null)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium">Pick window closes</span>
          <input
            type="datetime-local"
            name="pick_window_closes_at"
            defaultValue={toDateTimeLocal(event?.pick_window_closes_at ?? null)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </label>

        <label className="space-y-1 col-span-2">
          <span className="text-sm font-medium">Options (one per line — leave blank for free-text results)</span>
          <textarea
            name="options"
            rows={3}
            defaultValue={event?.options?.join('\n') ?? ''}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </label>

        <label className="space-y-1 col-span-2">
          <span className="text-sm font-medium">Description</span>
          <textarea
            name="description"
            rows={2}
            defaultValue={event?.description ?? ''}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium">Website URL</span>
          <input
            type="url"
            name="website_url"
            defaultValue={event?.website_url ?? ''}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium">Internal notes</span>
          <input
            name="notes"
            defaultValue={event?.notes ?? ''}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </label>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors disabled:opacity-40"
      >
        {isPending ? 'Saving…' : isEdit ? 'Save changes' : 'Create event'}
      </button>
    </form>
  )
}
