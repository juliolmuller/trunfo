import { Avatar, Chip, Grid, ListItem, ListItemAvatar, Typography } from '@mui/material';
import { type ReactNode } from 'react';

import { Counter } from '~/components';
import { type MatchLog, type Player } from '~/models';

export interface ChangeEvent {
  log: MatchLog;
  player: Player;
}

export interface PlayerLogsProps {
  log: MatchLog;
  maxBetsAndHits?: number;
  onChange: (event: ChangeEvent) => void;
  player: Player;
  status: 'betting' | 'observing' | 'scoring';
}

export function PlayerLogs({
  log,
  maxBetsAndHits,
  player,
  status,
  onChange,
}: PlayerLogsProps): ReactNode {
  function handleChange(value: number): void {
    switch (status) {
      case 'betting':
        onChange({
          log: { ...log, betsCount: value },
          player,
        });
        break;

      case 'scoring':
        onChange({
          log: { ...log, hitsCount: value },
          player,
        });
        break;

      default:
      // do nothing
    }
  }

  return (
    <ListItem
      key={player.id}
      sx={(theme) => ({
        position: 'relative',
        transition: theme.transitions.create(['background-color', 'border-color']),
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        borderRadius: 1,
        border: 'transparent solid 1px',
        px: 0.5,
        '&:hover': {
          borderColor: 'rgba(255, 155, 155, 0.7)',
          bgcolor: 'rgba(255, 155, 155, 0.4)',
          ...theme.applyStyles('dark', {
            borderColor: 'rgba(222, 222, 222, 0.5)',
            bgcolor: 'rgba(222, 222, 222, 0.2)',
          }),
        },
        '&:focus-within': {
          borderColor: 'rgba(255, 155, 155, 0.7)',
          bgcolor: 'rgba(255, 155, 155, 0.5)',
          ...theme.applyStyles('dark', {
            borderColor: 'rgba(222, 222, 222, 0.5)',
            bgcolor: 'rgba(222, 222, 222, 0.3)',
          }),
        },
      })}
    >
      <ListItemAvatar sx={{ minWidth: 48, display: ['none', 'block'] }}>
        <Avatar src={player.avatar} alt={`Avatar for ${player.name}`} />
      </ListItemAvatar>

      <Grid
        container
        sx={{
          alignItems: 'center',
          gap: [0.5, 1, 2],
        }}
      >
        <Grid size={false}>
          <Typography>{player.name}</Typography>
        </Grid>

        <Grid
          size="grow"
          sx={{
            height: 12,
            borderBottom: '1px dotted #999',
          }}
        />

        <Grid size={false}>
          {status === 'observing' ? (
            <Chip
              color="info"
              label={log.betsCount}
              sx={{ color: 'common.white', fontSize: '1rem' }}
            />
          ) : (
            <Counter max={maxBetsAndHits} value={log.betsCount} onChange={handleChange} />
          )}
        </Grid>
      </Grid>
    </ListItem>
  );
}
