import { ScoreLog, User } from '~/models'

export interface Player {
  id: string
  addedAt: Date // stored as ISO date string
  name: string
  order: number
  scoreLogs: ScoreLog[]
  avatar: string
  userId?: User['id']
}
