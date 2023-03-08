import CancelIcon from '@mui/icons-material/Close'
import NextIcon from '@mui/icons-material/NavigateNext'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { ChangeEvent, useEffect, useState } from 'react'

import Counter from '~/components/Counter'
import Section from '~/components/Section'
import { CARDS_COUNT } from '~/config'
import { useGame } from '~/helpers'
import { Player } from '~/models'

function SettingUpMatchView() {
  const [roundsCount, setRoundsCount] = useState(0)
  const [firstPlayer, setFirstPlayer] = useState<Player['id']>('')
  const { abortMatch, activeGameMatches, activeGamePlayers, createMatch } = useGame()
  const maxCardsPerPlayer = Math.floor(CARDS_COUNT / activeGamePlayers.length)
  const minCardsPerPlayer = 1
  const isValid = !firstPlayer || roundsCount < minCardsPerPlayer || roundsCount > maxCardsPerPlayer

  function handleChangeFirstPlayer(event: ChangeEvent<HTMLInputElement>) {
    setFirstPlayer(event.target.value)
  }

  function handleStartBets() {
    createMatch({ firstPlayer, roundsCount })
  }

  useEffect(() => {
    setFirstPlayer(() => {
      const latestMatch = activeGameMatches.length
        ? activeGameMatches.reduce((latest, match) => (latest.createdAt > match.createdAt ? latest : match))
        : undefined
      const lastFirstPlayerIndex = activeGamePlayers.findIndex(({ id }) => id === latestMatch?.firstPlayer)
      const playersCount = activeGamePlayers.length
      const wasLastInTheList = lastFirstPlayerIndex === playersCount - 1

      return wasLastInTheList
        ? activeGamePlayers[0].id
        : activeGamePlayers[lastFirstPlayerIndex + 1].id
    })
  }, [activeGameMatches, activeGamePlayers])

  return (
    <Section
      fullWidth
      maxWidth="sm"
      title="Configurar a próxima partida"
    >
      <Stack gap={4}>
        <TextField
          label="Primeiro jogador"
          select
          value={firstPlayer}
          onChange={handleChangeFirstPlayer}
        >
          {activeGamePlayers.map(({ id, name }) => (
            <MenuItem key={id} value={id}>{name}</MenuItem>
          ))}
        </TextField>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <InputLabel htmlFor="roundsCount">
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


        <Box
          sx={{
            display: 'flex',
            flexDirection: ['column', 'row-reverse'],
            alignItems: 'center',
            justifyContent: 'space-evenly',
            gap: 2,
            width: 1,
          }}
        >
          <Button
            color="secondary"
            disabled={!isValid}
            size="large"
            endIcon={<NextIcon />}
            onClick={handleStartBets}
          >
            Iniciar Apostas
          </Button>
          <Button
            size="large"
            startIcon={<CancelIcon />}
            variant="text"
            onClick={abortMatch}
          >
            Cancelar
          </Button>
        </Box>
      </Stack>
    </Section>
  )
}

export default SettingUpMatchView
