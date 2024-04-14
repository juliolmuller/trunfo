import { Box, Divider, Stack, Typography } from '@mui/material'

import { Loading } from '~/components'
import { Player } from '~/models'

import { ActionControls } from './ActionControls'
import { SortablePlayersList } from './SortablePlayersList'

export interface PlayersListProps {
  players: Player[]
}

export function PlayersList({ players }: PlayersListProps) {
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
