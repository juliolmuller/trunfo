import { useAuth } from '~/helpers'
import { Game } from '~/models'

import { AwaitingView as PlayersJoiningGeneralView } from '../AwaitingView'
import { PlayersJoiningAdminView } from './AdminView'

export interface PlayersJoiningViewProps {
  game: Game
}

export function PlayersJoiningView({ game }: PlayersJoiningViewProps) {
  const { user } = useAuth()

  return game.createdBy === user?.id ? (
    <PlayersJoiningAdminView game={game} />
  ) : (
    <PlayersJoiningGeneralView game={game} />
  )
}
