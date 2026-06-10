import eventsData from '@/../data/season-1-events.json'
import MonthSection from './MonthSection'

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
        return (
          <MonthSection
            key={month}
            month={month}
            summary={MONTH_SUMMARIES[month] ?? ''}
            isBonus={BONUS_MONTHS.has(month)}
            events={monthEvents}
          />
        )
      })}
    </div>
  )
}
