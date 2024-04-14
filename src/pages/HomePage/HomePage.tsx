import { Add as AddIcon, Login as EnterIcon } from '@mui/icons-material'
import { Button, Collapse, Stack, TextField } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Section } from '~/components'

export function HomePage() {
  const GAME_KEY_LENGTH = 6
  const navigate = useNavigate()
  const [inputVisible, setInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState('')

  function handleChangeInputValue(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value
    const transformedValue = newValue.trim().toUpperCase()
    transformedValue.length <= GAME_KEY_LENGTH && setInputValue(transformedValue)
  }

  function handleSearchGame() {
    // TODO: use firebase search method and navigate
    console.info(`Searching game ${inputValue}...`)
  }

  return (
    <Section fullWidth maxWidth="sm">
      <Stack gap={3}>
        <Collapse in={inputVisible} unmountOnExit>
          <TextField
            autoFocus
            fullWidth
            hiddenLabel
            placeholder="Difite a Chave de acesso"
            size="medium"
            value={inputValue}
            variant="outlined"
            onChange={handleChangeInputValue}
            inputProps={{
              sx: {
                textAlign: 'center',
              },
            }}
          />
        </Collapse>

        <Button
          color="secondary"
          disabled={inputVisible && inputValue.length < GAME_KEY_LENGTH}
          fullWidth
          startIcon={<EnterIcon />}
          onClick={inputVisible ? handleSearchGame : () => setInputVisible(true)}
          sx={{ color: 'white' }}
        >
          {inputVisible ? 'Entrar' : 'Acessar um jogo'}
        </Button>

        <Button
          fullWidth
          startIcon={<AddIcon />}
          onClick={() => navigate('/new')}
          sx={{ color: 'white' }}
        >
          Criar um novo jogo
        </Button>
      </Stack>
    </Section>
  )
}
