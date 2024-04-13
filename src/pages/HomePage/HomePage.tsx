import AddIcon from '@mui/icons-material/Add'
import EnterIcon from '@mui/icons-material/Login'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Section from '~/components/Section'

function HomePage() {
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
            placeholder="Difite o código de acesso"
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

export default HomePage
