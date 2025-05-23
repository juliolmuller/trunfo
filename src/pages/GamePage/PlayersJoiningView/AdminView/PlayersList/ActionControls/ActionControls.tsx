import {
  Add as AddIcon,
  TaskAlt as DoneIcon,
  PersonAdd as PersonAddIcon,
  PlayArrow as PlayIcon,
} from '@mui/icons-material';
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
} from '@mui/material';
import { type ChangeEvent, type FormEvent, type ReactNode, useState } from 'react';

import { useAuth, useGame } from '~/helpers';

export function ActionControls(): ReactNode {
  const { user } = useAuth();
  const theme = useTheme();
  const isDisplaySm = useMediaQuery(theme.breakpoints.down('sm'));
  const { activeGamePlayers, addCurrentUser, addOfflinePlayer, startGame } = useGame();
  const [isAddingPlayer, setAddingPlayer] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const isGameOwnerParticipating = activeGamePlayers.some((player) => {
    return player.userId && player.userId === user?.id;
  });

  function handleBlur(): void {
    setAddingPlayer(false);
    setNewUserName('');
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setNewUserName(event.target.value);
  }

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();
    setSubmitting(true);
    await addOfflinePlayer(newUserName);
    setSubmitting(false);
    handleBlur();
  }

  async function handleSelfJoin(): Promise<void> {
    setSubmitting(true);
    await addCurrentUser();
    setSubmitting(false);
    handleBlur();
  }

  function handlePlay(): void {
    startGame();
  }

  return (
    <Box sx={{ mt: 'auto', pt: 2 }}>
      <Divider sx={{ mb: 3 }} />

      {isAddingPlayer ? (
        <ClickAwayListener onClickAway={handleBlur}>
          <Stack component="form" onSubmit={handleSubmit} sx={{ gap: 2 }}>
            <TextField
              autoFocus
              disabled={isSubmitting}
              fullWidth
              label="Nome do Jogador"
              slotProps={{
                input: {
                  endAdornment:
                    newUserName.length === 0 ? undefined : (
                      <InputAdornment position="end">
                        <IconButton color="secondary" type="submit">
                          <DoneIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                },
              }}
              required
              size="small"
              value={newUserName}
              onChange={handleChange}
            />

            {!isGameOwnerParticipating && (
              <>
                <Typography sx={{ textAlign: 'center' }} variant="caption">
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
            sx={(theme) => ({
              [theme.breakpoints.down('sm')]: {
                width: '100%',
              },
            })}
            fullWidth
            startIcon={<AddIcon />}
            onClick={() => setAddingPlayer(true)}
          >
            Adicionar {isDisplaySm ? null : 'novo '}jogador
          </Button>

          {isDisplaySm ? (
            <Button
              sx={(theme) => ({
                [theme.breakpoints.down('sm')]: {
                  width: '100%',
                },
              })}
              color="secondary"
              startIcon={<PlayIcon />}
              onClick={handlePlay}
            >
              Iniciar jogo
            </Button>
          ) : (
            <Tooltip placement="right" title="Iniciar jogo">
              <IconButton
                sx={{
                  bgcolor: 'secondary.main',
                }}
                size="large"
                onClick={handlePlay}
              >
                <PlayIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      )}
    </Box>
  );
}
