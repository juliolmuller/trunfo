import { DeleteForeverOutlined as DeleteIcon, PlayArrow as PlayIcon } from '@mui/icons-material'
import { Box, Button, Divider, List, Stack, Typography } from '@mui/material'
import { useMemo, useRef } from 'react'

import { MatchLog, Player } from '~/models'

import { ChangeEvent, PlayerLogs } from './PlayerLogs'

export { type ChangeEvent }

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

export function MatchScoreBoard({
  logs,
  players,
  // TODO: review implementation
  // playerTurn,
  roundsCount,
  status = 'observing',
  title,
  onChange,
  onDone,
}: MatchScoreBoardProps) {
  const previousPlayer = useRef<Player['id']>()
  // TODO: review implementation
  // const betsCount = useMemo(() => {
  //   return logs.reduce((count, log) => count + log.betsCount, 0)
  // }, [logs])
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
    const nextPlayer = players[nextPlayerIndex]

    onChange({ log, player })

    if (previousPlayer.current !== player.id) {
      onDone?.({ log, player, nextPlayer })
    }
  }

  return (
    <Stack gap={3}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
        {title}
      </Typography>

      <List dense>
        {logs.map((log) => (
          <PlayerLogs
            key={log.id}
            log={log}
            maxBetsAndHits={roundsCount}
            player={playersMap.get(log.player) as Player}
            status={status}
            onChange={handleChange}
          />
        ))}
      </List>

      <Divider />

      <Box
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          gap: 2,
          [theme.breakpoints.up('sm')]: {
            flexDirection: 'row-reverse',
          },
        })}
      >
        <Button
          startIcon={<PlayIcon />}
          onClick={() => {
            // TODO:implement
          }}
          sx={(theme) => ({
            [theme.breakpoints.down('sm')]: {
              width: '100%',
            },
          })}
        >
          Iniciar Partida
        </Button>

        <Button
          startIcon={<DeleteIcon />}
          variant="text"
          onClick={() => {
            // TODO:implement
          }}
          sx={(theme) => ({
            [theme.breakpoints.down('sm')]: {
              width: '100%',
            },
          })}
        >
          Cancelar Partida
        </Button>
      </Box>
    </Stack>
  )
}
