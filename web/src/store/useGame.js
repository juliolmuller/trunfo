import { onMounted, onUnmounted, reactive, readonly } from '@vue/composition-api'
import { adminGames, playerGames } from '@/services/storage'
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
  get isAdmin() {
    return Boolean(adminGames.find(this.key))
  },
  get isPlayer() {
    return Boolean(playerGames.find(this.key))
  },
})

async function createGame(data) {
  const game = await gameService.create({
    ...data,
    status: 'RegisteringPlayers',
  })

  Object.assign(state, game)
  adminGames.add(game.key)
}

async function findGame(gameKey) {
  const game = await gameService.get(gameKey)

  Object.assign(state, game)
}

// TODO: send info to server
function resumeGame() {
  throw new Error('Action pending implementation.')
}

async function addPlayer(playerName) {
  await gameService.patch(state.key, {
    player: playerName,
    action: 'ADD',
  })

  if (!state.isAdmin) {
    playerGames.add(state.key, playerName)
  }
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
      if (action === 'ADD' && state.isAdmin) {
        state.players.push(player)
      } else if (action === 'REMOVE' && state.isAdmin) {
        const index = state.players.findIndex(({ name }) => name === player.name)
        index > -1 && state.players.splice(index, 1)
      } else if (action === 'REMOVE' && state.isPlayer) {
        playerGames.remove(state.key)
      }
    })
  })

  onUnmounted(() => {
    gameService.removeListener(EVENT_NAME)
  })
}

function useGame() {
  return {
    createGame,
    findGame,
    resumeGame,
    addPlayer,
    removePlayer,
    onChangePlayer,
    game: readonly(state),
    players: state.players,
  }
}

export default useGame
