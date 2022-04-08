import { ScoreLog, User } from '~/models'

export interface Player {
  id: string
  addedAt: string // ISO date
  name: string
  order: number
  scoreLogs: ScoreLog[]
  avatar: string
  userId?: User['id']
}
