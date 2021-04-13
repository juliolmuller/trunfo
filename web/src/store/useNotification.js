import { computed, reactive, readonly } from '@vue/composition-api'

const NOTIFICATION_TIMEOUT = 4000

const initialState = {
  color: 'indigo',
  message: '',
}

const state = reactive({ ...initialState })
const isNotifying = computed(() => Boolean(state.message))

function notify(notification) {
  if (notification instanceof Error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(notification)
    }

    Object.assign(state, {
      message: notification.message,
      color: 'red darken-4',
    })
  } else {
    Object.assign(state, {
      message: notification.message ?? notification,
      color: notification.color ?? initialState.color,
    })
  }

  setTimeout(() => {
    Object.assign(state, initialState)
  }, NOTIFICATION_TIMEOUT)
}

function useNotification() {
  return {
    notification: readonly(state),
    isNotifying,
    notify,
  }
}

export default useNotification
