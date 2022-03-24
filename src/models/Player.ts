import { User } from '~/models'

export interface Player {
  id?: string
  addedAt: string // ISO date
  name: string
  order: number
  score: number
  avatar: string
  userId?: User['id']
}
