export default function AdminEventsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Events</h1>
          <p className="text-gray-500 mt-1">Manage events, pick windows, and results</p>
        </div>
        <button className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors">
          Add event
        </button>
      </div>

      <div className="flex gap-2">
        {(['All', 'Upcoming', 'Window Open', 'Result Pending', 'Scored'] as const).map((status) => (
          <button
            key={status}
            className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            {status}
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
          <tbody>
            <tr>
              <td colSpan={7} className="px-4 py-12 text-center text-gray-400">
                Load events from the database or seed from data/season-1-events.json
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
