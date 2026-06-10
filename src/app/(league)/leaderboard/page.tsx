const MOCK_PLAYERS = [
  { rank: 1, username: 'propking88', display: 'PropKing', points: 0, picks: 0, accuracy: null },
  { rank: 2, username: 'allprops_flo', display: 'Flo', points: 0, picks: 0, accuracy: null },
  { rank: 3, username: 'picklord', display: 'PickLord', points: 0, picks: 0, accuracy: null },
]

export default function LeaderboardPage() {
  const seasonOpen = false

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-950">Leaderboard</h1>
          <p className="text-zinc-500 mt-1 text-sm">Season 1 standings</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          <span className="text-xs font-semibold text-amber-700">Opens Aug 2026</span>
        </div>
      </div>

      {/* Pre-season banner */}
      {!seasonOpen && (
        <div className="rounded-2xl border border-violet-200 bg-violet-50 px-6 py-5 flex gap-4">
          <div className="text-2xl">🏆</div>
          <div>
            <div className="font-semibold text-violet-900 text-sm">Season 1 hasn't started yet</div>
            <p className="text-xs text-violet-700 mt-1 leading-relaxed">
              The leaderboard goes live when the first picks resolve. Pre-season picks open July 1, 2026
              — lock in your calls before August to get ahead.
            </p>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden">
        <div className="grid grid-cols-[3rem_1fr_6rem_5rem_6rem] border-b border-zinc-100 bg-zinc-50 px-6 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          <div>#</div>
          <div>Player</div>
          <div className="text-right">Points</div>
          <div className="text-right">Picks</div>
          <div className="text-right">Accuracy</div>
        </div>

        {seasonOpen ? (
          <div className="divide-y divide-zinc-50">
            {MOCK_PLAYERS.map((player) => (
              <div key={player.username} className="grid grid-cols-[3rem_1fr_6rem_5rem_6rem] items-center px-6 py-4">
                <div className="text-sm font-bold text-zinc-400">{player.rank}</div>
                <div>
                  <div className="text-sm font-semibold text-zinc-950">{player.display}</div>
                  <div className="text-xs text-zinc-400">@{player.username}</div>
                </div>
                <div className="text-right text-sm font-bold text-zinc-950">{player.points}</div>
                <div className="text-right text-sm text-zinc-500">{player.picks}</div>
                <div className="text-right text-sm text-zinc-400">{player.accuracy ?? '—'}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-16 text-center space-y-3">
            <div className="text-4xl">🏆</div>
            <p className="text-sm font-medium text-zinc-500">Standings appear once picks start resolving</p>
            <p className="text-xs text-zinc-400">Be the first on the board — join Season 1 and make your pre-season picks.</p>
          </div>
        )}
      </div>

      {/* Scoring reminder */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 grid grid-cols-3 gap-6 text-center">
        {[
          { label: 'Pre-Season correct', pts: '15 pts', bonus: '22.5 pts ★', color: 'text-violet-600' },
          { label: 'Monthly correct', pts: '10 pts', bonus: '15 pts ★', color: 'text-blue-600' },
          { label: 'Pop Prop correct', pts: '5 pts', bonus: '7.5 pts ★', color: 'text-amber-600' },
        ].map((row) => (
          <div key={row.label} className="space-y-1">
            <div className={`text-xl font-extrabold ${row.color}`}>{row.pts}</div>
            <div className="text-xs font-medium text-zinc-950">{row.label}</div>
            <div className="text-xs text-amber-600">{row.bonus} in bonus month</div>
          </div>
        ))}
      </div>
    </div>
  )
}
