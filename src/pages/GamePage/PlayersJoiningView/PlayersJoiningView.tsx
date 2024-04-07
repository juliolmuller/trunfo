import { useAuth } from '~/helpers'
import { Game } from '~/models'

import PlayersJoiningGeneralView from '../AwaitingView'
import PlayersJoiningAdminView from './AdminView'

export interface PlayersJoiningViewProps {
  game: Game
}

function PlayersJoiningView({ game }: PlayersJoiningViewProps) {
  const { user } = useAuth()

  return game.createdBy === user?.id ? (
    <PlayersJoiningAdminView game={game} />
  ) : (
    <PlayersJoiningGeneralView game={game} />
  )
}

export default PlayersJoiningView
