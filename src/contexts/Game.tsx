import { createContext, ReactNode, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '~/hooks'
import { Game, GameStatus, Player, ScoringMode } from '~/models'
import { database } from '~/services/firebase'
import { generateKey } from '~/utils'

export type GameContextProps = {
  isLoading: boolean
  activeGame: Game | undefined
  recentGames: Game[]
  userGames: Game[]
  createGame: (game: Partial<Game>) => Promise<void>
  connectToGame: (gameId: Game['id']) => (/* unsubscribe fn */) => void
  updateGame: (data: Partial<Game>) => Promise<void>
  addOfflinePlayer: (playerName: string) => Promise<void>
  removePlayer: (playerId: Player['id']) => Promise<void>
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

  function connectToGame(gameId: Game['id']) {
    const gameRef = database.ref(`games/${gameId}`)

    gameRef.on('value', (event) => {
      const rawValue = event.val()

      if (!rawValue) {
        return
      }

      setActiveGame({
        ...rawValue,
        id: gameId,
        createdAt: new Date(event.val().createdAt),
        turns: Object.keys(rawValue.turns ?? {}).map((turnId) => ({
          ...rawValue.turns[turnId],
          id: turnId,
        })),
        players: Object.keys(rawValue.players ?? {}).map((playerId) => ({
          ...rawValue.players[playerId],
          id: playerId,
        })),
      } as Game)
    })

    return () => gameRef.off('value')
  }

  async function updateGame(data: Partial<Game>) {
    if (activeGame?.id) {
      await database.ref(`games/${activeGame.id}`).update({ ...data })
    }
  }

  async function addOfflinePlayer(playerName: string) {
    if (activeGame?.id) {
      await database.ref(`games/${activeGame.id}/players`).push({
        name: playerName,
        order: 0,
        score: 0,
      })
    }
  }

  async function removePlayer(playerId: Player['id']) {
    if (activeGame?.id) {
      await database.ref(`games/${activeGame.id}/players/${playerId}`).remove()
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
        addOfflinePlayer,
        removePlayer,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame(): GameContextProps {
  return useContext(GameContext)
}
