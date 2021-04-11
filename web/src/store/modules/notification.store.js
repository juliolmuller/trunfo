
const NOTIFICATION_TIMEOUT = 4000

export default {
  state: () => ({
    notification: null,
  }),

  getters: {
    isNotifying: (state) => !!state.notification,
    notification: (state) => state.notification ?? {},
  },

  mutations: {
    setNotification(state, { message, color }) {
      state.notification = { message, color }

      setTimeout(() => {
        state.notification = null
      }, NOTIFICATION_TIMEOUT)
    },
  },

  actions: {
    notify({ commit }, payload) {
      if (payload instanceof Error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error(payload)
        }

        return commit('setNotification', {
          message: payload.message,
          color: 'red darken-4',
        })
      }

      return commit('setNotification', {
        message: payload.message ?? payload,
        color: payload.color ?? payload,
      })
    },
  },
}
