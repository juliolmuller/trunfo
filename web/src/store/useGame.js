import { onMounted, onUnmounted, reactive, readonly } from '@vue/composition-api'
import { gameService } from '@/services/feathers'

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
  const game = await gameService.create({
    ...data,
    status: 'RegisteringPlayers',
  })

  Object.assign(state, game)
}

async function findGame(gameKey) {
  const game = await gameService.get(gameKey)

  Object.assign(state, game)
}

function resumeGame() {
  // TODO: send info to server
  throw new Error('Action pending implementation.')
}

async function addPlayer(playerName) {
  await gameService.patch(state.key, {
    player: playerName,
    action: 'ADD',
  })
}

async function removePlayer(playerName) {
  await gameService.patch(state.key, {
    player: playerName,
    action: 'REMOVE',
  })
}

function onChangePlayer() {
  const EVENT_NAME = 'patched'

  onMounted(() => {
    gameService.on(EVENT_NAME, ({ action, ...player }) => {
      switch (action) {
        case 'ADD':
          state.players.push(player)
          break
        case 'REMOVE':
          // eslint-disable-next-line no-case-declarations
          const index = state.players.findIndex(({ name }) => name === player.name)
          index > -1 && state.players.splice(index, 1)
          break
        default:
          /* do nothing */
      }

    })
  })

  onUnmounted(() => {
    console.log('onUnmounted')
    gameService.removeListener(EVENT_NAME)
  })
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
    onChangePlayer,
  }
}

export default useGame
