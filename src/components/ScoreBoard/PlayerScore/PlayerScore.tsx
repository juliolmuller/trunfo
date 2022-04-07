import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Typography from '@mui/material/Typography'
import { forwardRef } from 'react'

import { Player } from '~/models'

export type PlayerScoreProps = Player

const PlayerScore = forwardRef<HTMLLIElement, PlayerScoreProps>((player, ref) => {
  const score = player.score || 0

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
      ref={ref}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <ListItemAvatar>
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
        color={getColor(score)}
        label={score > 0 ? `+${score}` : score}
        sx={{ color: 'common.white', fontSize: '1rem' }}
      />
    </ListItem>
  )
})

export default PlayerScore
