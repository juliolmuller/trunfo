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
          :disabled="isLoading"
          v-model.trim="$store.state.game.name"
        />

        <v-radio-group
          label="Modo de Pontuação"
          class="mt-0 pt-0"
          :disabled="isLoading"
          v-model="$store.state.game.scoringMode"
        >
          <v-radio
            color="error"
            label="Multiplicação pelo número de apostas"
            value="byBetsCount"
          />
          <v-radio
            color="error"
            label="Simplificada (acertos vs erros)"
            value="simplified"
          />
        </v-radio-group>

        <v-switch
          color="error"
          label="Pontuar em acertos com nenhuma aposta"
          :disabled="isLoading"
          v-model="$store.state.game.scoreOnZeroBets"
        />

        <v-switch
          color="error"
          label="Quantidade total de apostas sempre diferente do número de rodadas"
          :disabled="isLoading || $store.state.game.forceUnequalBets"
          v-model="$store.state.game.forceEqualBets"
        />

        <v-switch
          color="error"
          label="Quantidade total de apostas sempre igual ao número de rodadas"
          :disabled="isLoading || $store.state.game.forceEqualBets"
          v-model="$store.state.game.forceUnequalBets"
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
              @click="createGame"
            >Próximo</v-btn>
          </v-col>
          <v-col cols="12" sm="5" lg="4" order-sm="1" class="mt-2">
            <v-btn
              color="secondary"
              block rounded text large
              :to="{ name: 'start' }"
            >Cancelar</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: 'NewGameScreen',

  data: () => ({
    isLoading: false,
  }),

  methods: {
    async createGame() {
      try {
        this.isLoading = true
        await this.$store.dispatch('createGameMatch')
        this.$router.replace({
          name: 'invite',
          params: { game: this.$store.state.game.id },
        })
      } catch (error) {
        this.$store.dispatch('notify', error)
        this.isLoading = false
      }
    },
  },
}
</script>

<style>
.v-btn.secondary--text.theme--dark > .v-btn__content:not(:disabled) {
  color: white;
}
</style>
