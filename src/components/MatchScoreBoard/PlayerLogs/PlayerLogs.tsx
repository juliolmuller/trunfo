import {
  Avatar,
  Chip,
  Grid,
  ListItem,
  ListItemAvatar,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material'

import Counter from '~/components/Counter'
import { useGame } from '~/helpers'
import { MatchLog, Player } from '~/models'

export type ChangeEvent = {
  log: MatchLog
  player: Player
}

export type PlayerLogsProps = {
  log: MatchLog
  player: Player
  status: 'betting' | 'observing' | 'scoring'
  onChange: (event: ChangeEvent) => void
}

function PlayerLogs({
  log,
  player,
  status,
  onChange,
}: PlayerLogsProps) {
  const isGreaterThanSm = useMediaQuery<Theme>((theme) => theme.breakpoints.up('sm'))
  const { calculateMatchScore } = useGame()
  const score = calculateMatchScore(log.betsCount, log.hitsCount)

  /* eslint-disable curly, no-shadow, nonblock-statement-body-position */
  function getColor(score: number) {
    if (score > 0)
      return 'success'
    if (score < 0)
      return 'error'
    return 'info'
    /* eslint-enable curly, no-shadow, nonblock-statement-body-position */
  }

  return (
    <ListItem
      key={player.id}
      sx={{
        position: 'relative',
        transition: (theme) => theme.transitions.create(['background-color', 'border-color']),
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        borderRadius: 1,
        border: 'transparent solid 1px',
        '&:hover': {
          borderColor: 'rgba(222, 222, 222, 0.7)',
          bgcolor: 'rgba(222, 222, 222, 0.4)',
        },
        '&:focus-within': {
          borderColor: 'rgba(222, 222, 222, 0.7)',
          bgcolor: 'rgba(222, 222, 222, 0.6)',
        },
      }}
    >
      <ListItemAvatar>
        <Avatar src={player.avatar} alt={`Avatar for ${player.name}`} />
      </ListItemAvatar>

      <Grid
        container
        sx={{
          alignItems: 'center',
          gap: 2,
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

        {(status !== 'scoring' || isGreaterThanSm) && (
          <Grid
            item
            xs={2}
            sm={1.5}
            md={1}
            container
            justifyContent="center"
          >
            <Chip
              color="info"
              label={log.betsCount}
              sx={{ color: 'common.white', fontSize: '1rem' }}
            />
          </Grid>
        )}

        {isGreaterThanSm && (
          <Grid
            item
            xs={2}
            sm={1.5}
            md={1}
            sx={{
              height: 12,
              borderBottom: '1px dotted #999',
            }}
          />
        )}

        {(status !== 'betting' || isGreaterThanSm) && (
          <>
            <Grid
              item
              xs={2}
              container
              justifyContent="center"
            >
              <Chip
                color="info"
                label={log.hitsCount}
                sx={{
                  mr: status !== 'betting' ? 2 : 0,
                  color: 'common.white',
                  fontSize: '1rem',
                }}
              />
            </Grid>

            {status === 'scoring' && (
              <Chip
                color={getColor(score)}
                label={score > 0 ? `+${score}` : score}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: (theme) => `calc(100% - ${theme.spacing(2)})`,
                  transform: 'translateY(-50%)',
                  color: 'common.white',
                  fontSize: '1rem',
                }}
              />
            )}
          </>
        )}
      </Grid>
    </ListItem>
  )
}

export default PlayerLogs
