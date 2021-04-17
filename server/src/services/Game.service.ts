/* eslint-disable require-await */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

type Player = {
  name: string
  score: number
}

type Play = Array<{
  playerHash: string
  betsCount: number
  wonCount: number
}>

type Game = {
  _id?: string
  key: string
  name: string
  forceEqualBets: boolean
  scoreOnZeroBets: boolean
  forceUnequalBets: boolean,
  scoringMode: 'MultiplyingBets'
    | 'Simplified'
  status: 'RegisteringPlayers'
    | 'ConfiguringPlay'
    | 'PlayersBetting'
    | 'CountingHits'
    | 'Finished'
    | 'Playing'
  players: Player[]
  plays: Play[]
}

type PatchAction = 'ADD' | 'REMOVE'

type PatchParams = {
  action: PatchAction
  player: string
}

class GameService {
  private games: Array<Game> = []

  // DEBUG: initialize with data for testing
  constructor() {
    this.games.push({
      _id: '123123',
      key: '123123',
      name: 'Star Wars',
      forceEqualBets: false,
      scoreOnZeroBets: false,
      forceUnequalBets: false,
      scoringMode: 'MultiplyingBets',
      status: 'Finished',
      plays: [],
      players: [
        {
          name: 'Júlio',
          score: 0,
        },
        {
          name: 'Jordana',
          score: 0,
        },
        {
          name: 'Elisa',
          score: 0,
        },
        {
          name: 'Lídia',
          score: 0,
        },
        {
          name: 'Danilo',
          score: 0,
        },
      ],
    })
  }

  generateKey(): string {
    const NUMERIC_BASE = 36
    const AFTER_DOT = 2
    const ID_SIZE = 6
    const newKey = Math.random()
      .toString(NUMERIC_BASE)
      .substr(AFTER_DOT, ID_SIZE)
      .toUpperCase()
    const existingKey = this.games.find(({ key }) => newKey === key)

    return existingKey
      ? this.generateKey()
      : newKey
  }

  mergeDefaultValues({ key, name, ...data }: Partial<Game>): Game {
    key ||= this.generateKey() // eslint-disable-line no-param-reassign
    name ||= key // eslint-disable-line no-param-reassign

    return {
      _id: '',
      key,
      name,
      scoreOnZeroBets: false,
      forceEqualBets: false,
      forceUnequalBets: false,
      scoringMode: 'MultiplyingBets',
      status: 'ConfiguringPlay',
      players: [],
      plays: [],
      ...data,
    }
  }

  async get(gameKey: string) {
    const game = this.games.find(({ key }) => key === gameKey)

    if (!game) {
      throw new Error(`Jogo com chave "${gameKey}" não encontrado.`)
    }

    return new Promise<Game>((resolve) => {
      setTimeout(() => resolve(game), 1000)
    })
  }

  async create(data: Partial<Game>) {
    return new Promise<Game>((resolve) => {
      setTimeout(() => {
        const game = this.mergeDefaultValues(data)

        this.games.push(game)

        return resolve(game)
      }, 1000)
    })
  }

  // eslint-disable-next-line class-methods-use-this
  async addPlayer(game: Game, playerName: string) {
    const playerIndex = game.players.findIndex(({ name }) => name === playerName)
    const player: Player = {
      name: playerName,
      score: 0,
    }

    if (playerIndex > -1) {
      throw new Error(`Jogador com nome "${playerName}" já cadastrado.`)
    }

    game.players.push(player)

    return player
  }

  // eslint-disable-next-line class-methods-use-this
  async removePlayer(game: Game, playerName: string) {
    const playerIndex = game.players.findIndex(({ name }) => name === playerName)

    if (playerIndex === -1) {
      throw new Error(`Jogador com nome "${playerName}" não encontrado.`)
    }

    const player = game.players[playerIndex]
    game.players.splice(playerIndex, 1)

    return player
  }

  async patch(gameKey: string, { action, player: playerName }: PatchParams) {
    const game = this.games.find(({ key }) => key === gameKey)

    if (!game) {
      throw new Error(`Jogo com chave "${gameKey}" não encontrado.`)
    }

    return new Promise<Player & { action: PatchAction }>((resolve, reject) => {
      setTimeout(async () => {
        try {
          const player = action?.match(/REMOVE/i)
            ? await this.removePlayer(game, playerName)
            : await this.addPlayer(game, playerName)
          resolve({
            ...player,
            action: action?.match(/REMOVE/i) ? 'REMOVE' : 'ADD',
          })
        } catch (error) {
          reject(error)
        }
      }, 1000)
    })
  }

  async update(gameKey: string, data: Partial<Game>) {
    return new Promise<Game>((resolve) => {
      setTimeout(async () => {
        const { _id, key, ...oldGame } = await this.get(gameKey)
        const newGame: Game = {
          ...oldGame,
          ...data,
          key,
          _id,
        }

        return resolve(newGame)
      }, 1000)
    })
  }
}

export default GameService
