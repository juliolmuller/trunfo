import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '~/components/Button'
import Paper from '~/components/Paper'
import { useLocalStorage } from '~/hooks'
import { ScoringMode } from '~/models'

function GameFormPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [scoringMode, setScoringMode] = useLocalStorage('scoringMode', ScoringMode.STANDARD)
  const [scoreOnZeroBets, setScoreOnZeroBets] = useLocalStorage('scoreOnZeroBets', false)
  const [betsUnequalRounds, setBetsUnequalRounds] = useLocalStorage('betsUnequalRounds', false)
  const [betsEqualRounds, setBetsEqualRounds] = useLocalStorage('betsEqualRounds', false)

  function handleCancel() {
    navigate('/', { replace: true })
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    // TODO: implement form submission
    console.log({
      name,
      scoringMode,
      scoreOnZeroBets,
      betsUnequalRounds,
      betsEqualRounds,
    })
  }

  return (
    <Paper fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Stack alignItems="center" gap={3}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Novo Jogo
          </Typography>

          <TextField
            autoFocus
            color="error"
            fullWidth
            label="Nome do jogo (opcional)"
            size="small"
            value={name}
            variant="outlined"
            onChange={(event) => setName(event.target.value)}
          />

          <FormControl fullWidth>
            <FormLabel id="scoring-mode-label">
              Modo de Pontuação
            </FormLabel>
            <RadioGroup
              color="error"
              name="scoringMode"
              value={scoringMode}
              onChange={(event) => setScoringMode(event.target.value as ScoringMode)}
              aria-labelledby="scoring-mode-label"
            >
              <FormControlLabel
                control={<Radio color="error" />}
                label="Multiplicação pelo número de apostas"
                value={ScoringMode.STANDARD}
              />
              <FormControlLabel
                control={<Radio color="error" />}
                label="Simplificada (+10 para acertos e -10 para erros)"
                value={ScoringMode.SIMPLIFIED}
              />
            </RadioGroup>
          </FormControl>

          <FormControl fullWidth>
            <FormControlLabel
              checked={scoreOnZeroBets}
              control={<Switch color="error" />}
              label="Pontuar em acertos com zero apostas"
              onChange={(event) => setScoreOnZeroBets((event.target as any).checked)}
            />
          </FormControl>

          <FormControl fullWidth>
            <FormControlLabel
              checked={betsUnequalRounds}
              control={<Switch color="error" />}
              disabled={betsEqualRounds}
              label="Quantidade total de apostas sempre diferente do número de rodadas"
              onChange={(event) => setBetsUnequalRounds((event.target as any).checked)}
            />
          </FormControl>

          <FormControl fullWidth>
            <FormControlLabel
              checked={betsEqualRounds}
              control={<Switch color="error" />}
              disabled={betsUnequalRounds}
              label="Quantidade total de apostas sempre igual ao número de rodadas"
              onChange={(event) => setBetsEqualRounds((event.target as any).checked)}
            />
          </FormControl>

          <Divider sx={{ width: '100%' }} />

          <Box
            sx={(theme) => ({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              gap: 2,
              width: '100%',
              [theme.breakpoints.up('sm')]: {
                flexDirection: 'row-reverse',
              },
            })}
          >
            <Button type="submit">Próximo</Button>
            <Button variant="text" onClick={handleCancel}>Cancelar</Button>
          </Box>
        </Stack>
      </form>
    </Paper>
  )
}

export default GameFormPage
