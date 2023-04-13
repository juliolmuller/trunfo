import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { calculateSimplifiedScore, calculateStandardScore } from '~/helpers'
import { Game, GameStatus, Player, Match, ScoringMode } from '~/models'
import { gameService } from '~/services'

export type GameContextProps = {
  isLoading: boolean
  activeGame: Game | undefined
  activeGameMatches: Match[]
  activeGamePlayers: Player[]
  activeMatch: Match | undefined
  recentGames: Game[]
  userGames: Game[]
  createGame: (game: Partial<Game>) => Promise<void>
  connectToGame: (gameId: Game['id']) => void
  updateGame: (data: Partial<Game>) => Promise<void>
  addOfflinePlayer: (playerName: string) => Promise<void>
  removePlayer: (playerId: Player['id']) => Promise<void>
  reorderPlayers: (playersIds: Player['id'][]) => Promise<void>
  startGame: () => Promise<void>
  endGame: () => Promise<void>
  createMatch: (matchData: Pick<Match, 'firstPlayer' | 'roundsCount'>) => Promise<void>
  abortMatch: () => Promise<void>
  calculateMatchScore: (betsCount: number, hitsCount: number) => number
}

export type GameProviderProps = {
  children: ReactNode
}

export const GameContext = createContext({} as GameContextProps)

export function GameProvider({ children }: GameProviderProps) {
  const navigate = useNavigate()
  const [isLoading] = useState(true)
  const [activeGameId, setActiveGameId] = useState<Game['id']>()
  const [activeGame, setActiveGame] = useState<Game>()
  const [recentGames] = useState<Game[]>([])
  const [userGames] = useState<Game[]>([])
  const activeMatch = activeGame?.matches.reduce((latest, match) => {
    return latest.createdAt > match.createdAt ? latest : match
  })

  function connectToGame(gameId: Game['id']) {
    setActiveGameId(gameId)
  }

  async function createGame(game: Partial<Game>) {
    const gameId = await gameService.createGame(game)
    navigate(`/game/${gameId}`, { replace: true })
  }

  async function updateGame(data: Partial<Game>) {
    if (activeGameId) {
      await gameService.updateGame(activeGameId, { ...data })
    }
  }

  async function addOfflinePlayer(playerName: string) {
    if (activeGameId) {
      await gameService.addOfflinePlayer(activeGameId, playerName)
    }
  }

  async function removePlayer(playerId: Player['id']) {
    if (activeGameId) {
      await gameService.removePlayer(activeGameId, playerId)
    }
  }

  async function reorderPlayers(playersIds: Player['id'][]) {
    if (activeGameId) {
      await gameService.reorderPlayers(activeGameId, playersIds)
    }
  }

  async function startGame() {
    await updateGame({ status: GameStatus.AWAITING })
  }

  async function endGame() {
    await updateGame({ status: GameStatus.CLOSED })
  }

  async function createMatch(matchData: Pick<Match, 'firstPlayer' | 'roundsCount'>) {
    if (activeGameId) {
      await gameService.createMatch(activeGameId, matchData)
      await updateGame({ status: GameStatus.PLAYERS_BETTING })
    }
  }

  async function abortMatch() {
    if (activeMatch) {
      // TODO: search for existing match and delete it
    }
    await updateGame({ status: GameStatus.AWAITING })
  }

  function calculateMatchScore(betsCount: number, hitsCount: number) {
    if (!activeGame) {
      console.error('Method "calculateMatchScore" called without a game.')
      return 0
    }

    return activeGame.scoringMode === ScoringMode.STANDARD
      ? calculateStandardScore(betsCount, hitsCount, activeGame.scoreOnZeroBets)
      : calculateSimplifiedScore(betsCount, hitsCount, activeGame.scoreOnZeroBets)
  }

  useEffect(() => {
    const unsubscribe = activeGameId
      ? gameService.connectToGame(activeGameId, setActiveGame)
      : undefined

    return unsubscribe
  }, [activeGameId])

  return (
    <GameContext.Provider
      value={{
        isLoading,
        activeGame,
        activeGameMatches: activeGame?.matches ?? [],
        activeGamePlayers: activeGame?.players ?? [],
        activeMatch,
        recentGames,
        userGames,
        connectToGame,
        createGame,
        updateGame,
        addOfflinePlayer,
        removePlayer,
        reorderPlayers,
        startGame,
        endGame,
        createMatch,
        abortMatch,
        calculateMatchScore,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame(): GameContextProps {
  return useContext(GameContext)
}
