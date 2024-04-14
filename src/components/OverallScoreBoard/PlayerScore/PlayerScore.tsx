import { Avatar, Box, Chip, ListItem, ListItemAvatar, Typography } from '@mui/material'
import { forwardRef } from 'react'

import { Player } from '~/models'

export type PlayerScoreProps = Player

export const PlayerScore = forwardRef<HTMLLIElement, PlayerScoreProps>((player, ref) => {
  // TODO: reduce player.scoreLogs to obtain actual score
  const score = 0

  function getColor(score: number) {
    if (score > 0) return 'success'
    if (score < 0) return 'error'
    return 'info'
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
