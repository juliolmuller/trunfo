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
  scoringMode: 'byBetsCount',
  scoreOnZeroBets: false,
  forceEqualBets: false,
  forceUnequalBets: false,
  isRegisteringPlayers: false,
  arePlayersBetting: true,
  isActive: true,
  players: [],
  rounds: [],
})

function generateKey() {
  const NUMERIC_BASE = 36
  const AFTER_DOT = 2
  const ID_SIZE = 6

  return Math.random()
    .toString(NUMERIC_BASE)
    .substr(AFTER_DOT, ID_SIZE)
    .toUpperCase()
}

async function createGame({ name, scoringMode, scoreOnZeroBets, forceEqualBets, forceUnequalBets }) {
  const gameKey = generateKey()

  // TODO: check if key is unique

  // TODO: send info to server
  const game = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...state.game,
        key: gameKey,
        name: name || gameKey,
        scoringMode,
        scoreOnZeroBets,
        forceEqualBets,
        forceUnequalBets,
      })
    }, 1000)
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
