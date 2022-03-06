import { Turn, User } from '~/models'

// eslint-disable-next-line no-shadow
export enum ScoringMode {
  STANDARD = 'standard',
  SIMPLIFIED = 'simplified',
}

// eslint-disable-next-line no-shadow
export enum GameStatus {
  CLOSED = 'closed',
  PLAYERS_BETTING = 'players betting',
  PLAYERS_JOINING = 'players joining',
  PLAYING = 'playing',
  REPORTING_HITS = 'reporting hits',
  SETTING_UP_TURN = 'setting up turn',
}

export interface Game {
  id?: string
  betsEqualRounds: boolean
  betsUnequalRounds: boolean
  createdAt: string // ISO date
  createdBy: User['id']
  key: string
  name: string
  players: User[]
  scoreOnZeroBets: boolean
  scoringMode: ScoringMode
  status: GameStatus
  turns: Turn[]
}
