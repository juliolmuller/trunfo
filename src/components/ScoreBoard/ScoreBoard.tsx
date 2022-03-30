import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import { useMemo } from 'react'

import { useTheme } from '~/hooks'
import { Player } from '~/models'

export interface ScoreBoardProps {
  players: Player[]
}

function ScoreBoard({ players }: ScoreBoardProps) {
  const theme = useTheme()
  const orderedPlayers = useMemo(() => {
    return [...players].sort((p1, p2) => p2.score - p1.score)
  }, [players])

  function getColor(score: number) {
    /* eslint-disable curly, nonblock-statement-body-position */
    if (score > 0)
      return theme.palette.info.main
    if (score < 0)
      return theme.palette.error.main
    return undefined
    /* eslint-enable curly, nonblock-statement-body-position */
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
        Placar do Jogo
      </Typography>

      <List>
        {orderedPlayers.map((player) => (
          <ListItem
            key={player.id}
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
                height: 14,
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
        ))}
      </List>
    </Box>
  )
}

export default ScoreBoard
