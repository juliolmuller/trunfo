import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { createRef, useMemo } from 'react'

import { Player } from '~/models'

import AnimatedList from './AnimatedList'
import PlayerScore from './PlayerScore'

export interface OverallScoreBoardProps {
  players: Player[]
}

function OverallScoreBoard({ players }: OverallScoreBoardProps) {
  const orderedPlayers = useMemo(() => {
  // TODO: find a way to order players by score
    return [...players]
  }, [players])

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
        Placar Geral
      </Typography>

      <AnimatedList>
        {orderedPlayers.map((player) => (
          <PlayerScore key={player.id} ref={createRef()} {...player} />
        ))}
      </AnimatedList>
    </Box>
  )
}

export default OverallScoreBoard
