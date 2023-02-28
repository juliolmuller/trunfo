import { MatchLog, Player } from '~/models'

// eslint-disable-next-line no-shadow
export enum MatchStatus {
  BETTING = 'betting',
  PLAYING = 'playing',
  SCORING = 'scoring',
  FINALIZED = 'finalized'
}

export interface Match {
  id: string

  roundsCount: number
  firstPlayer: Player['id']
  playerTurn?: Player['id']

  status: MatchStatus
  createdAt: Date // stored as ISO date string
  logs: MatchLog[]
}
