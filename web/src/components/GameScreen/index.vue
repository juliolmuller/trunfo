<template>
  <component :is="activeScreen" :gameKey="gameKey" />
</template>

<script>
import { computed, onMounted, ref } from '@vue/composition-api'
import WaitingAreaScreen from './WaitingAreaScreen'
import NewPlayerScreen from './NewPlayerScreen'
import LoadingScreen from './LoadingScreen'
import { useGame } from '@/store'

export default {
  name: 'GameScreen',

  components: {
    LoadingScreen,
    NewPlayerScreen,
    WaitingAreaScreen,
  },

  props: {
    gameKey: {
      type: String,
      required: true,
    },
  },

  setup({ gameKey }) {
    const { game, findGame } = useGame()
    const isLoading = ref(true)

    const activeScreen = computed(() => {
      switch (game.status) {
        case 'RegisteringPlayers':
          return WaitingAreaScreen.name
        case '':
          return NewPlayerScreen.name
        default:
          return LoadingScreen.name
      }
    })

    onMounted(() => findGame(gameKey))

    return {
      isLoading,
      activeScreen,
    }
  },
}
</script>
