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

  // eslint-disable-next-line class-methods-use-this
  mergeDefaultValues(data: Partial<Game>) {
    return {
      _id: '',
      key: '',
      name: '',
      scoringMode: 'byBetsCount',
      scoreOnZeroBets: false,
      forceEqualBets: false,
      forceUnequalBets: false,
      arePlayersRegistering: false,
      arePlayersBetting: true,
      isActive: true,
      players: [],
      rounds: [],
      ...data,
    } as Game
  }

  async find() {
    return this.games
  }

  async get(id: string) {
    return this.games.find((game) => game.key === id) as Game
  }

  async create(data: Partial<Game>) {
    const game = this.mergeDefaultValues({
      ...data,
      _id: data.key,
    })

    this.games.push(game)

    return game
  }

  async update(id: string, data: Partial<Game>) {
    const { _id, ...oldGame } = await this.get(id)
    const newGame = {
      ...oldGame,
      ...data,
      _id,
    }

    return newGame
  }
}

export default GameService
