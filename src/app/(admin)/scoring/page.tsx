import { createClient } from '@/lib/supabase/server'
import ScoringForm from './ScoringForm'
import type { Event } from '@/lib/types/database'

export default async function AdminScoringPage() {
  const supabase = await createClient()

  const { data: events } = await supabase
    .from('events')
    .select('*')
    .in('status', ['window_closed', 'result_pending', 'scored'])
    .order('month')
    .order('name')

  const pending = (events ?? []).filter((e: Event) => e.status !== 'scored')
  const scored = (events ?? []).filter((e: Event) => e.status === 'scored')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Scoring</h1>
        <p className="text-gray-500 mt-1">Enter results and score picks for resolved events.</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-xl border border-gray-100 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Enter result</h2>
            {pending.length > 0 && (
              <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
                {pending.length} pending
              </span>
            )}
          </div>
          {pending.length === 0 ? (
            <p className="text-sm text-gray-400">No events awaiting a result yet.</p>
          ) : (
            <ScoringForm events={pending} />
          )}
        </div>

        <div className="rounded-xl border border-gray-100 p-6 space-y-4">
          <h2 className="font-semibold">Scoring rules</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left pb-2 font-medium text-gray-500">Pick type</th>
                <th className="text-right pb-2 font-medium text-gray-500">Base</th>
                <th className="text-right pb-2 font-medium text-gray-500">1× / 2× / 3×</th>
                <th className="text-right pb-2 font-medium text-gray-500">Bonus (1.5×)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { type: 'Pre-Season (P)', base: 15 },
                { type: 'Monthly (M)', base: 10 },
                { type: 'Pop Prop (X)', base: 5 },
              ].map(row => (
                <tr key={row.type}>
                  <td className="py-2">{row.type}</td>
                  <td className="py-2 text-right font-medium">{row.base}</td>
                  <td className="py-2 text-right text-gray-500">
                    {row.base} / {row.base * 2} / {row.base * 3}
                  </td>
                  <td className="py-2 text-right font-medium text-amber-600">
                    {row.base * 1.5}–{row.base * 3 * 1.5}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-400">
            Points = base × confidence (1–3×) × bonus (1.5× on bonus window events).
          </p>
        </div>
      </div>

      {scored.length > 0 && (
        <div className="rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h2 className="font-semibold text-sm">Recently scored ({scored.length})</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {scored.slice(0, 20).map((e: Event) => (
              <div key={e.id} className="px-6 py-3 flex items-center justify-between text-sm">
                <div>
                  <span className="font-medium text-gray-900">{e.name}</span>
                  <span className="ml-2 text-gray-400">{e.month}</span>
                </div>
                <span className="text-gray-600 font-medium">{e.official_result}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
