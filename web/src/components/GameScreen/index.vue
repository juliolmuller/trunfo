<template>
  <v-col md="6" v-if="isLoading">
    <div class="text-center">
      <v-img src="@/assets/loading.svg" aspect-ratio="6" contain />
      <div class="headline font-weight-bold mt-6 mt-md-4">
        Aguarde a inicialização do jogo...
      </div>
    </div>
  </v-col>
  <component :is="activeScreen" v-else />
</template>

<script>
import { ref } from '@vue/composition-api'
import NewPlayerScreen from './NewPlayerScreen'
import WaitingAreaScreen from './WaitingAreaScreen'

export default {
  name: 'GameScreen',

  components: {
    NewPlayerScreen,
    WaitingAreaScreen,
  },

  setup() {
    const isLoading = ref(true)
    const activeScreen = ref('WaitingAreaScreen')

    return {
      isLoading,
      activeScreen,
    }
  },
}
</script>
