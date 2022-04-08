import { Turn } from '~/models'

export interface ScoreLog {
  id: string
  betRounds: number
  wonRounds: number
  turnId: Turn['id']
  turn: Turn
}
