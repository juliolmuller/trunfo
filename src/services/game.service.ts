import { generateAvatar, generateKey } from '~/helpers'
import { Game, GameStatus, Player, MatchLog, ScoringMode, Match, User } from '~/models'

import { auth, database } from './firebase'

function toArray<TModel>(
  firebaseObj: object,
  mergeProps?: (model: TModel) => Partial<TModel>,
): TModel[] {
  return Object.entries(firebaseObj ?? {}).map(([id, model]) => {
    const baseModel = { ...(model as TModel), id }

    return { ...baseModel, ...mergeProps?.(baseModel as TModel) }
  })
}

function normalizePlayers(snapshotVal: any) {
  return toArray<Player>(snapshotVal, (player) => ({
    addedAt: new Date(player.addedAt),
  })).sort((p1, p2) =>
    p1.order === p2.order ? Number(p1.addedAt) - Number(p2.addedAt) : p1.order - p2.order,
  )
}

function normalizeLogs(snapshotVal: any, match: Match, players: Player[]) {
  const logs = toArray<MatchLog>(snapshotVal)
  const playersClone = Array.from(players)
  const firstPlayerIndex = players.findIndex((player) => player.id === match.firstPlayer)
  const playersToShift = playersClone.splice(0, firstPlayerIndex)
  const orderedPlayers = [...playersClone, ...playersToShift]

  return orderedPlayers.map((player) => {
    return logs.find((log) => log.player === player.id)!
  })
}

function normalizeMatches(snapshotVal: any, players: Player[]) {
  return toArray<Match>(snapshotVal, (match) => ({
    createdAt: new Date(match.createdAt),
    logs: normalizeLogs(match.logs, match, players),
  }))
}

function normalizeGame(gameId: Game['id'], snapshotVal: any): Game {
  const players = normalizePlayers(snapshotVal.players)
  const matches = normalizeMatches(snapshotVal.matches, players)

  return {
    ...snapshotVal,
    id: gameId,
    createdAt: new Date(snapshotVal.createdAt),
    players,
    matches,
  }
}

function connectToGame(gameId: Game['id'], eventHandler: (game: Game) => void) {
  const gameRef = database.ref(`games/${gameId}`)

  gameRef.on('value', (snapshot) => {
    const rawValue = snapshot.val()

    if (!rawValue) {
      throw new Error(`Unable to connect to game with ID ${gameId}`)
    }

    const normalizedGame = normalizeGame(gameId, rawValue)

    eventHandler(normalizedGame)
  })

  return () => gameRef.off('value')
}

async function findGameByKey(gameKey: Game['key']) {
  const gameRef = database.ref('games')
  const query = gameRef.orderByChild('key').equalTo(gameKey)
  const snapshot = await query.once('value')
  const value = snapshot.val()
  const error = new Error(`Unable to connect to game with key ${gameKey}`)

  if (!value) {
    throw error
  }

  const games = Object.entries(value).map(([gameId, rawValue]) => normalizeGame(gameId, rawValue))

  for (const { id, status } of games) {
    if (status === GameStatus.PLAYERS_JOINING) {
      return id
    }
  }

  throw error
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

async function addSignedUser(gameId: Game['id'], user: User) {
  const thenable = await database.ref(`games/${gameId}/players`).push({
    addedAt: new Date().toISOString(),
    avatar: user.avatar,
    name: user.name,
    userId: user.id,
    order: 9999,
  })

  return thenable.key as Player['id']
}

async function updatePlayer(
  gameId: Game['id'],
  playerId: Player['id'],
  props: Partial<Omit<Player, 'id' | 'userId'>>,
) {
  if ('addedAt' in props) {
    props.addedAt = new Date().toISOString() as any
  }

  await database.ref(`games/${gameId}/players/${playerId}`).update(props)
}

async function removePlayer(gameId: Game['id'], playerId: Player['id']) {
  await database.ref(`games/${gameId}/players/${playerId}`).remove()
}

async function reorderPlayers(gameId: Game['id'], playersIds: Player['id'][]) {
  const playersRef = database.ref(`games/${gameId}/players`)

  await Promise.all(
    playersIds.map(async (id, index) => {
      await playersRef.child(id).update({ order: index + 1 })
    }),
  )
}

async function createMatch(
  gameId: Game['id'],
  { firstPlayer, roundsCount }: Pick<Match, 'firstPlayer' | 'roundsCount'>,
) {
  const gameRef = database.ref(`games/${gameId}`)
  const thenable = await gameRef.child('matches').push({
    createdAt: new Date().toISOString(),
    playerTurn: null, // ignored by firebase
    firstPlayer,
    roundsCount,
  })

  const playersSnapshot = await gameRef.child('players').once('value')
  const players = normalizePlayers(playersSnapshot.val())
  await Promise.all(
    players.map(({ id }) => {
      return gameRef.child(`matches/${thenable.key}/logs`).push({
        player: id,
        betsCount: 0,
        hitsCount: 0,
      })
    }),
  )

  return thenable.key as Match['id']
}

async function updateMatch(
  gameId: Game['id'],
  matchId: Match['id'],
  props: Partial<Omit<Match, 'id'>>,
) {
  if ('createdAt' in props) {
    props.createdAt = new Date().toISOString() as any
  }

  await database.ref(`games/${gameId}/matches/${matchId}`).update(props)
}

async function destroyMatch(gameId: Game['id'], matchId: Match['id']) {
  await database.ref(`games/${gameId}/matches/${matchId}`).remove()
}

async function updateMatchLog(
  gameId: Game['id'],
  matchId: Match['id'],
  logId: MatchLog['id'],
  props: Partial<Omit<MatchLog, 'id'>>,
) {
  if ('createdAt' in props) {
    props.createdAt = new Date().toISOString() as any
  }

  await database.ref(`games/${gameId}/matches/${matchId}/logs/${logId}`).update(props)
}

export const gameService = {
  connectToGame,
  findGameByKey,
  createGame,
  updateGame,
  addOfflinePlayer,
  addSignedUser,
  updatePlayer,
  removePlayer,
  reorderPlayers,
  createMatch,
  updateMatch,
  destroyMatch,
  updateMatchLog,
}
