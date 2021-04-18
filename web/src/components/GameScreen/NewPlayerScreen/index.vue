<template>
  <LoadingScreen v-if="isRegistered" />
  <v-col md="6" lg="4" v-else>
    <v-card outlined elevation="8">
      <v-card-title class="d-block text-center">
        Quem é você?
      </v-card-title>

      <v-card-text>
        <v-text-field
          label="Nome do jogador"
          class="centeredInput large"
          rounded filled single-line autofocus
          color="error"
          v-model.trim="playerName"
          @keyup.enter="handleAddPlayer"
        />

        <v-btn
          color="error"
          x-large block rounded
          :disabled="isLoading || playerName.length === 0"
          :loading="isLoading"
          @click="handleAddPlayer"
        >
          <v-icon left>mdi-checkbox-marked-circle</v-icon>
          Pronto
        </v-btn>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import { computed, ref } from '@vue/composition-api'
import LoadingScreen from '../LoadingScreen'
import { useGame, useNotification } from '@/store'

export default {
  name: 'NewPlayerScreen',

  components: {
    LoadingScreen,
  },

  setup() {
    const { notify } = useNotification()
    const { game, addPlayer, onChangePlayer } = useGame()
    const isRegistered = computed(() => game.isPlayer)
    const isLoading = ref(false)
    const playerName = ref('')

    async function handleAddPlayer() {
      if (isLoading.value) {
        return
      }

      try {
        isLoading.value = true
        await addPlayer(playerName.value)
        playerName.value = ''
      } catch (error) {
        notify(error)
      } finally {
        isLoading.value = false
      }
    }

    onChangePlayer()

    return {
      isLoading,
      playerName,
      isRegistered,
      handleAddPlayer,
    }
  },
}
</script>

<style scoped>
</style>
