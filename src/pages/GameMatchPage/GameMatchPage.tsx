import { FC, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import Loading from '~/components/Loading'
import { useGame } from '~/hooks'
import { GameStatus } from '~/models'

import ClosedView from './ClosedView'
import PlayersBettingView from './PlayersBettingView'
import PlayersJoiningView from './PlayersJoiningView'
import PlayingView from './PlayingView'
import ReportingHitsView from './ReportingHitsView'
import SettingUpTurnView from './SettingUpTurnView'

const viewByStatusMap: Record<GameStatus, FC> = {
  [GameStatus.CLOSED]: ClosedView,
  [GameStatus.PLAYERS_BETTING]: PlayersBettingView,
  [GameStatus.PLAYERS_JOINING]: PlayersJoiningView,
  [GameStatus.PLAYING]: PlayingView,
  [GameStatus.REPORTING_HITS]: ReportingHitsView,
  [GameStatus.SETTING_UP_TURN]: SettingUpTurnView,
}

function GameMatchPage() {
  const { gameId } = useParams()
  const { activeGame, connectToGame } = useGame()
  const ActiveView = useMemo(() => {
    return activeGame ? viewByStatusMap[activeGame.status] : Loading
  }, [activeGame?.status]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { // eslint-disable-line consistent-return
    if (gameId) {
      // Returns the unsubscribe function
      return connectToGame(gameId)
    }
  }, [gameId]) // eslint-disable-line react-hooks/exhaustive-deps

  return <ActiveView />
}

export default GameMatchPage
