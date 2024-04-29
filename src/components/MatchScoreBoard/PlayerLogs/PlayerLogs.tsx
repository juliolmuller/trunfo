import { Avatar, Chip, Grid, ListItem, ListItemAvatar, Typography } from '@mui/material'

import { Counter } from '~/components'
import { MatchLog, Player } from '~/models'

export type ChangeEvent = {
  log: MatchLog
  player: Player
}

export type PlayerLogsProps = {
  log: MatchLog
  maxBetsAndHits?: number
  player: Player
  status: 'betting' | 'observing' | 'scoring'
  onChange: (event: ChangeEvent) => void
}

export function PlayerLogs({ log, maxBetsAndHits, player, status, onChange }: PlayerLogsProps) {
  function handleChange(value: number) {
    switch (status) {
      case 'betting':
        onChange({
          log: { ...log, betsCount: value },
          player,
        })
        break

      case 'scoring':
        onChange({
          log: { ...log, hitsCount: value },
          player,
        })
        break

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
          borderColor:
            theme.palette.mode === 'dark' ? 'rgba(222, 222, 222, 0.5)' : 'rgba(255, 155, 155, 0.7)',
          bgcolor:
            theme.palette.mode === 'dark' ? 'rgba(222, 222, 222, 0.2)' : 'rgba(255, 155, 155, 0.4)',
        },
        '&:focus-within': {
          borderColor:
            theme.palette.mode === 'dark' ? 'rgba(222, 222, 222, 0.5)' : 'rgba(255, 155, 155, 0.7)',
          bgcolor:
            theme.palette.mode === 'dark' ? 'rgba(222, 222, 222, 0.3)' : 'rgba(255, 155, 155, 0.5)',
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
        <Grid item xs={false}>
          <Typography>{player.name}</Typography>
        </Grid>

        <Grid
          item
          xs
          sx={{
            height: 12,
            borderBottom: '1px dotted #999',
          }}
        />

        <Grid item xs={false}>
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
  )
}
