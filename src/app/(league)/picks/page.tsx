import { createClient } from '@/lib/supabase/server'
import PicksList from './PicksList'
import type { Event, Pick, EventWithUserPick, PickDistribution } from '@/lib/types/database'
import { CONFIDENCE_BUDGET } from '@/lib/types/database'

export default async function PicksPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let eventsWithPicks: EventWithUserPick[] = []
  let doubleRemaining = CONFIDENCE_BUDGET.double
  let tripleRemaining = CONFIDENCE_BUDGET.triple
  let distributions: PickDistribution[] = []

  if (user) {
    const [{ data: events }, { data: picks }] = await Promise.all([
      supabase.from('events').select('*').order('month').order('name'),
      supabase.from('picks').select('*').eq('user_id', user.id),
    ])

    const pickMap = new Map<string, Pick>()
    for (const pick of (picks ?? [])) {
      pickMap.set(pick.event_id, pick)
    }

    eventsWithPicks = (events ?? []).map((e: Event) => ({
      ...e,
      user_pick: pickMap.get(e.id),
    }))

    const activePicks = picks ?? []
    const doubleUsed = activePicks.filter(
      (p: Pick) => p.confidence === 2 && (p.status === 'draft' || p.status === 'locked')
    ).length
    const tripleUsed = activePicks.filter(
      (p: Pick) => p.confidence === 3 && (p.status === 'draft' || p.status === 'locked')
    ).length
    doubleRemaining = CONFIDENCE_BUDGET.double - doubleUsed
    tripleRemaining = CONFIDENCE_BUDGET.triple - tripleUsed

    // Fetch crowd distributions for events whose window is closed
    const closedEventIds = eventsWithPicks
      .filter(e => ['window_closed', 'result_pending', 'scored'].includes(e.status))
      .map(e => e.id)

    if (closedEventIds.length > 0) {
      const { data: dist } = await supabase
        .from('pick_distributions')
        .select('*')
        .in('event_id', closedEventIds)
      distributions = (dist ?? []) as PickDistribution[]
    }
  }

  const totalPicked = eventsWithPicks.filter(e => e.user_pick).length
  const totalEvents = eventsWithPicks.length

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-950">My Picks</h1>
          <p className="text-zinc-500 mt-1 text-sm">Season 1 · August 2026 → July 2027</p>
        </div>
        {totalEvents > 0 && (
          <div className="text-sm text-zinc-500">
            <span className="font-semibold text-zinc-950">{totalPicked}</span> / {totalEvents} picked
          </div>
        )}
      </div>

      {totalEvents === 0 ? (
        <div className="rounded-2xl border border-zinc-200 bg-white px-6 py-16 text-center space-y-3">
          <p className="font-semibold text-zinc-950">No events loaded yet</p>
          <p className="text-sm text-zinc-400 max-w-xs mx-auto">
            Run the seed script in Supabase SQL Editor to load all 195 events.
          </p>
        </div>
      ) : (
        <PicksList
          events={eventsWithPicks}
          initialDouble={doubleRemaining}
          initialTriple={tripleRemaining}
          distributions={distributions}
        />
      )}
    </div>
  )
}
