import { generateAvatar, generateKey } from '~/helpers'
import { Game, GameStatus, Player, ScoreLog, ScoringMode, Turn } from '~/models'

import { auth, database } from './firebase'

function toArray<TModel>(
  firebaseObj: object,
  mergeProps?: (model: TModel) => Partial<TModel>,
): TModel[] {
  return Object.entries(firebaseObj ?? {}).map(([id, model]) => {
    const baseModel = { ...model as TModel, id }

    return { ...baseModel, ...mergeProps?.(baseModel as TModel) }
  })
}

function connectToGame(gameId: Game['id'], eventHandler: (game: Game) => void) {
  const gameRef = database.ref(`games/${gameId}`)

  gameRef.on('value', (snapshot) => {
    const rawValue = snapshot.val()

    if (!rawValue) {
      throw new Error(`Unable to connect to game with ID ${gameId}`)
    }

    eventHandler({
      ...rawValue,
      id: gameId,
      createdAt: new Date(rawValue.createdAt),
      turns: toArray<Turn>(rawValue.turns),
      players: toArray<Player>(rawValue.players, (player) => ({
        addedAt: new Date(player.addedAt),
        scoreLogs: toArray<ScoreLog>(player.scoreLogs, (log) => ({
          turn: rawValue.turns[log.turnId],
        })),
      })).sort((p1, p2) => (p1.order === p2.order
        ? Number(p1.addedAt) - Number(p2.addedAt)
        : p1.order - p2.order)),
    })
  })

  return () => gameRef.off('value')
}

async function createGame(props: Partial<Omit<Game, 'id'>>) {
  const { key, name, ...rest } = props
  const gameKey = key || generateKey()
  const gameName = name || `Jogo ${gameKey}`
  const gamesRef = database.ref('games')
  const thenable = await gamesRef.push({
    betsEqualRounds: false,
    betsUnequalRounds: false,
    createdAt: new Date().toISOString(),
    createdBy: auth.currentUser?.uid,
    key: gameKey,
    name: gameName,
    players: [], // ignored by firebase
    scoreOnZeroBets: false,
    scoringMode: ScoringMode.STANDARD,
    status: GameStatus.PLAYERS_JOINING,
    turns: [], // ignored by firebase
    ...rest,
  })

  const snapshot = await database.ref(`games/${thenable.key}`).once('value')

  return { ...snapshot.val(), id: thenable.key } as Game
}

async function updateGame(gameId: Game['id'], props: Partial<Omit<Game, 'id'>>) {
  if ('createdAt' in props) {
    props.createdAt = new Date().toISOString() as any
  }

  const updatedGame = await database.ref(`games/${gameId}`).update(props)

  return { ...updatedGame, id: gameId } as Game
}

async function addOfflinePlayer(gameId: Game['id'], playerName: string) {
  const thenable = await database.ref(`games/${gameId}/players`).push({
    addedAt: new Date().toISOString(),
    avatar: generateAvatar(playerName),
    name: playerName,
    scoreLogs: [], // ignored by firebase
    order: 9999,
  })

  const snapshot = await database.ref(`games/${gameId}/players/${thenable.key}`).once('value')

  return { ...snapshot.val(), id: thenable.key } as Player
}

async function removePlayer(gameId: Game['id'], playerId: Player['id']) {
  const removedPlayer = await database.ref(`games/${gameId}/players/${playerId}`).remove()

  return { ...removedPlayer, id: playerId } as Player
}

async function reorderPlayers(gameId: Game['id'], playersIds: Player['id'][]) {
  const playersRef = database.ref(`games/${gameId}/players`)
  const updatedPlayers = await Promise.all(playersIds.map(async (id, index) => {
    const updatedPlayer = await playersRef.child(id).update({ order: index + 1 })

    return { ...updatedPlayer, id } as Player
  }))

  return updatedPlayers
}

export const gameService = {
  connectToGame,
  createGame,
  updateGame,
  addOfflinePlayer,
  removePlayer,
  reorderPlayers,
}
