import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import eventsData from '@/../data/season-1-events.json'
import type { Event, Pick, PickType, EventStatus, EventCategory } from '@/lib/types/database'
import { PICK_TYPE_LABELS, PICK_TYPE_POINTS, CATEGORY_LABELS, BONUS_MULTIPLIER } from '@/lib/types/database'
import EventPickInput from './EventPickInput'

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

const PICK_TYPE_STYLE: Record<PickType, string> = {
  P: 'bg-violet-100 text-violet-700',
  M: 'bg-blue-100 text-blue-700',
  X: 'bg-amber-100 text-amber-700',
}

const STATUS_LABEL: Record<EventStatus, string> = {
  upcoming: 'Upcoming',
  window_open: 'Window Open',
  window_closed: 'Window Closed',
  result_pending: 'Result Pending',
  scored: 'Scored',
  cancelled: 'Cancelled',
}

const STATUS_STYLE: Record<EventStatus, string> = {
  upcoming: 'bg-zinc-100 text-zinc-500',
  window_open: 'bg-emerald-100 text-emerald-700',
  window_closed: 'bg-blue-100 text-blue-700',
  result_pending: 'bg-amber-100 text-amber-700',
  scored: 'bg-violet-100 text-violet-700',
  cancelled: 'bg-red-100 text-red-600',
}

interface PickWithProfile {
  id: string
  user_id: string
  pick_value: string
  status: string
  locked_at: string | null
  points_earned: number | null
  // Supabase returns joined rows as an array for to-one relations
  profiles: { username: string; display_name: string | null }[] | null
}

