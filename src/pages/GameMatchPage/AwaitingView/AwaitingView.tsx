import Paper from '~/components/Paper'
import ScoreBoard from '~/components/ScoreBoard'
import { Game } from '~/models'

export interface AwaitingViewProps {
  game: Game
}

function AwaitingView({ game }: AwaitingViewProps) {
  return (
    <Paper fullWidth maxWidth="sm">
      <ScoreBoard players={game.players} />
    </Paper>
  )
}

export default AwaitingView
