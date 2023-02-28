import Container from '@mui/material/Container'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { ChangeEvent, FC, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import Loading from '~/components/Loading'
import { useAuth, useGame } from '~/helpers'
import { Game, GameStatus } from '~/models'

import AwaitingView from './AwaitingView'
import ClosedView from './ClosedView'
import PlayersBettingView from './PlayersBettingView'
import PlayersJoiningView from './PlayersJoiningView'
import PlayingView from './PlayingView'
import ReportingHitsView from './ReportingHitsView'
import SettingUpMatchView from './SettingUpMatchView'

const viewByStatusMap: Record<GameStatus, FC<{ game: Game }>> = {
  [GameStatus.AWAITING]: AwaitingView,
  [GameStatus.CLOSED]: ClosedView,
  [GameStatus.PLAYERS_BETTING]: PlayersBettingView,
  [GameStatus.PLAYERS_JOINING]: PlayersJoiningView,
  [GameStatus.PLAYING]: PlayingView,
  [GameStatus.REPORTING_HITS]: ReportingHitsView,
  [GameStatus.SETTING_UP_MATCH]: SettingUpMatchView,
}

function GameMatchPage() {
  const { user } = useAuth()
  const { gameId } = useParams()
  const { activeGame, connectToGame, updateGame } = useGame()
  const ActiveView = useMemo(() => {
    return activeGame ? viewByStatusMap[activeGame.status] : () => null
  }, [activeGame?.status]) // eslint-disable-line react-hooks/exhaustive-deps
  const smallViews = [GameStatus.AWAITING, GameStatus.CLOSED, GameStatus.SETTING_UP_MATCH]

  function handleChangeStatus(event: ChangeEvent<HTMLInputElement>) {
    updateGame({ status: event.target.value as GameStatus })
  }

  useEffect(() => {
    gameId && connectToGame(gameId)
  }, [gameId]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container maxWidth={smallViews.includes(activeGame?.status as GameStatus) ? 'sm' : 'md'}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" fontWeight={700}>{activeGame?.name}</Typography>

        {user?.id === activeGame?.createdBy && (
          <TextField
            label="Status do jogo"
            select
            size="small"
            value={activeGame?.status}
            onChange={handleChangeStatus}
          >
            <MenuItem value={GameStatus.AWAITING}>Aguardando</MenuItem>
            <MenuItem value={GameStatus.PLAYERS_JOINING}>Adicionar jogadores</MenuItem>
            <MenuItem value={GameStatus.SETTING_UP_MATCH}>Preparar jogada</MenuItem>
            <MenuItem value={GameStatus.PLAYERS_BETTING}>Registrar apostas</MenuItem>
            <MenuItem value={GameStatus.PLAYING}>Em jogo</MenuItem>
            <MenuItem value={GameStatus.REPORTING_HITS}>Registrar resultados</MenuItem>
            <MenuItem value={GameStatus.CLOSED}>Encerrado</MenuItem>
          </TextField>
        )}
      </Stack>

      {activeGame ? (
        <ActiveView game={activeGame} />
      ) : (
        <Loading />
      )}
    </Container>
  )
}

export default GameMatchPage
