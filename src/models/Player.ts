import { User } from '~/models'

export interface Player {
  id?: string
  userId?: User['id']
  name: string
  avatar?: string
  order: number
  score: number
}
