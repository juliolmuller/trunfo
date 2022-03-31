import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import { forwardRef } from 'react'

import { useTheme } from '~/hooks'
import { Player } from '~/models'

export type PlayerScoreProps = Player

const PlayerScore = forwardRef<HTMLLIElement, PlayerScoreProps>((player, ref) => {
  const theme = useTheme()

  function getColor(score: number) {
    /* eslint-disable curly, nonblock-statement-body-position */
    if (score > 0)
      return theme.palette.success.main
    if (score < 0)
      return theme.palette.error.main
    return theme.palette.info.main
    /* eslint-enable curly, nonblock-statement-body-position */
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
      <Typography>{player.name}</Typography>
      <Box
        sx={{
          flexGrow: 1,
          height: 12,
          borderBottom: '1px dotted #999',
        }}
      />
      <Typography
        sx={{
          color: getColor(player.score),
          fontWeight: 'bold',
        }}
      >
        {player.score > 0 && '+'}{player.score ?? 0}
      </Typography>
    </ListItem>
  )
})

export default PlayerScore
