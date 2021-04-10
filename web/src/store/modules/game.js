/* eslint-disable */

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
    async createGame({ commit, getters }) {
      commit('setIsLoading', true)

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
        }, 1500)
      })

      commit('configGame', game)
      commit('saveLocally', { isOwner: true })
      commit('setLoading', false)
    },

    // TODO: sned a GET request to retrieve match data
    async fetchGame({ commit }, gameId) {

      commit('setLoading', true)

      const game = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ id: gameId })
        }, 1500)
      })

      commit('configGame', game)
      commit('setLoading', false)
    },

    async joinGame({ commit, state }, playerName) {

      commit('setLoading', true)

      const game = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: state.id,
            players: [playerName],
          })
        }, 1500)
      })

      commit('configGame', game)
      commit('saveLocally', { playAs: playerName })
      commit('setLoading', false)
    },
    async joinGame({ commit }) {
      // TODO: implement
    },
  },
}
