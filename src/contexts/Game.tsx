import { createContext, ReactNode, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '~/hooks'
import { Game, GameStatus, ScoringMode } from '~/models'
import { database } from '~/services/firebase'
import { generateKey } from '~/utils'

export type GameContextProps = {
  isLoading: boolean
  activeGame: Game | undefined
  recentGames: Game[]
  userGames: Game[]
  createGame: (game: Partial<Game>) => Promise<void>
}

export type GameProviderProps = {
  children: ReactNode
}

export const GameContext = createContext({} as GameContextProps)

export function GameProvider({ children }: GameProviderProps) {
  const navigate = useNavigate()
  const [isLoading] = useState(true)
  const [activeGame] = useState<Game>()
  const [recentGames] = useState<Game[]>([])
  const [userGames] = useState<Game[]>([])
  const { user } = useAuth()

  async function createGame({ name, ...rest }: Partial<Game>) {
    const gameKey = generateKey()
    const gameData: Game = {
      betsEqualRounds: false,
      betsUnequalRounds: false,
      createdAt: new Date().toISOString(),
      createdBy: user?.id as string,
      key: gameKey,
      name: name || `Jogo ${gameKey}`,
      players: [],
      scoreOnZeroBets: false,
      scoringMode: ScoringMode.STANDARD,
      status: GameStatus.CLOSED,
      turns: [],
      ...rest,
    }
    const gamesRef = database.ref('games')
    const newGame = await gamesRef.push(gameData)
    navigate(`/game/${newGame.key}`, { replace: true })
  }

  return (
    <GameContext.Provider
      value={{
        isLoading,
        activeGame,
        recentGames,
        userGames,
        createGame,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame(): GameContextProps {
  return useContext(GameContext)
}