function picksAreVisible(status: EventStatus): boolean {
  return ['window_closed', 'result_pending', 'scored'].includes(status)
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Try DB first
  const { data: dbEvent } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .single()

  // Fall back to JSON (pre-seed) using id as slug
  const jsonEvent = !dbEvent
    ? (eventsData.events as Record<string, unknown>[]).find((e) => e.id === slug)
    : null

  if (!dbEvent && !jsonEvent) notFound()

  let userPick: Pick | null = null
  let allPicks: PickWithProfile[] = []

  if (dbEvent) {
    const eventStatus = dbEvent.status as EventStatus

    if (user) {
      const { data: pick } = await supabase
        .from('picks')
        .select('*')
        .eq('event_id', dbEvent.id)
        .eq('user_id', user.id)
        .single()
      userPick = pick ?? null
    }

    if (picksAreVisible(eventStatus)) {
      const { data: picks } = await supabase
        .from('picks')
        .select('id, user_id, pick_value, status, locked_at, points_earned, profiles(username, display_name)')
        .eq('event_id', dbEvent.id)
        .order('locked_at', { ascending: true, nullsFirst: false })
      allPicks = (picks ?? []) as PickWithProfile[]
    }
  }

  // Normalise display data — DB event takes priority, JSON is a static fallback
  const ev: Event = dbEvent ?? {
    id: String(jsonEvent!.id),
    slug: String(jsonEvent!.id),
    name: String(jsonEvent!.name),
    category: String(jsonEvent!.category) as EventCategory,
    season: 1,
    month: String(jsonEvent!.month),
    event_date: jsonEvent!.date ? String(jsonEvent!.date) : null,
    date_tbc: Boolean(jsonEvent!.date_tbc),
    pick_type: String(jsonEvent!.pick_type) as PickType,
    bonus_window: Boolean(jsonEvent!.bonus_window),
    verification: String(jsonEvent!.verification) as 'A' | 'M',
    status: 'upcoming' as EventStatus,
    pick_window_opens_at: null,
    pick_window_closes_at: null,
    official_result: null,
    result_confirmed_at: null,
    notes: jsonEvent!.notes ? String(jsonEvent!.notes) : null,
    description: jsonEvent!.description ? String(jsonEvent!.description) : null,
    website_url: jsonEvent!.website_url ? String(jsonEvent!.website_url) : null,
    options: Array.isArray(jsonEvent!.options) ? (jsonEvent!.options as string[]) : null,
    created_at: '',
    updated_at: '',
  }

  const isDbEvent = !!dbEvent
  const pointValue = PICK_TYPE_POINTS[ev.pick_type]
  const bonusPoints = Math.round(pointValue * BONUS_MULTIPLIER)
  const status = ev.status as EventStatus
  const showCommunityPicks = isDbEvent && picksAreVisible(status)
  const picksHidden = isDbEvent && !picksAreVisible(status)

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Back nav */}
      <div className="flex items-center gap-3 text-sm text-zinc-400">
        <Link href="/calendar" className="flex items-center gap-1 hover:text-zinc-700 transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Calendar
        </Link>
        {user && (
          <>
            <span className="text-zinc-200">·</span>
            <Link href="/picks" className="hover:text-zinc-700 transition-colors">My Picks</Link>
          </>
        )}
      </div>

      {/* Event header */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 space-y-4">
        {/* Badge row */}
        <div className="flex items-center flex-wrap gap-2">
          <span
            className={`rounded-md border px-2 py-0.5 text-xs font-medium ${
              CATEGORY_STYLE[ev.category] ?? 'bg-zinc-50 text-zinc-500 border-zinc-100'
            }`}
          >
            {CATEGORY_LABELS[ev.category]}
          </span>
          {isDbEvent && (
            <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${STATUS_STYLE[status]}`}>
              {STATUS_LABEL[status]}
            </span>
          )}
          <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${PICK_TYPE_STYLE[ev.pick_type]}`}>
            {PICK_TYPE_LABELS[ev.pick_type]}
          </span>
          <span className="text-xs text-zinc-500">
            {ev.bonus_window ? `★ ${bonusPoints} pts (1.5× bonus)` : `+${pointValue} pts`}
          </span>
          <span className="ml-auto text-xs text-zinc-400">
            {ev.verification === 'A' ? '⚡ Auto-verified' : '✎ Manual'}
          </span>
        </div>

        {/* Name + date */}
        <div>
          <h1 className="text-2xl font-bold text-zinc-950 leading-tight">{ev.name}</h1>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap text-sm text-zinc-400">
            <span>{ev.month}</span>
            {ev.event_date && !ev.date_tbc && (
              <>
                <span className="text-zinc-200">·</span>
                <span className="text-zinc-500">
                  {new Date(ev.event_date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </>
            )}
            {ev.date_tbc && <span>Date TBC</span>}
            {ev.website_url && (
              <a
                href={ev.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-300 hover:text-zinc-600 transition-colors"
                title="Official website"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>

        {ev.description && (
          <p className="text-sm text-zinc-500 leading-relaxed">{ev.description}</p>
        )}

        {ev.notes && <p className="text-xs text-zinc-400 italic">{ev.notes}</p>}

        {isDbEvent && ev.pick_window_closes_at && (
          <div className="pt-3 border-t border-zinc-100 text-xs text-zinc-400">
            {status === 'window_open' ? 'Window closes' : 'Window closed'}{' '}
            {new Date(ev.pick_window_closes_at).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
        )}
      </div>

      {/* Official result */}
      {isDbEvent && status === 'scored' && ev.official_result && (
        <div className="rounded-2xl border border-violet-200 bg-violet-50 p-5 space-y-1">
          <div className="text-xs font-semibold text-violet-500 uppercase tracking-wide">Official Result</div>
          <div className="text-xl font-bold text-violet-900">{ev.official_result}</div>
          {ev.result_confirmed_at && (
            <div className="text-xs text-violet-400">
              Confirmed{' '}
              {new Date(ev.result_confirmed_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
          )}
        </div>
      )}

      {/* Your Pick */}
      <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden">
        <div className="px-6 py-3 border-b border-zinc-100 bg-zinc-50">
          <h2 className="text-sm font-semibold text-zinc-950">Your Pick</h2>
        </div>
        <div className="px-6 py-4">
          {!isDbEvent ? (
            <p className="text-sm text-zinc-400">Picks available once events are seeded.</p>
          ) : !user ? (
            <p className="text-sm text-zinc-500">
              <Link href="/login" className="text-zinc-950 underline underline-offset-2">
                Sign in
              </Link>{' '}
              to make a pick.
            </p>
          ) : (
            <EventPickInput event={ev} userPick={userPick} />
          )}
        </div>
      </div>

      {/* Community Picks */}
      {isDbEvent && (
        <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden">
          <div className="px-6 py-3 border-b border-zinc-100 bg-zinc-50 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-zinc-950">Community Picks</h2>
            {showCommunityPicks && allPicks.length > 0 && (
              <span className="text-xs text-zinc-400">
                {allPicks.length} {allPicks.length === 1 ? 'pick' : 'picks'}
              </span>
            )}
          </div>

          {picksHidden ? (
            <div className="px-6 py-10 text-center space-y-2">
              <div className="text-2xl">🔒</div>
              <p className="text-sm font-medium text-zinc-950">Picks hidden until the window closes</p>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                {status === 'window_open'
                  ? "Once the pick window closes, you'll see everyone's picks here."
                  : "Picks will be revealed after the pick window closes."}
              </p>
            </div>
          ) : showCommunityPicks && allPicks.length === 0 ? (
            <div className="px-6 py-8 text-center">
              <p className="text-sm text-zinc-400">No picks were submitted.</p>
            </div>
          ) : showCommunityPicks ? (
            <div className="divide-y divide-zinc-50">
              {allPicks.map((pick) => {
                const isCurrentUser = user?.id === pick.user_id
                const isPickCorrect = pick.status === 'correct'
                const isPickIncorrect = pick.status === 'incorrect'
                const profile = Array.isArray(pick.profiles) ? pick.profiles[0] : pick.profiles
                const displayName = profile?.display_name ?? profile?.username ?? 'Unknown'

                return (
                  <div
                    key={pick.id}
                    className={`px-6 py-3 flex items-center gap-3 ${isCurrentUser ? 'bg-zinc-50' : ''}`}
                  >
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-zinc-700">{displayName}</span>
                      {isCurrentUser && (
                        <span className="ml-1.5 text-xs text-zinc-400">(you)</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-sm font-medium text-zinc-900">{pick.pick_value}</span>
                      {isPickCorrect && (
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                          ✓ +{pick.points_earned ?? pointValue}
                        </span>
                      )}
                      {isPickIncorrect && (
                        <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
                          ✗
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
