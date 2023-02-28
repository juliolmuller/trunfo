import { User } from '~/models'

export interface Player {
  id: string

  name: string
  avatar: string
  addedAt: Date // stored as ISO date string
  order: number

  userId?: User['id']
}
