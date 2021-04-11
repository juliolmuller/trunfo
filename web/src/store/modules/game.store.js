
function generateId() {
  const NUMERIC_BASE = 36
  const AFTER_DOT = 2
  const ID_SIZE = 6

  return Math.random()
    .toString(NUMERIC_BASE)
    .substr(AFTER_DOT, ID_SIZE)
    .toUpperCase()
}

export default {
  namespaced: true,

  state: () => ({
    id: '',
    name: '',
    scoringMode: 'byBetsCount',
    scoreOnZeroBets: false,
    forceEqualBets: false,
    forceUnequalBets: false,
    isRegisteringPlayers: false,
    arePlayersBetting: true,
    isActive: true,
    players: [],
    rounds: [],
  }),

  getters: {
    game: (state) => state,
  },

  mutations: {
    configGame(state, options) {
      Object.assign(state, options)
    },
  },

  actions: {
    async create({ commit, getters }) {
      const gameId = generateId()
      const gameName = getters.game.name || gameId

      // TODO: send a POST request to create a match
      const game = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ...getters.game,
            name: gameName,
            id: gameId,
          })
        }, 1000)
      })

      commit('configGame', game)
    },

    // TODO: sned a GET request to retrieve match data
    async fetchGame({ commit }, gameId) {
      const game = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ id: gameId })
        }, 1000)
      })

      commit('configGame', game)
    },

    async joinGame({ commit, state }, playerName) {
      const game = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: state.id,
            players: [playerName],
          })
        }, 1000)
      })

      commit('configGame', game)
    },
  },
}
