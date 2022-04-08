import { createContext, ReactNode, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '~/hooks'
import { Game, GameStatus, Player, ScoringMode } from '~/models'
import { database } from '~/services/firebase'
import { generateAvatar, generateKey } from '~/utils'

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
  const [activeGame, setActiveGame] = useState<Game>()
  const [recentGames] = useState<Game[]>([])
  const [userGames] = useState<Game[]>([])
  const { user } = useAuth()

  async function createGame({ name, ...rest }: Partial<Game>) {
    const gameKey = generateKey()
    const gameData: Omit<Game, 'id'> = {
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
        createdAt: new Date(rawValue.createdAt),
        turns: Object.keys(rawValue.turns ?? {}).map((turnId) => ({
          ...rawValue.turns[turnId],
          id: turnId,
        })),
        players: Object.keys(rawValue.players ?? {}).map((playerId) => ({
          ...rawValue.players[playerId],
          addedAt: new Date(rawValue.players[playerId].createdAt),
          id: playerId,
          scoreLogs: Object.keys(rawValue.players[playerId].scoreLogs ?? {}).map((logId) => ({
            ...rawValue.players[playerId].scoreLogs[logId],
            turn: rawValue.turns[rawValue.players[playerId].scoreLogs[logId].turnId],
          })),
        } as Player)).sort((p1, p2) => (p1.order === p2.order
          ? Number(p1.addedAt) - Number(p2.addedAt)
          : p1.order - p2.order)),
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
      const playerData: Omit<Player, 'id'> = {
        addedAt: new Date().toISOString(),
        avatar: generateAvatar(playerName),
        name: playerName,
        scoreLogs: [], // ignored by firebase
        order: 9999,
      }
      await database.ref(`games/${activeGame.id}/players`).push(playerData)
    }
  }

  async function removePlayer(playerId: Player['id']) {
    if (activeGame?.id) {
      await database.ref(`games/${activeGame.id}/players/${playerId}`).remove()
    }
  }

  async function reorderPlayers(playersIds: Player['id'][]) {
    if (activeGame?.id) {
      const playersRef = database.ref(`games/${activeGame.id}/players`)

      await Promise.all(playersIds.map(async (id, index) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        await playersRef.child(id!).update({ order: index + 1 })
      }))
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
