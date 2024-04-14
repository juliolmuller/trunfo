import { Add as AddIcon, PlayArrow as PlayIcon, TaskAlt as DoneIcon } from '@mui/icons-material'
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { ChangeEvent, FormEvent, useState } from 'react'

import { useGame } from '~/helpers'

export function ActionControls() {
  const theme = useTheme()
  const isDisplaySm = useMediaQuery(theme.breakpoints.down('sm'))
  const { addOfflinePlayer, startGame: startMatch } = useGame()
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
    startMatch()
  }

  return (
    <Box sx={{ mt: 'auto', pt: 2 }}>
      {isAddingPlayer ? (
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            autoFocus
            disabled={isSubmitting}
            fullWidth
            label="Nome do jogador"
            InputProps={{
              endAdornment:
                newUserName.length === 0 ? undefined : (
                  <InputAdornment position="end">
                    <IconButton color="secondary" type="submit">
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
        <Box
          sx={(theme) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            gap: 2,
            width: 1,
            [theme.breakpoints.up('sm')]: {
              flexDirection: 'row',
            },
          })}
        >
          <Button
            fullWidth
            startIcon={<AddIcon />}
            onClick={() => setAddingPlayer(true)}
            sx={(theme) => ({
              [theme.breakpoints.down('sm')]: {
                width: '100%',
              },
            })}
          >
            Adicionar {isDisplaySm ? null : 'novo '}jogador
          </Button>

          {isDisplaySm ? (
            <Button
              color="secondary"
              startIcon={<PlayIcon />}
              onClick={handlePlay}
              sx={(theme) => ({
                [theme.breakpoints.down('sm')]: {
                  width: '100%',
                },
              })}
            >
              Iniciar jogo
            </Button>
          ) : (
            <Tooltip placement="right" title="Iniciar jogo">
              <IconButton
                size="large"
                onClick={handlePlay}
                sx={{
                  bgcolor: 'secondary.main',
                }}
              >
                <PlayIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      )}
    </Box>
  )
}
