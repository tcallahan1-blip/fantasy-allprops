import eventsData from '@/../data/season-1-events.json'
import type { EventCategory } from '@/lib/types/database'

const MONTHS = [
  'August 2026', 'September 2026', 'October 2026', 'November 2026',
  'December 2026', 'January 2027', 'February 2027', 'March 2027',
  'April 2027', 'May 2027', 'June 2027', 'July 2027',
]

const MONTH_SUMMARIES: Record<string, string> = {
  'August 2026': 'League opens. Eclipse, WSOP final, TI15, Premier League.',
  'September 2026': 'NFL kicks off. US Open, Emmys, Venice, MTV VMAs.',
  'October 2026': 'World Series, LoL Worlds, Ballon d\'Or, Nobel Prizes, Brazil elections.',
  'November 2026': 'US Midterms. LoL Worlds final, ATP Finals, F1 Las Vegas.',
  'December 2026': 'Time POTY, Heisman, Spotify Wrapped, Strictly, F1 finale.',
  'January 2027': 'Golden Globes, Australian Open, CFP Championship, Traitors UK.',
  'February 2027': 'Super Bowl + BAFTAs on Valentine\'s Day. Grammys, Daytona 500.',
  'March 2027': 'Oscars + March Madness + F1 season opener. Cheltenham.',
  'April 2027': 'Masters, NCAA Finals, NFL Draft, NBA/NHL Playoffs start, Coachella.',
  'May 2027': 'Richest month — Derby, Eurovision, PGA, Champions League final.',
  'June 2027': 'NBA Finals + Stanley Cup (bonus). French Open, Wimbledon begins.',
  'July 2027': 'Season closes — Wimbledon, Open Championship, Tour de France.',
}

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

const BONUS_MONTHS = new Set(['October 2026', 'March 2027', 'April 2027', 'June 2027'])

export default function CalendarPage() {
  const events = eventsData.events
  const totalEvents = events.length

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="pb-4">
        <h1 className="text-2xl font-bold text-zinc-950">Event Calendar</h1>
        <p className="text-zinc-500 mt-1 text-sm">
          {totalEvents} events across Season 1 (Aug 2026 → Jul 2027)
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3 pb-4">
        <span className="text-xs font-medium text-zinc-400 mr-1">Pick type:</span>
        {(['P', 'M', 'X'] as const).map((type) => (
          <span key={type} className={`rounded-md px-2 py-0.5 text-xs font-medium ${PICK_TYPE_STYLE[type]}`}>
            {PICK_TYPE_LABELS[type]}
          </span>
        ))}
        <span className="ml-2 text-xs font-medium text-amber-600">★ Bonus window</span>
        <span className="text-xs text-zinc-400 ml-1">= 1.5× points</span>
      </div>

      {/* Months */}
      {MONTHS.map((month) => {
        const monthEvents = events.filter((e) => e.month === month)
        if (!monthEvents.length) return null
        const isBonus = BONUS_MONTHS.has(month)

        return (
          <div key={month} className="rounded-2xl border border-zinc-200 bg-white overflow-hidden">
            {/* Month header */}
            <div className={`px-6 py-4 flex items-center justify-between ${isBonus ? 'bg-amber-50 border-b border-amber-100' : 'border-b border-zinc-100'}`}>
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
                <span className="text-xs text-zinc-400">{monthEvents.length} events</span>
              </div>
            </div>
            {isBonus && MONTH_SUMMARIES[month] && (
              <div className="px-6 py-2 bg-amber-50/50 border-b border-amber-100/50">
                <p className="text-xs text-amber-700">{MONTH_SUMMARIES[month]}</p>
              </div>
            )}
            {!isBonus && MONTH_SUMMARIES[month] && (
              <div className="px-6 py-2 bg-zinc-50 border-b border-zinc-100">
                <p className="text-xs text-zinc-400">{MONTH_SUMMARIES[month]}</p>
              </div>
            )}

            {/* Events */}
            <div className="divide-y divide-zinc-50">
              {monthEvents.map((event) => (
                <div
                  key={event.id}
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
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
