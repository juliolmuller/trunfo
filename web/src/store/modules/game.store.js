
function generateKey() {
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
    _id: '',
    key: '',
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
    players: (state) => state.players,
  },

  mutations: {
    configGame(state, options) {
      Object.assign(state, options)
    },
    addPlayer(state, playerName) {
      state.players.push(playerName)
    },
    removePlayer(state, playerName) {
      const playerIndex = state.players.indexOf(playerName)

      state.players.splice(playerIndex, 1)
    },
  },

  actions: {
    async create({ commit, getters }) {
      const gameKey = generateKey()

      // TODO: check if key is unique

      // TODO: send info to server
      const game = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ...getters.game,
            name: getters.game.name || gameKey,
            key: gameKey,
          })
        }, 1000)
      })

      commit('configGame', game)
    },
    async fetch({ commit }, gameKey) {
      // TODO: send info to server
      const game = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ key: gameKey })
        }, 1000)
      })

      commit('configGame', game)
    },
    resume() {
      // TODO: send info to server
      throw new Error('Action pending implementation.')
    },
    async addPlayer({ commit, getters }, playerName) {
      if (getters.players.includes(playerName)) {
        throw new Error('Já existe um jogador com este nome.')
      }

      // TODO: send info to server
      await new Promise((resolve) => {
        setTimeout(() => resolve(), 1000)
      })

      commit('addPlayer', playerName)
    },
    async removePlayer({ commit }, playerName) {
      // TODO: send info to server
      await new Promise((resolve) => {
        setTimeout(() => resolve(), 1000)
      })

      commit('removePlayer', playerName)
    },
  },
}
