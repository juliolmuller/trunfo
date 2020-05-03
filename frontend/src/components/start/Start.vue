<template>
  <v-col md="6">
    <v-card outlined elevation="8" max-width="780px">
      <v-card-title class="d-block text-center">
        <span class="headline font-weight-bold py-8">
          O que deseja fazer?
        </span>
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="Identificador do Jogo"
          class="centeredInput large mono upper mb-2"
          rounded filled single-line autofocus
          color="success"
          v-model="gameId"
          v-show="inputVisible"
          @keyup.enter="grantAccess"
        />
        <v-btn x-large block rounded color="success" class="mb-4" @click="enterGame">
          <v-icon class="mr-3">mdi-location-enter</v-icon>
          <span v-if="inputVisible">Entrar</span>
          <span v-else>Entrar em um Jogo</span>
        </v-btn>
        <v-btn x-large block rounded color="error" class="mb-4" :to="{ name: 'create' }">
          <v-icon class="mr-3">mdi-plus-thick</v-icon>
          <span>Criar um Novo Jogo</span>
        </v-btn>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {

  data: () => ({
    gameId: '',
    inputVisible: false,
  }),

  methods: {
    enterGame() {
      if (this.inputVisible) {
        this.grantAccess()
      } else {
        this.inputVisible = true
        this.$nextTick(() => this.$refs.centeredInput.focus())
      }
    },
    grantAccess() {
      console.log(`Code submitted: ${this.gameId}`)
    },
  },
}
</script>

<style scoped>
</style>
