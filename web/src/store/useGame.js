import { reactive, readonly } from '@vue/composition-api'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'

const socket = io(process.env.VUE_APP_SERVER_URL)
const client = feathers().configure(socketio(socket))
const service = client.service(process.env.VUE_APP_SERVICE_NAME)

const state = reactive({
  _id: '',
  key: '',
  name: '',
  forceEqualBets: false,
  forceUnequalBets: false,
  scoreOnZeroBets: false,
  scoringMode: 'MultiplyingBets',
  status: 'Loading',
  players: [],
  plays: [],
})

async function createGame(data) {
  const game = await service.create({
    ...data,
    status: 'RegisteringPlayers',
  })

  Object.assign(state, game)
}

async function findGame(gameKey) {
  const game = await service.get(gameKey)

  Object.assign(state, game)
}

function resumeGame() {
  // TODO: send info to server
  throw new Error('Action pending implementation.')
}

async function addPlayer(playerName) {
  if (state.players.includes(playerName)) {
    throw new Error('Já existe um jogador com este nome.')
  }

  // TODO: send info to server
  await new Promise((resolve) => {
    setTimeout(() => resolve(), 1000)
  })

  state.players.push(playerName)
}

async function removePlayer(playerName) {
  // TODO: send info to server
  await new Promise((resolve) => {
    setTimeout(() => resolve(), 1000)
  })

  const playerIndex = state.players.indexOf(playerName)

  if (playerIndex === -1) {
    throw new Error(`Jogador "${playerName}" não encontrado.`)
  }

  state.players.splice(playerIndex, 1)
}

function useGame() {
  return {
    game: readonly(state),
    players: state.players,
    createGame,
    findGame,
    resumeGame,
    addPlayer,
    removePlayer,
  }
}

export default useGame
