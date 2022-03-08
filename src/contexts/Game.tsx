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
  connectToGame: (gameId: string) => (/* unsubscribe fn */) => void
  updateGame: (data: Partial<Game>) => Promise<void>
}

export type GameProviderProps = {
  children: ReactNode
}

export const GameContext = createContext({} as GameContextProps)

export function GameProvider({ children }: GameProviderProps) {
  const navigate = useNavigate()
  const [isLoading] = useState(true)
  const [activeGame, setActiveGame] = useState<Game>()
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
      players: [], // ignored by firebase
      scoreOnZeroBets: false,
      scoringMode: ScoringMode.STANDARD,
      status: GameStatus.PLAYERS_JOINING,
      turns: [], // ignored by firebase
      ...rest,
    }
    const gamesRef = database.ref('games')
    const newGame = await gamesRef.push(gameData)
    navigate(`/game/${newGame.key}`, { replace: true })
  }

  function connectToGame(gameId: string) {
    const gameRef = database.ref(`games/${gameId}`)

    gameRef.on('value', (event) => {
      if (!event.val()) {
        return
      }

      setActiveGame({
        ...event.val(),
        id: gameId,
        turns: [],
        players: [],
        createdAt: new Date(event.val().createdAt),
      } as Game)
    })

    return () => gameRef.off('value')
  }

  async function updateGame(data: Partial<Game>) {
    if (activeGame?.id) {
      await database.ref(`games/${activeGame.id}`).update({ ...data })
    }
  }

  return (
    <GameContext.Provider
      value={{
        isLoading,
        activeGame,
        recentGames,
        userGames,
        createGame,
        connectToGame,
        updateGame,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame(): GameContextProps {
  return useContext(GameContext)
}
