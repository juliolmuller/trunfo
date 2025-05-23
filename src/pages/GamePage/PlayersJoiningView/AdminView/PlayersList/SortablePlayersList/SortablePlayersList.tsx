import {
  AddPhotoAlternate as AddPhotoAlternateIcon,
  DeleteForever as DeleteForeverIcon,
  DragIndicator as DragIndicatorIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
} from '@mui/material';
import { type ChangeEvent, type MouseEvent, type ReactNode, useState } from 'react';
import { DragDropContext, Draggable, type DropResult } from 'react-beautiful-dnd';

import { Droppable, PromptModal } from '~/components';
import { fileToBase64, useGame } from '~/helpers';
import { type Player } from '~/models';

export interface SortablePlayersListProps {
  players: Player[];
}

interface MenuState {
  anchorEl: HTMLButtonElement;
  player: Player;
}

interface DialogState {
  onSave: (newValue: string) => void;
  value: string;
}

export function SortablePlayersList({ players }: SortablePlayersListProps): ReactNode {
  const [menuState, setMenuState] = useState<MenuState>();
  const [dialogState, setDialogState] = useState<DialogState>();
  const { removePlayer, reorderPlayers, updatePlayer } = useGame();

  function handleDragEnd({ destination, source }: DropResult): void {
    if (!destination) {
      return;
    }

    const playersIds = players.map(({ id }) => id);
    const [pickedPlayerId] = playersIds.splice(source.index, 1);
    playersIds.splice(destination.index, 0, pickedPlayerId);
    reorderPlayers(playersIds);
  }

  function createHandleOpenMenu(player: Player) {
    return (event: MouseEvent<HTMLButtonElement>) => {
      setMenuState({
        anchorEl: event.currentTarget,
        player,
      });
    };
  }

  function handleCloseMenu(): void {
    setMenuState(undefined);
  }

  function handleCloseDialog(): void {
    setDialogState(undefined);
  }

  function handleRenamePlayer(): void {
    handleCloseMenu();

    if (!menuState?.player) {
      return;
    }

    setDialogState({
      value: menuState.player.name,
      onSave(name) {
        updatePlayer(menuState.player.id, { name });
      },
    });
  }

  async function handleUploadAvatar(event: ChangeEvent<HTMLInputElement>): Promise<void> {
    handleCloseMenu();

    const selectedFile = event.target.files?.[0];

    if (!menuState?.player || !selectedFile) {
      return;
    }

    const avatar = await fileToBase64(selectedFile);

    await updatePlayer(menuState.player.id, { avatar });
  }

  function handleDeletePlayer(): void {
    handleCloseMenu();

    if (!menuState?.player) {
      return;
    }

    if (
      window.confirm(`Tem certeza que deseja remover o(a) jogador(a) "${menuState.player.name}"?`)
    ) {
      removePlayer(menuState.player.id);
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="players">
        {(droppableProvider) => (
          <List
            ref={droppableProvider.innerRef}
            sx={{
              flex: 1,
              overflowY: 'auto',
            }}
            dense
            {...droppableProvider.droppableProps}
          >
            {players.map((player, index) => (
              <Draggable key={player.id} draggableId={player.id} index={index}>
                {(draggableProvider, snapshot) => (
                  <ListItem
                    ref={draggableProvider.innerRef}
                    secondaryAction={
                      <IconButton
                        id={`player-${player.id}-options`}
                        onClick={createHandleOpenMenu(player)}
                        aria-controls={menuState?.anchorEl && `${menuState.anchorEl.id}-menu`}
                        aria-expanded={menuState?.anchorEl && true}
                        aria-haspopup
                      >
                        <MoreVertIcon />
                      </IconButton>
                    }
                    sx={(theme) => ({
                      boxShadow: snapshot.isDragging ? 10 : 0,
                      borderRadius: 2,
                      bgcolor: theme.palette.background.paper,
                      pl: 0,
                      [theme.breakpoints.up('lg')]: {
                        '& .MuiListItemSecondaryAction-root': {
                          transition: 'opacity 150ms',
                          opacity: 0,
                        },
                        '&:hover .MuiListItemSecondaryAction-root': {
                          opacity: 1,
                        },
                      },
                    })}
                    {...draggableProvider.draggableProps}
                  >
                    <ListItemIcon
                      sx={{
                        transition: 'opacity 150ms',
                        opacity: 0.5,
                        minWidth: 32,
                        '&:hover': { opacity: 1 },
                      }}
                      {...draggableProvider.dragHandleProps}
                    >
                      <DragIndicatorIcon />
                    </ListItemIcon>

                    <ListItemAvatar>
                      <Avatar src={player.avatar} />
                    </ListItemAvatar>

                    <ListItemText>{player.name}</ListItemText>
                  </ListItem>
                )}
              </Draggable>
            ))}

            {droppableProvider.placeholder}
          </List>
        )}
      </Droppable>

      <Menu
        anchorEl={menuState?.anchorEl}
        id={`${menuState?.anchorEl.id}-menu`}
        open={!!menuState}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={handleCloseMenu}
        aria-labelledby={menuState?.anchorEl.id}
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
              sx={{
                // technique to hide content visually but leave it available for screen readers
                position: 'absolute',
                left: -10000,
                top: 'auto',
                width: 1,
                height: 1,
                overflow: 'hidden',
              }}
              component="input"
              accept="image/*"
              id="avatar-upload"
              type="file"
              onChange={handleUploadAvatar}
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
    </DragDropContext>
  );
}
