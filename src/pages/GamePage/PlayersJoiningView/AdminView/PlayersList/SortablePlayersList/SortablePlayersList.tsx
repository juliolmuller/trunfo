import DeleteIcon from '@mui/icons-material/Clear'
import DraggableIcon from '@mui/icons-material/DragIndicator'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Tooltip from '@mui/material/Tooltip'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'

import { useGame } from '~/helpers'
import { Player } from '~/models'

export interface SortablePlayersListProps {
  players: Player[]
}

function SortablePlayersList({ players }: SortablePlayersListProps) {
  const { removePlayer, reorderPlayers } = useGame()

  function handleDragEnd({ destination, source }: DropResult) {
    if (!destination) {
      return
    }

    const playersIds = players.map(({ id }) => id)
    const [pickedPlayerId] = playersIds.splice(source.index, 1)
    playersIds.splice(destination.index, 0, pickedPlayerId)
    reorderPlayers(playersIds)
  }

  function handleDeletePlayer(player: Player) {
    if (window.confirm(`Tem certeza que deseja remover o(a) jogador(a) "${player.name}"?`)) {
      removePlayer(player.id)
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="players">
        {(droppableProvider) => (
          <List
            ref={droppableProvider.innerRef}
            dense
            sx={{ flex: 1, overflowY: 'auto' }}
            {...droppableProvider.droppableProps}
          >
            {players.map((player, index) => (
              <Draggable key={player.id} draggableId={`${player.id}`} index={index}>
                {(draggableProvider, snapshot) => (
                  <ListItem
                    ref={draggableProvider.innerRef}
                    secondaryAction={
                      <Tooltip placement="right" title="Remover jogador">
                        <IconButton color="error" onClick={() => handleDeletePlayer(player)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
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
                      <DraggableIcon />
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
    </DragDropContext>
  )
}

export default SortablePlayersList
