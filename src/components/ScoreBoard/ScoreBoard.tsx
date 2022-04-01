import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { createRef, useMemo } from 'react'

import { Player } from '~/models'

import AnimatedList from './AnimatedList'
import PlayerScore from './PlayerScore'

export interface ScoreBoardProps {
  players: Player[]
}

function ScoreBoard({ players }: ScoreBoardProps) {
  const orderedPlayers = useMemo(() => {
    return [...players].sort((p1, p2) => p2.score - p1.score)
  }, [players])

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
        Placar do Jogo
      </Typography>

      <AnimatedList>
        {orderedPlayers.map((player) => (
          <PlayerScore key={player.id} ref={createRef()} {...player} />
        ))}
      </AnimatedList>
    </Box>
  )
}

export default ScoreBoard
