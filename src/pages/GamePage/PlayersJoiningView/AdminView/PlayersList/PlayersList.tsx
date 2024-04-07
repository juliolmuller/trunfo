import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import Loading from '~/components/Loading'
import { Player } from '~/models'

import ActionControls from './ActionControls'
import SortablePlayersList from './SortablePlayersList'

export interface PlayersListProps {
  players: Player[]
}

function PlayersList({ players }: PlayersListProps) {
  return (
    <Stack sx={{ height: 1 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
        <Box>
          <Divider>
            <Typography component="h6" variant="caption" sx={{ textTransform: 'uppercase' }}>
              Jogadores cadastrados
            </Typography>
          </Divider>

          <SortablePlayersList players={players} />
        </Box>
      )}

      <ActionControls />
    </Stack>
  )
}

export default PlayersList
