import { User } from '~/models'

export interface Player {
  id: string

  name: string
  order: number
  addedAt: Date // stored as ISO date string
  avatar: string

  userId?: User['id']
}
