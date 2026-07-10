import { vi } from 'vitest'

export interface MockResult {
  data?: unknown
  error?: { message: string; code?: string } | null
  count?: number | null
}

const CHAIN_METHODS = [
  'select', 'insert', 'update', 'upsert', 'delete',
  'eq', 'neq', 'in', 'not', 'gt', 'gte', 'lt', 'lte',
  'order', 'limit', 'single', 'maybeSingle',
] as const

/**
 * A chainable, thenable stand-in for supabase-js's PostgrestFilterBuilder.
 * Every chain method returns the same builder; awaiting it (at any point in
 * the chain) resolves to `result` — mirroring how the real client resolves
 * on await regardless of how many filters were chained first.
 */
export function mockBuilder(result: MockResult = { data: null, error: null }) {
  const builder: Record<string, unknown> = {}
  for (const method of CHAIN_METHODS) {
    builder[method] = vi.fn(() => builder)
  }
  builder.then = (
    resolve: (value: MockResult) => unknown,
    reject?: (reason: unknown) => unknown
  ) => Promise.resolve(result).then(resolve, reject)
  return builder
}

/** A mock Supabase client with `auth.getUser` and `from` left for the test to configure. */
export function mockSupabaseClient() {
  return {
    auth: { getUser: vi.fn() },
    from: vi.fn(),
  }
}
