<template>
  <v-col md="6">
    <v-card outlined elevation="8" max-width="780px">
      <v-card-title class="d-block text-center">
        O que deseja fazer?
      </v-card-title>
      <v-card-text>
        <template v-if="isInputVisible">
          <v-text-field
            label="Identificador do Jogo"
            class="centeredInput large mono upper mb-2"
            rounded filled single-line autofocus
            color="success"
            v-model="gameKey"
            @keyup.enter="handleFindGame"
          />
          <v-btn
            class="mb-4"
            color="success"
            x-large block rounded
            :disabled="isLoading || gameKey.length < 6"
            :locading="isLoading"
            @click="handleFindGame"
          >
            <v-icon left>mdi-location-enter</v-icon>
            Entrar
          </v-btn>
        </template>
        <template v-else>
          <v-btn
            class="mb-4"
            color="success"
            x-large block rounded
            @click="isInputVisible = true"
          >
            <v-icon left>mdi-location-enter</v-icon>
            Entrar em um Jogo
          </v-btn>
        </template>
        <v-btn
          class="mb-4"
          color="error"
          x-large block rounded
          :to="{ name: 'create' }"
        >
          <v-icon left>mdi-plus-thick</v-icon>
          Criar um Novo Jogo
        </v-btn>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import { ref, watch } from '@vue/composition-api'
import { useGame, useNotification } from '@/store'

const KEY_MAX_LENGTH = 6

export default {
  name: 'StartScreen',

  setup(_, { root }) {
    const { findGame } = useGame()
    const { notify } = useNotification()
    const isInputVisible = ref(false)
    const isLoading = ref(false)
    const gameKey = ref('')

    watch(gameKey, (value) => {
      gameKey.value = value.toUpperCase().substring(0, KEY_MAX_LENGTH)
    })

    async function handleFindGame() {
      if (gameKey.value.length < KEY_MAX_LENGTH) {
        return
      }

      try {
        isLoading.value = true
        await findGame(gameKey.value.toUpperCase())

        // TODO: define next route
        root.$router.push({
          name: 'invite',
          params: { gameKey: gameKey.value },
        })
      } catch (error) {
        isLoading.value = false
        notify(error)
      }
    }

    return {
      gameKey,
      isLoading,
      isInputVisible,
      handleFindGame,
    }
  },
}
</script>

<style scoped>
</style>
