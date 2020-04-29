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
          ref="enterGameInput"
          label="Identificador do Jogo"
          class="enterGameInput mb-2"
          rounded filled single-line
          color="success"
          type="tel"
          v-model="gameId"
          v-show="inputVisible"
          @focusout="inputVisible = false"
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
        this.$nextTick(() => this.$refs.enterGameInput.focus())
      }
    },
    grantAccess() {
      console.log(`Code submitted: ${this.gameId}`)
    },
  },
}
</script>

<style scoped>
.enterGameInput >>> .v-text-field__slot label {
  width: 100%;
  margin-left: 5%;
  text-align: center;
}

.enterGameInput >>> .v-text-field__slot input {
  height: 3em;
  color: #333;
  text-align: center;
  text-transform: uppercase;
  font-family: monospace;
  font-size: 2.6em;
}

.enterGameInput >>> .v-text-field__slot input::selection {
  background-color: #f44336;
  color: white;;
}

.enterGameInput >>> .v-text-field__details {
  display: none;
}
</style>
