import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Game, GameStatus, Player } from '~/models'
import { gameService } from '~/services'

export type GameContextProps = {
  isLoading: boolean
  activeGame: Game | undefined
  recentGames: Game[]
  userGames: Game[]
  createGame: (game: Partial<Game>) => Promise<void>
  connectToGame: (gameId: Game['id']) => void
  updateGame: (data: Partial<Game>) => Promise<void>
  addOfflinePlayer: (playerName: string) => Promise<void>
  removePlayer: (playerId: Player['id']) => Promise<void>
  reorderPlayers: (playersIds: Player['id'][]) => Promise<void>
  startMatch: () => Promise<void>
  defineNewTurn: () => Promise<void>
  endMatch: () => Promise<void>
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

  function connectToGame(gameId: Game['id']) {
    setActiveGameId(gameId)
  }

  async function createGame(game: Partial<Game>) {
    const { id } = await gameService.createGame(game)
    navigate(`/game/${id}`, { replace: true })
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

  async function startMatch() {
    await updateGame({ status: GameStatus.AWAITING })
  }

  async function defineNewTurn() {
    await updateGame({ status: GameStatus.SETTING_UP_TURN })
  }

  async function endMatch() {
    await updateGame({ status: GameStatus.CLOSED })
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
        recentGames,
        userGames,
        connectToGame,
        createGame,
        updateGame,
        addOfflinePlayer,
        removePlayer,
        reorderPlayers,
        startMatch,
        defineNewTurn,
        endMatch,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame(): GameContextProps {
  return useContext(GameContext)
}
