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
          :disabled="isLoading"
          v-model="$store.state.game.scoreOnZeroBets"
        />
        <v-switch
          color="error"
          label="Número de apostas sempre diferente do número de rodadas"
          :disabled="isLoading || $store.state.game.forceUnequalBets"
          v-model="$store.state.game.forceEqualBets"
        />
        <v-switch
          color="error"
          label="Número de apostas sempre igual do número de rodadas"
          :disabled="isLoading || $store.state.game.forceEqualBets"
          v-model="$store.state.game.forceUnequalBets"
        />
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
import { mapGetters } from 'vuex'

export default {
  name: 'NewGameScreen',

  computed: {
    ...mapGetters(['isLoading']),
  },

  methods: {
    async createGame() {
      await this.$store.dispatch('createGame')
      this.$router.push({
        name: 'invite',
        params: { game: this.$store.state.game.id },
      })
    },
  },
}
</script>

<style scoped>
</style>
