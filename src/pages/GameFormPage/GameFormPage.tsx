import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Section } from '~/components'
import { useGame, useLocalStorage } from '~/helpers'
import { ScoringMode } from '~/models'

export function GameFormPage() {
  const navigate = useNavigate()
  const { createGame } = useGame()
  const [name, setName] = useState('')
  const [scoringMode, setScoringMode] = useLocalStorage('scoringMode', ScoringMode.STANDARD)
  const [scoreOnZeroBets, setScoreOnZeroBets] = useLocalStorage('scoreOnZeroBets', false)
  const [betsUnequalRounds, setBetsUnequalRounds] = useLocalStorage('betsUnequalRounds', false)
  const [betsEqualRounds, setBetsEqualRounds] = useLocalStorage('betsEqualRounds', false)
  const [isSubmitting, setSubmitting] = useState(false)

  function handleCancel() {
    navigate('/', { replace: true })
  }

  async function handleSubmit(event: FormEvent) {
    try {
      event.preventDefault()
      setSubmitting(true)
      await createGame({
        name,
        scoringMode,
        scoreOnZeroBets,
        betsUnequalRounds,
        betsEqualRounds,
      })
    } catch {
      setSubmitting(false)
    }
  }

  return (
    <Section fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Stack gap={3}>
          <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
            Novo Jogo
          </Typography>

          <TextField
            autoFocus
            label="Nome do jogo (opcional)"
            size="small"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <FormControl>
            <FormLabel id="scoring-mode-label">Modo de Pontuação</FormLabel>
            <RadioGroup
              name="scoringMode"
              value={scoringMode}
              onChange={(event) => setScoringMode(event.target.value as ScoringMode)}
              aria-labelledby="scoring-mode-label"
            >
              <FormControlLabel
                control={<Radio />}
                label="Multiplicação pelo número de apostas"
                value={ScoringMode.STANDARD}
              />
              <FormControlLabel
                control={<Radio />}
                label="Simplificada (+10 para acertos e -10 para erros)"
                value={ScoringMode.SIMPLIFIED}
              />
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormControlLabel
              checked={scoreOnZeroBets}
              control={<Switch />}
              label="Pontuar em acertos com zero apostas (+5 pontos)"
              onChange={(event) => setScoreOnZeroBets((event.target as any).checked)}
            />
          </FormControl>

          <FormControl>
            <FormControlLabel
              checked={betsUnequalRounds}
              control={<Switch />}
              disabled={betsEqualRounds}
              label="Quantidade total de apostas sempre diferente do número de rodadas"
              onChange={(event) => setBetsUnequalRounds((event.target as any).checked)}
            />
          </FormControl>

          <FormControl>
            <FormControlLabel
              checked={betsEqualRounds}
              control={<Switch />}
              disabled={betsUnequalRounds}
              label="Quantidade total de apostas sempre igual ao número de rodadas"
              onChange={(event) => setBetsEqualRounds((event.target as any).checked)}
            />
          </FormControl>

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
              type="submit"
              sx={(theme) => ({
                [theme.breakpoints.down('sm')]: {
                  width: '100%',
                },
              })}
            >
              Próximo
            </Button>

            <Button
              disabled={isSubmitting}
              variant="text"
              onClick={handleCancel}
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
      </form>
    </Section>
  )
}
