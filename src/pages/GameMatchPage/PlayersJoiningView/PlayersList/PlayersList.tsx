import DeleteIcon from '@mui/icons-material/Clear'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import Loading from '~/components/Loading'
import { useAuth, useGame } from '~/hooks'
import { Game, Player } from '~/models'

import AddNewPlayerControl from './AddNewPlayerControl'

export interface PlayersListProps {
  game: Game
}

function PlayersList({
  game: { createdBy, players },
}: PlayersListProps) {
  const { user } = useAuth()
  const { removePlayer } = useGame()

  function handleDeletePlayer(player: Player) {
    if (window.confirm(`Tem certeza que deseja remover o(a) jogador(a) "${player.name}"?`)) {
      removePlayer(player.id)
    }
  }

  return (
    <Box sx={{ height: '100%' }}>
      {user?.id === createdBy && (
        <AddNewPlayerControl />
      )}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          m: 2,
        }}
      >
        <Loading margin="none" size={40} />
        <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
          Aguardando jogadores...
        </Typography>
      </Box>

      {players.length > 0 && (
        <Stack>
          <Divider>
            <Typography component="h6" variant='caption' sx={{ textTransform: 'uppercase' }}>
              Jogadores cadastrados
            </Typography>
          </Divider>

          <List dense sx={{ flex: 1, overflowY: 'auto' }}>
            {players.map((player) => (
              <ListItem
                key={player.id}
                secondaryAction={
                  <Tooltip arrow placement="right" title="Remover jogador">
                    <IconButton color="error" onClick={() => handleDeletePlayer(player)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                }
                sx={{
                  '& .MuiListItemSecondaryAction-root': {
                    transition: 'opacity 150ms',
                    opacity: 0,
                  },
                  '&:hover .MuiListItemSecondaryAction-root': {
                    opacity: 1,
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar src={player.avatar} />
                </ListItemAvatar>
                <ListItemText>{player.name}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Stack>
      )}
    </Box>
  )
}

export default PlayersList
