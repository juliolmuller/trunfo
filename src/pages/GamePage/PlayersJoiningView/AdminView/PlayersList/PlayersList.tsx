import { Box, Divider, Stack, Typography } from '@mui/material';
import { type ReactNode } from 'react';

import { InProgressSpinner } from '~/components';
import { type Player } from '~/models';

import { ActionControls } from './ActionControls';
import { SortablePlayersList } from './SortablePlayersList';

export interface PlayersListProps {
  players: Player[];
}

export function PlayersList({ players }: PlayersListProps): ReactNode {
  return (
    <Stack sx={{ height: 1 }}>
      <InProgressSpinner>Aguardando jogadores...</InProgressSpinner>

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
  );
}
