<template>
  <v-col md="6">
    <div class="text-center">
      <v-img src="@/assets/loading.svg" aspect-ratio="6" contain />
      <div class="headline font-weight-bold mt-6 mt-md-4">
        {{ status }}...
      </div>
    </div>
  </v-col>
</template>

<script>
import { computed } from '@vue/composition-api'
import { useGame } from '@/store'

export default {
  name: 'LoadingScreen',

  setup() {
    const { game } = useGame()

    const status = computed(() => {
      switch (game.status) {
        case 'RegisteringPlayers':
          return 'Registrando jogadores'
        case 'ConfiguringPlay':
          return 'Iniciando rodada de apostas'
        case 'PlayersBetting':
          return 'Coletando apostas'
        case 'CountingHits':
          return 'Contabilizando pontuação'
        default:
          return 'Carregando jogo'
      }
    })

    return { status }
  },
}
</script>

<style>

</style>
