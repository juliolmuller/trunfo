import { Add as AddIcon, Login as EnterIcon } from '@mui/icons-material'
import { Button, Collapse, Stack, TextField } from '@mui/material'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Section } from '~/components'
import { useGame } from '~/helpers'

export function HomePage() {
  const GAME_KEY_LENGTH = 6
  const navigate = useNavigate()
  const { findGameByKey } = useGame()
  const [inputVisible, setInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState('')

  function handleChangeInputValue(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value
    const transformedValue = newValue.trim().toUpperCase()

    if (transformedValue.length <= GAME_KEY_LENGTH) {
      setInputValue(transformedValue)
    }
  }

  async function handleSearchGame(event: FormEvent) {
    event.preventDefault()

    await findGameByKey(inputValue)
  }

  return (
    <Section fullWidth maxWidth="sm">
      <Stack gap={3}>
        <Collapse in={inputVisible} unmountOnExit>
          <form id="access-game" noValidate onSubmit={handleSearchGame}>
            <TextField
              autoFocus
              fullWidth
              hiddenLabel
              placeholder="Difite a Chave de acesso"
              size="medium"
              value={inputValue}
              onChange={handleChangeInputValue}
              inputProps={{
                sx: {
                  textAlign: 'center',
                },
              }}
            />
          </form>
        </Collapse>

        <Button
          color="secondary"
          disabled={inputVisible && inputValue.length < GAME_KEY_LENGTH}
          form="access-game"
          fullWidth
          startIcon={<EnterIcon />}
          type={inputVisible ? 'submit' : undefined}
          onClick={inputVisible ? undefined : () => setInputVisible(true)}
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
