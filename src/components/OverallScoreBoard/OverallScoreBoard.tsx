import {
  AddPhotoAlternate as AddPhotoAlternateIcon,
  AutoFixHigh as AutoFixHighIcon,
  DeleteForever as DeleteForeverIcon,
  Edit as EditIcon,
} from '@mui/icons-material'
import {
  Box,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material'
import { ChangeEvent, MouseEvent, createRef, useMemo, useState } from 'react'

import { PromptModal } from '~/components'
import { fileToBase64, useAuth, useGame } from '~/helpers'
import { Player } from '~/models'

import { AnimatedList } from './AnimatedList'
import { PlayerScore } from './PlayerScore'

export interface OverallScoreBoardProps {
  players: Player[]
}

interface DialogState {
  value: string
  onSave: (newValue: string) => void
}

export function OverallScoreBoard({ players }: OverallScoreBoardProps) {
  const { user } = useAuth()
  const { removePlayer, updatePlayer } = useGame()
  const userPlayer = useMemo(() => {
    return user && players.find((player) => player.userId === user?.id)
  }, [players, user])
  const orderedPlayers = useMemo(() => {
    // TODO: find a way to order players by score
    return [...players]
  }, [players])
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLButtonElement>()
  const [dialogState, setDialogState] = useState<DialogState>()

  function handleOpenMenu(event: MouseEvent<HTMLButtonElement>) {
    setMenuAnchorEl(event.currentTarget)
  }

  function handleCloseMenu() {
    setMenuAnchorEl(undefined)
  }

  function handleCloseDialog() {
    setDialogState(undefined)
  }

  function handleRenamePlayer() {
    handleCloseMenu()

    if (!userPlayer) {
      return
    }

    setDialogState({
      value: userPlayer.name,
      onSave(name) {
        updatePlayer(userPlayer.id, { name })
      },
    })
  }

  async function handleUploadAvatar(event: ChangeEvent<HTMLInputElement>) {
    handleCloseMenu()

    const selectedFile = event.target.files?.[0]

    if (!userPlayer || !selectedFile) {
      return
    }

    const avatar = await fileToBase64(selectedFile)

    await updatePlayer(userPlayer.id, { avatar })
  }

  function handleDeletePlayer() {
    handleCloseMenu()

    if (!userPlayer) {
      return
    }

    if (window.confirm('Tem certeza que deseja se retirar do jogo?')) {
      removePlayer(userPlayer.id)
    }
  }

  return (
    <Stack gap={3}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
        Placar Geral
      </Typography>

      <AnimatedList>
        {orderedPlayers.map((player) => (
          <PlayerScore key={player.id} ref={createRef()} {...player} />
        ))}
      </AnimatedList>

      {!!userPlayer && (
        <>
          <Divider />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              id="player-options"
              startIcon={<AutoFixHighIcon />}
              onClick={handleOpenMenu}
              aria-controls={menuAnchorEl && `${menuAnchorEl.id}-menu`}
              aria-expanded={menuAnchorEl && true}
              aria-haspopup={true}
            >
              Configurar
            </Button>
          </Box>
        </>
      )}

      <Menu
        anchorEl={menuAnchorEl}
        id={`${menuAnchorEl?.id}-menu`}
        open={!!menuAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleCloseMenu}
        aria-labelledby={menuAnchorEl?.id}
      >
        <MenuItem onClick={handleRenamePlayer}>
          <Stack direction="row">
            <ListItemIcon>
              <EditIcon fontSize="inherit" />
            </ListItemIcon>

            <ListItemText>Renomear Jogador</ListItemText>
          </Stack>
        </MenuItem>

        <MenuItem>
          <Stack component="label" direction="row" htmlFor="avatar-upload">
            <ListItemIcon>
              <AddPhotoAlternateIcon fontSize="inherit" />
            </ListItemIcon>

            <ListItemText>Trocar Avatar</ListItemText>

            <Box
              component="input"
              accept="image/*"
              id="avatar-upload"
              type="file"
              onChange={handleUploadAvatar}
              sx={{
                // technique to hide content visually but leave it available for screen readers
                position: 'absolute',
                left: -10000,
                top: 'auto',
                width: 1,
                height: 1,
                overflow: 'hidden',
              }}
            />
          </Stack>
        </MenuItem>

        <MenuItem onClick={handleDeletePlayer}>
          <Stack direction="row">
            <ListItemIcon>
              <DeleteForeverIcon fontSize="inherit" />
            </ListItemIcon>

            <ListItemText>Remover Jogador</ListItemText>
          </Stack>
        </MenuItem>
      </Menu>

      <PromptModal
        open={!!dialogState}
        label="Nome do Jogador"
        title="Renomear Jogador"
        onClose={handleCloseDialog}
        onSave={() => {}}
        {...dialogState}
      />
    </Stack>
  )
}
