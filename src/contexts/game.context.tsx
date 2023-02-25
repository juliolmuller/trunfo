import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Game, GameStatus, Player, Turn } from '~/models'
import { gameService } from '~/services'

export type GameContextProps = {
  isLoading: boolean
  activeGame: Game | undefined
  activeGamePlayers: Player[]
  activeTurn: Turn | undefined
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
  startTurnAndBet: (rounds: number) => Promise<void>
  cancelTurn: () => Promise<void>
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
  const [activeTurn, setActiveTurn] = useState<Turn>()
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

  async function startTurnAndBet(rounds: number) {
    // TODO: create method to save new turn
    // const activeTurn = await gameService.createTurn(activeGameId, rounds)
    await updateGame({ status: GameStatus.PLAYERS_BETTING })
    // setActiveTurn(activeTurn)
  }

  async function cancelTurn() {
    if (activeTurn) {
      // TODO: search for existing turn and delete it
    }
    await updateGame({ status: GameStatus.AWAITING })
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
        activeGamePlayers: activeGame?.players ?? [],
        activeTurn,
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
        startTurnAndBet,
        cancelTurn,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame(): GameContextProps {
  return useContext(GameContext)
}
