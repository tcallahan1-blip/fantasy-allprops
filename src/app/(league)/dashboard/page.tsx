const UPCOMING_WINDOWS = [
  {
    label: 'Pre-Season Picks',
    opens: 'July 1, 2026',
    description: 'Lock in your big calls before Season 1 begins. Champions, award winners, political outcomes.',
    pts: 15,
    color: 'bg-violet-50 border-violet-200 text-violet-700',
    badge: 'bg-violet-100 text-violet-700',
  },
  {
    label: 'August Monthly Picks',
    opens: 'August 1, 2026',
    description: 'Solar Eclipse, Tour de France Femmes, WSOP final table, Edinburgh Comedy Award.',
    pts: 10,
    color: 'bg-blue-50 border-blue-200 text-blue-700',
    badge: 'bg-blue-100 text-blue-700',
  },
  {
    label: 'Pop Props',
    opens: 'Per event — 24–72 hrs notice',
    description: 'Short-window picks that open right before big moments. Watch for notifications.',
    pts: 5,
    color: 'bg-amber-50 border-amber-200 text-amber-700',
    badge: 'bg-amber-100 text-amber-700',
  },
]

const SCORING = [
  { type: 'Pre-Season (P)', base: 15, bonus: 22.5, desc: 'Long-horizon picks, locked before Aug 2026' },
  { type: 'Monthly (M)', base: 10, bonus: 15, desc: 'Submitted by the 7th of each month' },
  { type: 'Pop Prop (X)', base: 5, bonus: 7.5, desc: '24–72 hr windows around specific events' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-950">Dashboard</h1>
        <p className="text-zinc-500 mt-1 text-sm">Season 1 · August 2026 → July 2027</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 space-y-2">
          <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Total Points</div>
          <div className="text-4xl font-extrabold text-zinc-950">—</div>
          <div className="text-xs text-zinc-400">Season hasn't started</div>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 space-y-2">
          <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Picks Made</div>
          <div className="text-4xl font-extrabold text-zinc-950">0</div>
          <div className="text-xs text-zinc-400">Pre-season opens July 2026</div>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 space-y-2">
          <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Accuracy</div>
          <div className="text-4xl font-extrabold text-zinc-950">—</div>
          <div className="text-xs text-zinc-400">Calculated as events resolve</div>
        </div>
      </div>

      {/* Upcoming windows */}
      <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-100">
          <h2 className="font-semibold text-zinc-950">Upcoming pick windows</h2>
        </div>
        <div className="divide-y divide-zinc-100">
          {UPCOMING_WINDOWS.map((window) => (
            <div key={window.label} className="px-6 py-5 flex items-start gap-4">
              <div className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold mt-0.5 ${window.badge}`}>
                +{window.pts} pts
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-zinc-950 text-sm">{window.label}</div>
                <div className="text-xs text-zinc-500 mt-0.5">{window.opens}</div>
                <div className="text-xs text-zinc-400 mt-1.5 leading-relaxed">{window.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scoring reference */}
      <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-100">
          <h2 className="font-semibold text-zinc-950">Scoring</h2>
        </div>
        <div className="divide-y divide-zinc-100">
          {SCORING.map((row) => (
            <div key={row.type} className="px-6 py-4 flex items-center gap-6">
              <div className="flex-1">
                <div className="text-sm font-medium text-zinc-950">{row.type}</div>
                <div className="text-xs text-zinc-400 mt-0.5">{row.desc}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-sm font-semibold text-zinc-950">{row.base} pts</div>
                <div className="text-xs text-amber-600 font-medium mt-0.5">{row.bonus} pts ★ bonus</div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-3 bg-amber-50 border-t border-amber-100">
          <p className="text-xs text-amber-700">
            <span className="font-semibold">★ Bonus windows</span> — dense event months earn 1.5× on correct picks.
            October, March, April, and June 2027 are confirmed bonus months.
          </p>
        </div>
      </div>
    </div>
  )
}
