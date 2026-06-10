export type PickType = 'P' | 'M' | 'X'
export type VerificationType = 'A' | 'M'
export type EventStatus = 'upcoming' | 'window_open' | 'window_closed' | 'result_pending' | 'scored' | 'cancelled'
export type PickStatus = 'draft' | 'locked' | 'correct' | 'incorrect' | 'void'
export type EventCategory =
  | 'Sports-Major'
  | 'Sports-Niche'
  | 'Sports-Olympic'
  | 'Politics'
  | 'RealityTV'
  | 'Awards'
  | 'Influencer'
  | 'Culture'
  | 'NicheChamp'
  | 'Tech'
  | 'Weather'
  | 'Esports'

export interface Profile {
  id: string
  username: string
  display_name: string | null
  avatar_url: string | null
  is_admin: boolean
  current_streak: number
  longest_streak: number
  badges: string[]
  created_at: string
  updated_at: string
}

export interface Event {
  id: string
  slug: string
  name: string
  category: EventCategory
  season: number
  month: string
  event_date: string | null
  date_tbc: boolean
  pick_type: PickType
  bonus_window: boolean
  verification: VerificationType
  status: EventStatus
  pick_window_opens_at: string | null
  pick_window_closes_at: string | null
  official_result: string | null
  result_confirmed_at: string | null
  notes: string | null
  description: string | null
  website_url: string | null
  options: string[] | null
  created_at: string
  updated_at: string
}

export interface Pick {
  id: string
  user_id: string
  event_id: string
  pick_value: string
  confidence: number
  status: PickStatus
  locked_at: string | null
  points_earned: number | null
  created_at: string
  updated_at: string
}

export const CONFIDENCE_BUDGET = { double: 15, triple: 5 } as const

export interface LeaderboardEntry {
  user_id: string
  username: string
  display_name: string | null
  avatar_url: string | null
  joined_at: string
  current_streak: number
  badges: string[]
  total_points: number
  total_picks: number
  correct_picks: number
  incorrect_picks: number
  accuracy_pct: number | null
}

export interface ScoringRule {
  id: string
  pick_type: PickType
  base_points: number
  bonus_multiplier: number
  created_at: string
}

export interface League {
  id: string
  name: string
  slug: string
  invite_token: string
  owner_id: string | null
  created_at: string
}

export interface LeagueMembership {
  league_id: string
  user_id: string
  joined_at: string
}

export interface LeagueWithMeta extends League {
  member_count: number
  is_owner: boolean
}

export interface PickDistribution {
  event_id: string
  pick_value: string
  pick_count: number
  pct: number
}

export interface PickWithEvent extends Pick {
  event: Event
}

export interface EventWithUserPick extends Event {
  user_pick?: Pick
}

export const PICK_TYPE_LABELS: Record<PickType, string> = {
  P: 'Pre-Season',
  M: 'Monthly',
  X: 'Pop Prop',
}

export const PICK_TYPE_POINTS: Record<PickType, number> = {
  P: 15,
  M: 10,
  X: 5,
}

export const CATEGORY_LABELS: Record<EventCategory, string> = {
  'Sports-Major': 'Major Sports',
  'Sports-Niche': 'Niche Sports',
  'Sports-Olympic': 'Olympic Sports',
  Politics: 'Politics',
  RealityTV: 'Reality TV',
  Awards: 'Awards',
  Influencer: 'Influencer',
  Culture: 'Culture',
  NicheChamp: 'Niche Championships',
  Tech: 'Tech',
  Weather: 'Weather',
  Esports: 'Esports',
}

export const BONUS_MULTIPLIER = 1.5

/** Points earned for a scored pick. Apply after the pick is confirmed correct. */
export function calcPoints(
  pickType: PickType,
  bonusWindow: boolean,
  confidence: number = 1
): number {
  return PICK_TYPE_POINTS[pickType] * confidence * (bonusWindow ? BONUS_MULTIPLIER : 1)
}
