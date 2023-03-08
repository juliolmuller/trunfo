import { MatchLog, Player } from '~/models'

export interface Match {
  id: string

  roundsCount: number
  firstPlayer: Player['id']
  playerTurn?: Player['id']

  createdAt: Date // stored as ISO date string
  logs: MatchLog[]
}
