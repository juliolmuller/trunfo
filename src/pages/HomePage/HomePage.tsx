import AddIcon from '@mui/icons-material/Add'
import EnterIcon from '@mui/icons-material/Login'
import Collapse from '@mui/material/Collapse'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '~/components/Button'
import Paper from '~/components/Paper'

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
    console.log(`Searching game ${inputValue}...`)
  }

  return (
    <Paper fullWidth maxWidth="sm">
      <Stack alignItems="center" gap={3}>
        <Collapse in={inputVisible} unmountOnExit>
          <TextField
            autoFocus
            hiddenLabel
            size="medium"
            value={inputValue}
            variant="filled"
            onChange={handleChangeInputValue}
          />
        </Collapse>

        <Button
          color="success"
          disabled={inputVisible && inputValue.length < GAME_KEY_LENGTH}
          fullWidth
          startIcon={<EnterIcon />}
          variant="contained"
          onClick={inputVisible
            ? handleSearchGame
            : () => setInputVisible(true)}
          sx={{ color: 'white' }}
        >
          {inputVisible
            ? 'Entrar'
            : 'Acessar um jogo existente'}
        </Button>

        <Button
          fullWidth
          startIcon={<AddIcon />}
          variant="contained"
          onClick={() => navigate('/new')}
          sx={{ color: 'white' }}
        >
          Criar um novo jogo
        </Button>
      </Stack>
    </Paper>
  )
}

export default HomePage
