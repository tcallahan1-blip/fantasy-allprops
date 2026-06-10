const FILTER_TABS = ['All', 'Pre-Season', 'Monthly', 'Pop Props'] as const

export default function PicksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-950">My Picks</h1>
          <p className="text-zinc-500 mt-1 text-sm">All your picks across Season 1</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5 bg-zinc-100 rounded-xl p-1 w-fit">
        {FILTER_TABS.map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              i === 0
                ? 'bg-white text-zinc-950 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Empty state */}
      <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden">
        <div className="px-6 py-16 text-center space-y-4">
          <div className="text-5xl">🎯</div>
          <div className="space-y-1.5">
            <p className="font-semibold text-zinc-950">No picks yet</p>
            <p className="text-sm text-zinc-400 max-w-xs mx-auto leading-relaxed">
              Pre-season picks open July 1, 2026. You'll be able to lock in your big calls before Season 1 begins.
            </p>
          </div>
          <div className="pt-2">
            <button className="rounded-xl bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors">
              Browse events →
            </button>
          </div>
        </div>

        {/* Upcoming windows */}
        <div className="border-t border-zinc-100 bg-zinc-50 divide-y divide-zinc-100">
          <div className="px-6 py-3">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Upcoming windows</p>
          </div>
          {[
            { type: 'Pre-Season', opens: 'July 1, 2026', pts: 15, style: 'bg-violet-100 text-violet-700' },
            { type: 'August Monthly', opens: 'August 1, 2026', pts: 10, style: 'bg-blue-100 text-blue-700' },
          ].map((w) => (
            <div key={w.type} className="px-6 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${w.style}`}>{w.type}</span>
                <span className="text-sm text-zinc-600">Opens {w.opens}</span>
              </div>
              <span className="text-xs font-semibold text-zinc-400">+{w.pts} pts each</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
