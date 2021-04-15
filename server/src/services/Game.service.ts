/* eslint-disable require-await */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

interface Game {
  _id?: string
  key: string
  name: string
  forceEqualBets: boolean
  scoreOnZeroBets: boolean
  forceUnequalBets: boolean,
  scoringMode: 'byBetsCount' | 'simplified'
  arePlayersRegistering: boolean
  arePlayersBetting: boolean
  isActive: boolean
  players: string[]
  rounds: Array<{
    player: string
    betsCount: number
    wonCount: number
  }>
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
      scoringMode: 'byBetsCount',
      arePlayersRegistering: false,
      arePlayersBetting: false,
      isActive: true,
      players: ['Júlio', 'Jordana', 'Elisa', 'Lídia', 'Danilo'],
      rounds: [],
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

  // eslint-disable-next-line class-methods-use-this
  mergeDefaultValues({ key, name, ...data }: Partial<Game>): Game {
    key ||= this.generateKey() // eslint-disable-line no-param-reassign
    name ||= key // eslint-disable-line no-param-reassign

    return {
      _id: '',
      key,
      name,
      scoringMode: 'byBetsCount',
      scoreOnZeroBets: false,
      forceEqualBets: false,
      forceUnequalBets: false,
      arePlayersRegistering: false,
      arePlayersBetting: false,
      isActive: true,
      players: [],
      rounds: [],
      ...data,
    }
  }

  async get(id: string) {
    const game = this.games.find(({ key }) => key === id) as Game

    if (!game) {
      throw new Error(`Jogo com chave "${id}" não encontrado.`)
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

  async update(id: string, data: Partial<Game>) {
    return new Promise<Game>((resolve) => {
      setTimeout(async () => {
        const { _id, ...oldGame } = await this.get(id)
        const newGame = {
          ...oldGame,
          ...data,
          _id,
        }

        return resolve(newGame)
      }, 1000)
    })
  }
}

export default GameService
