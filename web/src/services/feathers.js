import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'

const socket = io(process.env.VUE_APP_SERVER_URL)
const client = feathers().configure(socketio(socket))

export const gameService = client.service(process.env.VUE_APP_SERVICE_NAME)
