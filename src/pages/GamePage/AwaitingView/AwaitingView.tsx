import AddIcon from '@mui/icons-material/AddCircleOutline'
import EndIcon from '@mui/icons-material/CancelPresentation'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { useState } from 'react'

import ScoreBoard from '~/components/ScoreBoard'
import Section from '~/components/Section'
import { useAuth, useGame } from '~/helpers'
import { Game } from '~/models'

import PrepareMatchDialog from './PrepareMatchDialog'

export interface AwaitingViewProps {
  game: Game
}

function AwaitingView({ game }: AwaitingViewProps) {
  const [isPreparingMatch, setPreparingMatch] = useState(false)
  const { user } = useAuth()
  const { endGame } = useGame()
  const isGameOwner = user?.id === game.createdBy

  function handleEndGame() {
    endGame()
  }

  function handlePrepareMatch() {
    setPreparingMatch(true)
  }

  return (
    <Section fullWidth maxWidth="sm">
      <ScoreBoard players={game.players} />

      {isGameOwner && (
        <Stack direction="row" justifyContent="space-evenly" mt={3}>
          <Button
            startIcon={<EndIcon />}
            onClick={handleEndGame}
            sx={{ color: 'common.white' }}
          >
            Encerrar Jogo
          </Button>

          <Button
            color="secondary"
            startIcon={<AddIcon />}
            onClick={handlePrepareMatch}
            sx={{ color: 'common.white' }}
          >
            Nova Partida
          </Button>
        </Stack>
      )}

      <PrepareMatchDialog open={isPreparingMatch} onClose={() => setPreparingMatch(false)} />
    </Section>
  )
}

export default AwaitingView
