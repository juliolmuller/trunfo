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

  async patch(gameKey: string, userName: string) {
    const game = this.games.find(({ key }) => key === gameKey)
    const duplicatePlayer = game?.players.find(({ name }) => name === userName)
    const player: Player = {
      name: userName,
      score: 0,
    }

    if (!game) {
      throw new Error(`Jogo com chave "${gameKey}" não encontrado.`)
    }
    if (duplicatePlayer) {
      throw new Error(`Jogador com nome "${gameKey}" já cadastrado.`)
    }

    return new Promise<Player>((resolve) => {
      setTimeout(() => {
        game.players.push(player)
        resolve(player)
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
