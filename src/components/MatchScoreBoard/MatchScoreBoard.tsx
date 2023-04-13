import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useMemo, useRef } from 'react'

import { MatchLog, Player } from '~/models'

import PlayerLogs, { ChangeEvent } from './PlayerLogs'

export type DoneEvent = {
  log: MatchLog
  player: Player
  nextPlayer: Player
}

export type MatchObservingProps = {
  status?: 'observing'
  onChange?: (event: ChangeEvent) => void
  onDone?: (event: DoneEvent) => void
}

export type MatchUpdatingProps = {
  status: 'betting' | 'scoring'
  onChange: (event: ChangeEvent) => void
  onDone: (event: DoneEvent) => void
}

export type MatchScoreBoardProps = (MatchObservingProps | MatchUpdatingProps) & {
  logs: MatchLog[]
  players: Player[]
  roundsCount: number
  title: string
  playerTurn?: Player['id']
}

function MatchScoreBoard({
  logs,
  players,
  playerTurn,
  roundsCount,
  status = 'observing',
  title,
  onChange,
  onDone,
}: MatchScoreBoardProps) {
  const previousPlayer = useRef<Player['id']>()
  const betsCount = useMemo(() => {
    return logs.reduce((count, log) => count + log.betsCount, 0)
  }, [logs])
  const playersMap = useMemo(() => {
    const playersEntries = players.map((player) => [player.id, player] as const)

    return new Map<string, Player>(playersEntries)
  }, [players])

  function handleChange({ log, player }: ChangeEvent) {
    if (!onChange) {
      return
    }

    const playerIndex = players.indexOf(player)
    const nextPlayerIndex = (playerIndex + 1) % players.length
    const thisPlayer = players[playerIndex]
    const nextPlayer = players[nextPlayerIndex]
    onChange({ log, player: thisPlayer })

    if (previousPlayer.current !== thisPlayer.id) {
      onDone?.({ log, player, nextPlayer })
    }
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
        {title}
      </Typography>

      {logs.map((log) => (
        <PlayerLogs
          key={log.id}
          current={playerTurn === log.player}
          log={log}
          player={playersMap.get(log.player) as Player}
          status={status}
          onChange={handleChange}
        />
      ))}
    </Box>
  )
}

export default MatchScoreBoard
