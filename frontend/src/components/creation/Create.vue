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
          v-model.trim="game.name"
        />
        <v-radio-group
          label="Modo de Pontuação"
          class="mt-0 pt-0"
          v-model="game.scoringMode"
        >
          <v-radio
            color="error"
            label="Considerar número de apostas"
            value="byBetsCount"
          />
          <v-radio
            color="error"
            label="Pontuação simples em Acertos/Erros"
            value="single"
          />
        </v-radio-group>
        <v-switch
          color="error"
          label="Pontuar em acertos com nenhuma aposta"
          v-model="game.scoreOnZeroBets"
        />
        <v-switch
          color="error"
          label="Número de apostas sempre diferente do número de rodadas"
          :disabled="game.forceUnequalBets"
          v-model="game.forceEqualBets"
        />
        <v-switch
          color="error"
          label="Número de apostas sempre igual do número de rodadas"
          :disabled="game.forceEqualBets"
          v-model="game.forceUnequalBets"
        />
        <hr class="d-none d-md-block mb-2" />
        <v-row justify="space-around" no-gutters>
          <v-col cols="12" sm="5" lg="4" order-sm="2" class="mt-2">
            <v-btn
              color="error"
              block rounded large
              :loading="isLoading"
              @click="createGame"
            >Próximo</v-btn>
          </v-col>
          <v-col cols="12" sm="5" lg="4" order-sm="1" class="mt-2">
            <v-btn
              :to="{ name: 'start' }"
              color="secondary"
              block rounded text large
            >Cancelar</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {

  data: () => ({
    isLoading: false,
    game: {
      name: '',
      scoringMode: 'byBetsCount',
      scoreOnZeroBets: false,
      forceEqualBets: false,
      forceUnequalBets: false,
    },
  }),

  methods: {
    createGame() {
      // Generate random ID for this game
      // eslint-disable-next-line no-magic-numbers
      const id = Math.random().toString(36).substr(2, 6).toUpperCase()
      this.isLoading = true
      console.log({ id, ...this.game })
      setTimeout(() => {
        this.$router.push({ name: 'invite', params: { game: id } })
      }, 1200)
    },
  },
}
</script>

<style scoped>
</style>
