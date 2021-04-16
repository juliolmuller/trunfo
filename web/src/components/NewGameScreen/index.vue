<template>
  <v-col md="6">
    <v-card outlined elevation="8" max-width="780px">
      <v-card-title class="d-block text-center">
        Novo Jogo
      </v-card-title>

      <v-card-text>
        <v-text-field
          label="Nome do Jogo (opcional)"
          type="text"
          color="error"
          outlined
          autofocus
          :disabled="isLoading"
          v-model.trim="game.name"
        />

        <v-radio-group
          label="Modo de Pontuação"
          class="mt-0 pt-0"
          :disabled="isLoading"
          v-model="game.scoringMode"
        >
          <v-radio
            color="error"
            label="Multiplicação pelo número de apostas"
            value="MultiplyingBets"
          />
          <v-radio
            color="error"
            label="Simplificada (+10 para acertos e -10 para erros)"
            value="Simplified"
          />
        </v-radio-group>

        <v-switch
          color="error"
          label="Pontuar em acertos com nenhuma aposta"
          :disabled="isLoading"
          v-model="game.scoreOnZeroBets"
        />

        <v-switch
          color="error"
          label="Quantidade total de apostas sempre diferente do número de rodadas"
          :disabled="isLoading || game.forceUnequalBets"
          v-model="game.forceEqualBets"
        />

        <v-switch
          color="error"
          label="Quantidade total de apostas sempre igual ao número de rodadas"
          :disabled="isLoading || game.forceEqualBets"
          v-model="game.forceUnequalBets"
        />

        <br />
        <hr class="d-none d-md-block mb-2" />

        <v-row justify="space-around" no-gutters>
          <v-col cols="12" sm="5" lg="4" order-sm="2" class="mt-2">
            <v-btn
              color="error"
              large block rounded
              :disabled="isLoading"
              :loading="isLoading"
              @click="handleCreateGame"
            >Próximo</v-btn>
          </v-col>
          <v-col cols="12" sm="5" lg="4" order-sm="1" class="mt-2">
            <v-btn
              color="secondary"
              block rounded text large
              @click="$router.go(-1)"
            >Cancelar</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import { reactive, ref, toRaw } from '@vue/composition-api'
import { useGame, useNotification } from '@/store'

export default {
  name: 'NewGameScreen',

  setup(_, { root }) {
    const { createGame, game } = useGame()
    const { notify } = useNotification()
    const localGame = reactive(toRaw(game))
    const isLoading = ref(false)

    async function handleCreateGame() {
      try {
        isLoading.value = true
        await createGame(localGame)
        root.$router.replace({
          name: 'game',
          params: { gameKey: game.key },
        })
      } catch (error) {
        isLoading.value = false
        notify(error)
      }
    }

    return {
      isLoading,
      game: localGame,
      handleCreateGame,
    }
  },
}
</script>

<style>
.v-btn.secondary--text.theme--dark > .v-btn__content:not(:disabled) {
  color: white;
}
</style>
