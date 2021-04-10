import { register } from 'register-service-worker'

function ready() {
  console.log(
    'App is being served from cache by a service worker.\n'
    + 'For more details, visit https://goo.gl/AFskqB',
  )
}

function registered() {
  console.log('Service worker has been registered.')
}

function cached() {
  console.log('Content has been cached for offline use.')
}

function updatefound() {
  console.log('New content is downloading.')
}

function offline() {
  console.log('No internet connection found. App is running in offline mode.')
}

function updated() {
  console.log('New content is available; please refresh.')
}

function error(err) {
  console.error('Error during service worker registration:', err)
}

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    updatefound,
    registered,
    updated,
    offline,
    cached,
    ready,
    error,
  })
}
