import AddIcon from '@mui/icons-material/AddCircleOutline'
import EndIcon from '@mui/icons-material/CancelPresentation'
import Stack from '@mui/material/Stack'

import Button from '~/components/Button'
import Paper from '~/components/Paper'
import ScoreBoard from '~/components/ScoreBoard'
import { useAuth, useGame } from '~/hooks'
import { Game } from '~/models'

export interface AwaitingViewProps {
  game: Game
}

function AwaitingView({ game }: AwaitingViewProps) {
  const { user } = useAuth()
  const { defineNewTurn, endMatch } = useGame()
  const isGameOwner = user?.id === game.createdBy

  function handleDefineNewTurn() {
    defineNewTurn()
  }

  function handleEndMatch() {
    endMatch()
  }

  return (
    <Paper fullWidth maxWidth="sm">
      <ScoreBoard players={game.players} />

      {isGameOwner && (
        <Stack direction="row" justifyContent="space-evenly" mt={3}>
          <Button
            color="success"
            startIcon={<AddIcon />}
            onClick={handleDefineNewTurn}
            sx={{ color: 'common.white' }}
          >
            Nova Jogada
          </Button>
          <Button
            color="error"
            startIcon={<EndIcon />}
            onClick={handleEndMatch}
            sx={{ color: 'common.white' }}
          >
            Encerrar Partida
          </Button>
        </Stack>
      )}
    </Paper>
  )
}

export default AwaitingView
