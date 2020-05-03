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
          rounded filled single-line
          color="error"
          v-model.trim="playerName"
          @keyup.enter="addPlayer"
          autofocus
        />
        <v-btn block rounded x-large color="error" @click="addPlayer">
          <v-icon class="mr-3">mdi-checkbox-marked-circle</v-icon>
          Pronto
        </v-btn>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {

  data: () => ({
    playerName: '',
  }),

  methods: {
    addPlayer() {
      if (this.playerName) {
        console.log(`New player registerred: ${this.playerName}`)
      }
      this.playerName = ''
    },
  },
}
</script>

<style scoped>
</style>
