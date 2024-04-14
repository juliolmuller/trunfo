import { AddCircleOutline as AddIcon, CancelPresentation as EndIcon } from '@mui/icons-material'
import { Button, Stack } from '@mui/material'
import { useState } from 'react'

import { OverallScoreBoard, Section } from '~/components'
import { useAuth, useGame } from '~/helpers'
import { Game } from '~/models'

import { PrepareMatchDialog } from './PrepareMatchDialog'

export interface AwaitingViewProps {
  game: Game
}

export function AwaitingView({ game }: AwaitingViewProps) {
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
      <OverallScoreBoard players={game.players} />

      {isGameOwner && (
        <Stack direction="row" justifyContent="space-evenly" mt={3}>
          <Button startIcon={<EndIcon />} onClick={handleEndGame} sx={{ color: 'common.white' }}>
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
