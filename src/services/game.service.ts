import { generateAvatar, generateKey } from '~/helpers'
import { Game, GameStatus, Player, MatchLog, ScoringMode, Match } from '~/models'

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
      players: toArray<Player>(rawValue.players, (player) => ({
        addedAt: new Date(player.addedAt),
      })).sort((p1, p2) => (p1.order === p2.order
        ? Number(p1.addedAt) - Number(p2.addedAt)
        : p1.order - p2.order)),
      matches: toArray<Match>(rawValue.matches, (match) => ({
        createdAt: new Date(match.createdAt),
        logs: toArray<MatchLog>(match.logs),
      })),
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
    name: gameName,
    scoringMode: ScoringMode.STANDARD,
    betsEqualRounds: false,
    betsUnequalRounds: false,
    scoreOnZeroBets: false,
    key: gameKey,
    createdAt: new Date().toISOString(),
    createdBy: auth.currentUser?.uid,
    status: GameStatus.PLAYERS_JOINING,
    players: [], // ignored by firebase
    matches: [], // ignored by firebase
    ...rest,
  })

  return thenable.key as Game['id']
}

async function updateGame(gameId: Game['id'], props: Partial<Omit<Game, 'id'>>) {
  if ('createdAt' in props) {
    props.createdAt = new Date().toISOString() as any
  }

  await database.ref(`games/${gameId}`).update(props)
}

async function addOfflinePlayer(gameId: Game['id'], playerName: string) {
  const thenable = await database.ref(`games/${gameId}/players`).push({
    addedAt: new Date().toISOString(),
    avatar: generateAvatar(playerName),
    name: playerName,
    order: 9999,
  })

  return thenable.key as Player['id']
}

async function removePlayer(gameId: Game['id'], playerId: Player['id']) {
  await database.ref(`games/${gameId}/players/${playerId}`).remove()
}

async function reorderPlayers(gameId: Game['id'], playersIds: Player['id'][]) {
  const playersRef = database.ref(`games/${gameId}/players`)

  await Promise.all(playersIds.map(async (id, index) => {
    await playersRef.child(id).update({ order: index + 1 })
  }))
}

export const gameService = {
  connectToGame,
  createGame,
  updateGame,
  addOfflinePlayer,
  removePlayer,
  reorderPlayers,
}
