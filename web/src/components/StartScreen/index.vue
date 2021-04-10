<template>
  <v-col md="6">
    <v-card outlined elevation="8" max-width="780px">
      <v-card-title class="d-block text-center">
        O que deseja fazer?
      </v-card-title>
      <v-card-text>
        <template v-if="inputVisible">
          <v-text-field
            label="Identificador do Jogo"
            class="centeredInput large mono upper mb-2"
            rounded filled single-line autofocus
            color="success"
            v-model="gameId"
            @keyup.enter="fetchGame"
          />
          <v-btn
            class="mb-4"
            color="success"
            x-large block rounded
            :disabled="isLoading || fetchGame.length < 6"
            :locading="isLoading"
            @click="fetchGame"
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
            @click="inputVisible = true"
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
import { mapGetters } from 'vuex'

export default {
  name: 'StartScreen',

  data: () => ({
    gameId: '',
    inputVisible: false,
  }),

  computed: {
    ...mapGetters(['isLoading']),
  },

  methods: {
    async fetchGame() {
      try {
        await this.$store.dispatch('fetchGame', this.gameId.toUpperCase())
        this.$router.push({
          name: 'invite',
          params: { game: this.$store.state.game.id },
        })
      } catch (e) {
        /* TODO: display error */
      }
    },
  },
}
</script>

<style scoped>
</style>
