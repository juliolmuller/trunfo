import { useLocalStorage as useStorage } from '@vueuse/core'

const STORAGE_KEY_PREFIX = process.env.VUE_APP_STORAGE_KEY_PREFIX

function useGameStorage(storageKey) {
  const gamesSet = useStorage(storageKey, [], {
    listenToStorageChanges: false,
    deep: true,
  })

  function findIndex(gameKey) {
    return gamesSet.value.findIndex((game) => game.gameKey === gameKey)
  }

  function find(gameKey) {
    const index = findIndex(gameKey)

    return gamesSet.value[index] ?? null
  }

  function add(gameKey, playerName) {
    const newGame = { gameKey, playerName }
    const index = findIndex(gameKey)

    if (index > -1) {
      gamesSet.value[index] = newGame
    } else {
      gamesSet.value.push(newGame)
    }
  }

  function remove(gameKey) {
    const index = findIndex(gameKey)

    if (index > -1) {
      gamesSet.value.splice(index, 1)
    }
  }

  return {
    add,
    remove,
    find,
  }
}

const adminGames = useGameStorage(`${STORAGE_KEY_PREFIX}admin-games`)
const playerGames = useGameStorage(`${STORAGE_KEY_PREFIX}admin-games`)

export {
  adminGames,
  playerGames,
}
