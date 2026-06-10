export default function AdminScoringPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Scoring</h1>
        <p className="text-gray-500 mt-1">Run scoring passes for resolved events</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-xl border border-gray-100 p-6 space-y-4">
          <h2 className="font-semibold">Manual result entry</h2>
          <p className="text-sm text-gray-500">
            Enter the official result for a manual-verification event, then run the scoring pass.
          </p>
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-sm font-medium">Event</label>
              <select className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black">
                <option value="">Select an event…</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Official result</label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="e.g. Novak Djokovic"
              />
            </div>
            <button className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors">
              Save result &amp; score picks
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 p-6 space-y-4">
          <h2 className="font-semibold">Scoring rules</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left pb-2 font-medium text-gray-500">Pick type</th>
                <th className="text-right pb-2 font-medium text-gray-500">Base pts</th>
                <th className="text-right pb-2 font-medium text-gray-500">Bonus (1.5×)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <tr>
                <td className="py-2">Pre-Season (P)</td>
                <td className="py-2 text-right font-medium">15</td>
                <td className="py-2 text-right font-medium text-amber-600">22.5</td>
              </tr>
              <tr>
                <td className="py-2">Monthly (M)</td>
                <td className="py-2 text-right font-medium">10</td>
                <td className="py-2 text-right font-medium text-amber-600">15</td>
              </tr>
              <tr>
                <td className="py-2">Pop Prop (X)</td>
                <td className="py-2 text-right font-medium">5</td>
                <td className="py-2 text-right font-medium text-amber-600">7.5</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
