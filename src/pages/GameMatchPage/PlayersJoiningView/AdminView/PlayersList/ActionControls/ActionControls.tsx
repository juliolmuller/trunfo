import AddIcon from '@mui/icons-material/Add'
import PlayIcon from '@mui/icons-material/PlayCircle'
import DoneIcon from '@mui/icons-material/TaskAlt'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import { ChangeEvent, FormEvent, useState } from 'react'

import Button from '~/components/Button'
import { useGame } from '~/hooks'
import { GameStatus } from '~/models'

function ActionControls() {
  const { addOfflinePlayer, updateGame } = useGame()
  const [isAddingPlayer, setAddingPlayer] = useState(false)
  const [isSubmitting, setSubmitting] = useState(false)
  const [newUserName, setNewUserName] = useState('')

  function handleBlur() {
    setAddingPlayer(false)
    setNewUserName('')
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setNewUserName(event.target.value)
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    await addOfflinePlayer(newUserName)
    setSubmitting(false)
    handleBlur()
  }

  function handlePlay() {
    updateGame({ status: GameStatus.SETTING_UP_TURN })
  }

  return (
    <Box sx={{ mt: 'auto', pt: 2 }}>
      {isAddingPlayer ? (
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            autoFocus
            color="error"
            disabled={isSubmitting}
            fullWidth
            label="Nome do jogador"
            InputProps={{
              endAdornment: newUserName.length === 0 ? undefined : (
                <InputAdornment position="end">
                  <IconButton color="success" type="submit">
                    <DoneIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            required
            size="small"
            value={newUserName}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </Box>
      ) : (
        <Stack direction="row" gap={5}>
          <Button
            fullWidth
            size="large"
            startIcon={<AddIcon />}
            onClick={() => setAddingPlayer(true)}
          >
            Adicionar novo jogador
          </Button>
          <Tooltip arrow placement="right" title="Iniciar jogo">
            <PlayIcon
              sx={(theme) => {
                function getTransform(scale: number) {
                  return `scale(${scale}) translate(-8px, 4px)`
                }

                return {
                  fill: theme.palette.success.main,
                  cursor: 'pointer',
                  transition: 'transform 50ms',
                  transform: getTransform(2.2),
                  '&:hover': { transform: getTransform(2.3) },
                  '&:active': { transform: getTransform(2.2) },
                }
              }}
              onClick={handlePlay}
            />
          </Tooltip>
        </Stack>
      )}
    </Box>
  )
}

export default ActionControls