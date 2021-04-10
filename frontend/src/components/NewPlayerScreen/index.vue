<template>
  <v-col md="6" lg="4">
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
          @keyup.enter="joinGame"
        />
        <v-btn
          color="error"
          x-large block rounded
          :disabled="isLoading || playerName.length === 0"
          :loading="isLoading"
          @click="joinGame"
        >
          <v-icon left>mdi-checkbox-marked-circle</v-icon>
          Pronto
        </v-btn>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NewPlayerScreen',

  data: () => ({
    playerName: '',
  }),

  computed: {
    ...mapGetters(['isLoading']),
  },

  methods: {
    async joinGame() {
      await this.$store.dispatch('joinGame', this.playerName)
      this.$router.push({
        name: 'game',
        params: { game: this.$store.state.game.id },
      })
    },
  },
}
</script>

<style scoped>
</style>
