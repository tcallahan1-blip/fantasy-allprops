import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockBuilder, mockSupabaseClient } from '@/lib/testing/mockSupabase'

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}))

import { createClient } from '@/lib/supabase/server'
import { updateConfidence, upsertPick } from './actions'

const mockedCreateClient = vi.mocked(createClient)

function asUser(id: string) {
  return { data: { user: { id } }, error: null }
}

describe('upsertPick', () => {
  let supabase: ReturnType<typeof mockSupabaseClient>

  beforeEach(() => {
    supabase = mockSupabaseClient()
    mockedCreateClient.mockResolvedValue(supabase as never)
  })

  it('rejects when not authenticated', async () => {
    supabase.auth.getUser.mockResolvedValue({ data: { user: null }, error: null })

    const res = await upsertPick('event-1', 'Team A')

    expect(res).toEqual({ error: 'Not authenticated' })
  })

  it('rejects a blank pick value', async () => {
    supabase.auth.getUser.mockResolvedValue(asUser('user-1'))

    const res = await upsertPick('event-1', '   ')

    expect(res).toEqual({ error: 'Enter a value before saving.' })
  })

  it('rejects when the event does not exist', async () => {
    supabase.auth.getUser.mockResolvedValue(asUser('user-1'))
    supabase.from.mockReturnValueOnce(mockBuilder({ data: null, error: { message: 'not found' } }))

    const res = await upsertPick('event-1', 'Team A')

    expect(res).toEqual({ error: 'Event not found.' })
  })

  it('rejects when the pick window is closed', async () => {
    supabase.auth.getUser.mockResolvedValue(asUser('user-1'))
    supabase.from.mockReturnValueOnce(mockBuilder({
      data: { options: null, status: 'window_closed' },
      error: null,
    }))

    const res = await upsertPick('event-1', 'Team A')

    expect(res).toEqual({ error: 'Pick window is closed for this event.' })
  })

  it('rejects a value not in the event options', async () => {
    supabase.auth.getUser.mockResolvedValue(asUser('user-1'))
    supabase.from.mockReturnValueOnce(mockBuilder({
      data: { options: ['Team A', 'Team B'], status: 'window_open' },
      error: null,
    }))

    const res = await upsertPick('event-1', 'Team C')

    expect(res).toEqual({ error: 'Pick must be one of the listed options.' })
  })

  it('saves a valid pick as a draft', async () => {
    supabase.auth.getUser.mockResolvedValue(asUser('user-1'))
    supabase.from
      .mockReturnValueOnce(mockBuilder({ data: { options: null, status: 'upcoming' }, error: null }))
      .mockReturnValueOnce(mockBuilder({ data: null, error: null }))

    const res = await upsertPick('event-1', '  Team A  ')

    expect(res).toEqual({})
    const upsertBuilder = supabase.from.mock.results[1].value
    expect(upsertBuilder.upsert).toHaveBeenCalledWith(
      { user_id: 'user-1', event_id: 'event-1', pick_value: 'Team A', status: 'draft' },
      { onConflict: 'user_id,event_id' }
    )
  })
})

describe('updateConfidence', () => {
  let supabase: ReturnType<typeof mockSupabaseClient>

  beforeEach(() => {
    supabase = mockSupabaseClient()
    mockedCreateClient.mockResolvedValue(supabase as never)
  })

  it('rejects when not authenticated', async () => {
    supabase.auth.getUser.mockResolvedValue({ data: { user: null }, error: null })

    const res = await updateConfidence('event-1', 2)

    expect(res).toEqual({ error: 'Not authenticated' })
  })

  it('sets 1x confidence without checking any budget', async () => {
    supabase.auth.getUser.mockResolvedValue(asUser('user-1'))
    supabase.from.mockReturnValueOnce(mockBuilder({ data: null, error: null }))

    const res = await updateConfidence('event-1', 1)

    expect(res).toEqual({})
    expect(supabase.from).toHaveBeenCalledTimes(1)
  })

  it('rejects a 2x boost once the double budget (15) is used up', async () => {
    supabase.auth.getUser.mockResolvedValue(asUser('user-1'))
    supabase.from
      .mockReturnValueOnce(mockBuilder({ data: null, error: null, count: 15 })) // doubleCount
      .mockReturnValueOnce(mockBuilder({ data: null, error: null, count: 0 })) // tripleCount

    const res = await updateConfidence('event-1', 2)

    expect(res).toEqual({ error: '2× boost limit reached (15 picks).' })
    expect(supabase.from).toHaveBeenCalledTimes(2)
  })

  it('allows a 2x boost under budget', async () => {
    supabase.auth.getUser.mockResolvedValue(asUser('user-1'))
    supabase.from
      .mockReturnValueOnce(mockBuilder({ data: null, error: null, count: 14 })) // doubleCount
      .mockReturnValueOnce(mockBuilder({ data: null, error: null, count: 0 })) // tripleCount
      .mockReturnValueOnce(mockBuilder({ data: null, error: null })) // update

    const res = await updateConfidence('event-1', 2)

    expect(res).toEqual({})
    const updateBuilder = supabase.from.mock.results[2].value
    expect(updateBuilder.update).toHaveBeenCalledWith({ confidence: 2 })
  })

  it('rejects a 3x boost once the triple budget (5) is used up', async () => {
    supabase.auth.getUser.mockResolvedValue(asUser('user-1'))
    supabase.from
      .mockReturnValueOnce(mockBuilder({ data: null, error: null, count: 0 })) // doubleCount
      .mockReturnValueOnce(mockBuilder({ data: null, error: null, count: 5 })) // tripleCount

    const res = await updateConfidence('event-1', 3)

    expect(res).toEqual({ error: '3× boost limit reached (5 picks).' })
  })
})
