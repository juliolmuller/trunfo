import { Box, Button, Dialog, Divider, InputLabel, MenuItem, Stack, TextField } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'

import { Counter, Section } from '~/components'
import { CARDS_COUNT } from '~/config'
import { useGame } from '~/helpers'
import { Player } from '~/models'

interface PrepareMatchDialogProps {
  open: boolean
  onClose: () => void
}

export function PrepareMatchDialog({ open, onClose }: PrepareMatchDialogProps) {
  const [roundsCount, setRoundsCount] = useState(1)
  const [firstPlayer, setFirstPlayer] = useState<Player['id']>('')
  const { activeGameMatches, activeGamePlayers, createMatch } = useGame()
  const maxCardsPerPlayer = Math.floor(CARDS_COUNT / activeGamePlayers.length)
  const minCardsPerPlayer = 1
  const hasErrors =
    !firstPlayer || roundsCount < minCardsPerPlayer || roundsCount > maxCardsPerPlayer

  function handleClose() {
    onClose()
  }

  function handleChangeFirstPlayer(event: ChangeEvent<HTMLInputElement>) {
    setFirstPlayer(event.target.value)
  }

  function handleStartBets() {
    createMatch({ firstPlayer, roundsCount })
  }

  useEffect(() => {
    setFirstPlayer(() => {
      const latestMatch = activeGameMatches.length
        ? activeGameMatches.reduce((latest, match) =>
            latest.createdAt > match.createdAt ? latest : match,
          )
        : undefined
      const lastFirstPlayerIndex = activeGamePlayers.findIndex(
        ({ id }) => id === latestMatch?.firstPlayer,
      )
      const playersCount = activeGamePlayers.length
      const wasLastInTheList = lastFirstPlayerIndex === playersCount - 1

      return wasLastInTheList
        ? activeGamePlayers[0].id
        : activeGamePlayers[lastFirstPlayerIndex + 1].id
    })
  }, [activeGameMatches, activeGamePlayers])

  return (
    <Dialog open={open} onClose={handleClose}>
      <Section fullWidth maxWidth="sm" title="Configurar a próxima partida" sx={{ my: 0 }}>
        <Stack gap={3}>
          <TextField
            label="Primeiro jogador"
            select
            value={firstPlayer}
            onChange={handleChangeFirstPlayer}
          >
            {activeGamePlayers.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </TextField>

          <Box
            sx={(theme) => ({
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 3,
              [theme.breakpoints.up('sm')]: {
                flexDirection: 'row',
              },
            })}
          >
            <InputLabel htmlFor="roundsCount" sx={{ whiteSpace: 'wrap' }}>
              Quantas cartas serão dadas a cada jogador?
            </InputLabel>

            <Counter
              id="roundsCount"
              max={maxCardsPerPlayer}
              min={minCardsPerPlayer}
              value={roundsCount}
              onChange={setRoundsCount}
              onPressEnter={handleStartBets}
            />
          </Box>

          <Divider />

          <Box
            sx={(theme) => ({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              gap: 2,
              [theme.breakpoints.up('sm')]: {
                flexDirection: 'row-reverse',
              },
            })}
          >
            <Button
              disabled={hasErrors}
              onClick={handleStartBets}
              sx={(theme) => ({
                [theme.breakpoints.down('sm')]: {
                  width: '100%',
                },
              })}
            >
              Registrar Apostas
            </Button>

            <Button
              variant="text"
              onClick={handleClose}
              sx={(theme) => ({
                [theme.breakpoints.down('sm')]: {
                  width: '100%',
                },
              })}
            >
              Cancelar
            </Button>
          </Box>
        </Stack>
      </Section>
    </Dialog>
  )
}
