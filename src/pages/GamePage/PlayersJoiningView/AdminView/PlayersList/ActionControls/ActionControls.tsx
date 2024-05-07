import {
  Add as AddIcon,
  PersonAdd as PersonAddIcon,
  PlayArrow as PlayIcon,
  TaskAlt as DoneIcon,
} from '@mui/icons-material'
import {
  Box,
  Button,
  ClickAwayListener,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { ChangeEvent, FormEvent, useState } from 'react'

import { useAuth, useGame } from '~/helpers'

export function ActionControls() {
  const { user } = useAuth()
  const theme = useTheme()
  const isDisplaySm = useMediaQuery(theme.breakpoints.down('sm'))
  const { activeGamePlayers, addCurrentUser, addOfflinePlayer, startGame } = useGame()
  const [isAddingPlayer, setAddingPlayer] = useState(false)
  const [isSubmitting, setSubmitting] = useState(false)
  const [newUserName, setNewUserName] = useState('')
  const isGameOwnerParticipating = activeGamePlayers.some((player) => {
    return player.userId && player.userId === user?.id
  })

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

  async function handleSelfJoin() {
    setSubmitting(true)
    await addCurrentUser()
    setSubmitting(false)
    handleBlur()
  }

  function handlePlay() {
    startGame()
  }

  return (
    <Box sx={{ mt: 'auto', pt: 2 }}>
      <Divider sx={{ mb: 3 }} />

      {isAddingPlayer ? (
        <ClickAwayListener onClickAway={handleBlur}>
          <Stack component="form" gap={2} onSubmit={handleSubmit}>
            <TextField
              autoFocus
              disabled={isSubmitting}
              fullWidth
              label="Nome do Jogador"
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
              onChange={handleChange}
            />

            {!isGameOwnerParticipating && (
              <>
                <Typography variant="caption" sx={{ textAlign: 'center' }}>
                  ou
                </Typography>

                <Button
                  fullWidth
                  startIcon={<PersonAddIcon />}
                  variant="text"
                  onClick={handleSelfJoin}
                >
                  Adicionar-se{isDisplaySm ? null : ' como Jogador'}
                </Button>
              </>
            )}
          </Stack>
        </ClickAwayListener>
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
