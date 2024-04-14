import { Player, Match, User } from '~/models'

export enum ScoringMode {
  STANDARD = 'standard',
  SIMPLIFIED = 'simplified',
}

export enum GameStatus {
  AWAITING = 'awaiting',
  CLOSED = 'closed',
  PLAYERS_BETTING = 'players betting',
  PLAYERS_JOINING = 'players joining',
  PLAYING = 'playing',
  REPORTING_HITS = 'reporting hits',
}

export interface Game {
  id: string

  name: string
  scoringMode: ScoringMode
  betsEqualRounds: boolean
  betsUnequalRounds: boolean
  scoreOnZeroBets: boolean

  key: string
  createdAt: Date // stored as ISO date string
  createdBy: User['id']
  status: GameStatus

  players: Player[]
  matches: Match[]
}
