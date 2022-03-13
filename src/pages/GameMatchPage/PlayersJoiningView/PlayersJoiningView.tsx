import { useAuth } from '~/hooks'
import { Game } from '~/models'

import PlayersJoiningAdminView from './AdminView'

export interface PlayersJoiningViewProps {
  game: Game
}

function PlayersJoiningView({ game }: PlayersJoiningViewProps) {
  const { user } = useAuth()

  return game?.createdBy === user?.id
    ? <PlayersJoiningAdminView game={game} />
    : null // TODO: implement other element
}

export default PlayersJoiningView
