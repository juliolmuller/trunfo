import io from 'socket.io-client'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import feathersVuex from 'feathers-vuex'

const socket = io(process.env.VUE_APP_SERVER_URL, { transports: ['websocket'] })
const feathersClient = feathers()

feathersClient.configure(socketio(socket))

const {
  models,
  BaseModel,
  FeathersVuex,
  makeAuthPlugin,
  makeServicePlugin,
} = feathersVuex(feathersClient, {
  idField: '_id', // Must match the id field in database
  whitelist: ['$regex', '$options'],
})

export {
  feathersClient as default,
  makeServicePlugin,
  makeAuthPlugin,
  FeathersVuex,
  BaseModel,
  models,
}
