import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockBuilder, mockSupabaseClient } from '@/lib/testing/mockSupabase'

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}))

import { createClient } from '@/lib/supabase/server'
import { scoreEvent } from './actions'

const mockedCreateClient = vi.mocked(createClient)

function asUser(id: string) {
  return { data: { user: { id } }, error: null }
}

describe('scoreEvent', () => {
  let supabase: ReturnType<typeof mockSupabaseClient>

  beforeEach(() => {
    supabase = mockSupabaseClient()
    mockedCreateClient.mockResolvedValue(supabase as never)
  })

  it('rejects when not authenticated', async () => {
    supabase.auth.getUser.mockResolvedValue({ data: { user: null }, error: null })

    const res = await scoreEvent('event-1', 'Team A')

    expect(res).toEqual({ error: 'Not authenticated' })
  })

  it('rejects non-admins', async () => {
    supabase.auth.getUser.mockResolvedValue(asUser('user-1'))
    supabase.from.mockReturnValueOnce(mockBuilder({ data: { is_admin: false }, error: null }))

    const res = await scoreEvent('event-1', 'Team A')

    expect(res).toEqual({ error: 'Admin only.' })
  })

  it('rejects a blank result', async () => {
    supabase.auth.getUser.mockResolvedValue(asUser('admin-1'))
    supabase.from.mockReturnValueOnce(mockBuilder({ data: { is_admin: true }, error: null }))

    const res = await scoreEvent('event-1', '   ')

    expect(res).toEqual({ error: 'Enter the official result.' })
  })

  it('rejects when the event does not exist', async () => {
    supabase.auth.getUser.mockResolvedValue(asUser('admin-1'))
    supabase.from
      .mockReturnValueOnce(mockBuilder({ data: { is_admin: true }, error: null }))
      .mockReturnValueOnce(mockBuilder({ data: null, error: { message: 'not found' } }))

    const res = await scoreEvent('event-1', 'Team A')

    expect(res).toEqual({ error: 'Event not found.' })
  })

  it('rejects a result not in the event options', async () => {
    supabase.auth.getUser.mockResolvedValue(asUser('admin-1'))
    supabase.from
      .mockReturnValueOnce(mockBuilder({ data: { is_admin: true }, error: null }))
      .mockReturnValueOnce(mockBuilder({
        data: { id: 'event-1', pick_type: 'M', bonus_window: false, options: ['Team A', 'Team B'] },
        error: null,
      }))

    const res = await scoreEvent('event-1', 'Team C')

    expect(res).toEqual({ error: 'Official result must match one of the event options.' })
  })

  it('scores correct and incorrect picks, and updates streaks accordingly', async () => {
    supabase.auth.getUser.mockResolvedValue(asUser('admin-1'))

    supabase.from
      // 1. admin check
      .mockReturnValueOnce(mockBuilder({ data: { is_admin: true }, error: null }))
      // 2. event lookup — Monthly pick, bonus window active
      .mockReturnValueOnce(mockBuilder({
        data: { id: 'event-1', pick_type: 'M', bonus_window: true, options: null },
        error: null,
      }))
      // 3. event update (official_result + status)
      .mockReturnValueOnce(mockBuilder({ data: null, error: null }))
      // 4. locked picks fetch — winner at 2x confidence, loser at 1x
      .mockReturnValueOnce(mockBuilder({
        data: [
          { id: 'pick-winner', user_id: 'user-winner', pick_value: 'Team A', confidence: 2 },
          { id: 'pick-loser', user_id: 'user-loser', pick_value: 'Team B', confidence: 1 },
        ],
        error: null,
      }))
      // 5. update pick-winner
      .mockReturnValueOnce(mockBuilder({ data: null, error: null }))
      // 6. update pick-loser
      .mockReturnValueOnce(mockBuilder({ data: null, error: null }))

    // Streak update loop order depends on Set iteration order (insertion order): user-winner, then user-loser
    supabase.from
      // user-winner: re-fetch pick status
      .mockReturnValueOnce(mockBuilder({ data: { status: 'correct' }, error: null }))
      // user-winner: current streak
      .mockReturnValueOnce(mockBuilder({ data: { current_streak: 2, longest_streak: 4 }, error: null }))
      // user-winner: streak update — capture the payload
      .mockReturnValueOnce(mockBuilder({ data: null, error: null }))
      // user-loser: re-fetch pick status
      .mockReturnValueOnce(mockBuilder({ data: { status: 'incorrect' }, error: null }))
      // user-loser: current streak
      .mockReturnValueOnce(mockBuilder({ data: { current_streak: 5, longest_streak: 5 }, error: null }))
      // user-loser: streak update
      .mockReturnValueOnce(mockBuilder({ data: null, error: null }))

    const res = await scoreEvent('event-1', 'Team A')

    expect(res).toEqual({ scored: 2 })

    // Pick updates: winner gets M base(10) * confidence(2) * bonus(1.5) = 30; loser gets 0
    const pickUpdateCalls = supabase.from.mock.results
    const winnerUpdateBuilder = pickUpdateCalls[4].value // 5th call (index 4): update pick-winner
    expect(winnerUpdateBuilder.update).toHaveBeenCalledWith({ status: 'correct', points_earned: 30 })

    const loserUpdateBuilder = pickUpdateCalls[5].value // 6th call: update pick-loser
    expect(loserUpdateBuilder.update).toHaveBeenCalledWith({ status: 'incorrect', points_earned: 0 })

    // Streak updates: winner's streak increments 2 -> 3 (longest stays 4); loser's streak resets to 0
    const winnerStreakBuilder = pickUpdateCalls[8].value // 9th call: profiles update for winner
    expect(winnerStreakBuilder.update).toHaveBeenCalledWith({ current_streak: 3, longest_streak: 4 })

    const loserStreakBuilder = pickUpdateCalls[11].value // 12th call: profiles update for loser
    expect(loserStreakBuilder.update).toHaveBeenCalledWith({ current_streak: 0, longest_streak: 5 })
  })
})
