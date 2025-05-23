import { Avatar, Box, Chip, ListItem, ListItemAvatar, Typography } from '@mui/material';
import { forwardRef } from 'react';

import { type Player } from '~/models';

export type PlayerScoreProps = Player;

export const PlayerScore = forwardRef<HTMLLIElement, PlayerScoreProps>(
  function PlayerScore(player, ref) {
    // TODO: reduce player.scoreLogs to obtain actual score
    const score = 0;

    function getColor(score: number): 'error' | 'info' | 'success' {
      if (score > 0) return 'success';
      if (score < 0) return 'error';
      return 'info';
    }

    return (
      <ListItem
        key={player.id}
        ref={ref}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 0.5,
        }}
      >
        <ListItemAvatar sx={{ minWidth: 48 }}>
          <Avatar src={player.avatar} />
        </ListItemAvatar>

        <Typography>{player.name}</Typography>

        <Box
          sx={{
            flexGrow: 1,
            height: 12,
            borderBottom: '1px dotted #999',
          }}
        />

        <Chip
          sx={{ color: 'common.white', fontSize: '1rem' }}
          color={getColor(score)}
          label={score > 0 ? `+${score}` : score}
        />
      </ListItem>
    );
  },
);
