import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockBuilder, mockSupabaseClient } from '@/lib/testing/mockSupabase'

vi.mock('@/lib/supabase/admin', () => ({
  createAdminClient: vi.fn(),
}))
vi.mock('@/lib/push', () => ({
  sendPushToAllUsers: vi.fn(),
}))

import { createAdminClient } from '@/lib/supabase/admin'
import { sendPushToAllUsers } from '@/lib/push'
import { GET } from './route'

const mockedCreateAdminClient = vi.mocked(createAdminClient)
const mockedSendPush = vi.mocked(sendPushToAllUsers)

function request(secret?: string) {
  const headers = new Headers()
  if (secret !== undefined) headers.set('authorization', `Bearer ${secret}`)
  return new Request('https://example.com/api/cron/pick-windows', { headers })
}

describe('GET /api/cron/pick-windows', () => {
  let supabase: ReturnType<typeof mockSupabaseClient>

  beforeEach(() => {
    vi.stubEnv('CRON_SECRET', 'the-real-secret')
    supabase = mockSupabaseClient()
    mockedCreateAdminClient.mockReturnValue(supabase as never)
    mockedSendPush.mockReset()
    mockedSendPush.mockResolvedValue({ sent: 1, pruned: 0 })
  })

  it('rejects requests with no secret', async () => {
    const res = await GET(request())
    expect(res.status).toBe(401)
    expect(supabase.from).not.toHaveBeenCalled()
  })

  it('rejects requests with the wrong secret', async () => {
    const res = await GET(request('wrong'))
    expect(res.status).toBe(401)
  })

  it('opens windows, notifies for Pop Props, closes windows, and locks picks', async () => {
    supabase.from
      // 1. open windows
      .mockReturnValueOnce(mockBuilder({
        data: [
          { id: 'evt-x', name: 'Surprise Prop', slug: 'surprise-prop', pick_type: 'X', pick_window_closes_at: '2026-08-02T00:00:00.000Z' },
          { id: 'evt-m', name: 'Monthly Thing', slug: 'monthly-thing', pick_type: 'M', pick_window_closes_at: null },
        ],
        error: null,
      }))
      // 2. find closing events
      .mockReturnValueOnce(mockBuilder({ data: [{ id: 'evt-closing' }], error: null }))
      // 3. lock drafts
      .mockReturnValueOnce(mockBuilder({ data: [{ id: 'pick-1' }, { id: 'pick-2' }], error: null }))
      // 4. mark events window_closed
      .mockReturnValueOnce(mockBuilder({ data: null, error: null }))

    const res = await GET(request('the-real-secret'))
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body).toEqual({
      windowsOpened: 2,
      windowsClosed: 1,
      picksLocked: 2,
      popPropsNotified: 1,
    })

    // Only the X-type event triggers a push, not the M-type one
    expect(mockedSendPush).toHaveBeenCalledTimes(1)
    expect(mockedSendPush).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'New Pop Prop: Surprise Prop',
        url: '/events/surprise-prop',
      })
    )

    // Picks are locked with a locked_at timestamp, only for closing events, only drafts
    const lockBuilder = supabase.from.mock.results[2].value
    expect(lockBuilder.update).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'locked' })
    )
    expect(lockBuilder.in).toHaveBeenCalledWith('event_id', ['evt-closing'])
    expect(lockBuilder.eq).toHaveBeenCalledWith('status', 'draft')

    const closeBuilder = supabase.from.mock.results[3].value
    expect(closeBuilder.update).toHaveBeenCalledWith({ status: 'window_closed' })
  })

  it('does not fail the run if a push send throws', async () => {
    mockedSendPush.mockRejectedValue(new Error('VAPID not configured'))

    supabase.from
      .mockReturnValueOnce(mockBuilder({
        data: [{ id: 'evt-x', name: 'Surprise Prop', slug: 'surprise-prop', pick_type: 'X', pick_window_closes_at: null }],
        error: null,
      }))
      .mockReturnValueOnce(mockBuilder({ data: [], error: null }))

    const res = await GET(request('the-real-secret'))
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body.popPropsNotified).toBe(0)
    expect(body.windowsClosed).toBe(0)
  })

  it('returns 500 with the error message when a query fails', async () => {
    supabase.from.mockReturnValueOnce(mockBuilder({ data: null, error: { message: 'db is down' } }))

    const res = await GET(request('the-real-secret'))
    const body = await res.json()

    expect(res.status).toBe(500)
    expect(body).toEqual({ error: 'db is down' })
  })
})
