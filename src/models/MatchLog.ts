import { Player } from '~/models'

export interface MatchLog {
  id: string

  player: Player['id']
  betsCount: number
  hitsCount: number
}
