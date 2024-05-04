import { DeleteForeverOutlined as DeleteIcon, PlayArrow as PlayIcon } from '@mui/icons-material'
import {
  Box,
  Button,
  ClickAwayListener,
  Divider,
  List,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import { useMemo, useRef, useState } from 'react'

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
  betsCount: number
  players: Player[]
  roundsCount: number
  title: string
  error?: string
  playerTurn?: Player['id']
  onCancel: () => void
  onFinish: () => void
}

export function MatchScoreBoard({
  betsCount,
  error,
  logs,
  players,
  // TODO: review implementation
  // playerTurn,
  roundsCount,
  status = 'observing',
  title,
  onCancel,
  onChange,
  onDone,
  onFinish,
}: MatchScoreBoardProps) {
  const [isTooltipOpen, setTooltipOpen] = useState(false)
  const previousPlayer = useRef<Player['id']>()
  // TODO: review implementation
  // const betsCount = useMemo(() => {
  //   return logs.reduce((count, log) => count + log.betsCount, 0)
  // }, [logs])
  const playersMap = useMemo(() => {
    const playersEntries = players.map((player) => [player.id, player] as const)

    return new Map(playersEntries)
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

  function handleStartMatch() {
    if (error) {
      setTooltipOpen(true)
      return
    }

    onFinish()
  }

  return (
    <Stack gap={3}>
      <Typography variant="h5" sx={{ textAlign: 'center' }}>
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

      <Typography variant="caption" align="center">
        Número de rodadas: <b>{roundsCount}</b> | Total de apostas: <b>{betsCount}</b>
      </Typography>

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
        <ClickAwayListener onClickAway={() => setTooltipOpen(false)}>
          <Tooltip
            open={isTooltipOpen}
            title={error || null}
            PopperProps={{ disablePortal: true }}
            onClose={() => setTooltipOpen(false)}
          >
            <Button
              startIcon={<PlayIcon />}
              onClick={handleStartMatch}
              sx={(theme) => ({
                [theme.breakpoints.down('sm')]: {
                  width: '100%',
                },
              })}
            >
              Iniciar Partida
            </Button>
          </Tooltip>
        </ClickAwayListener>

        <Button
          startIcon={<DeleteIcon />}
          variant="text"
          onClick={() => onCancel()}
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
