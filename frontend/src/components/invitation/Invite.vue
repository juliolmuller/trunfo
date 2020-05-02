<template>
  <v-col md="6">
    <v-card outlined elevation="8" max-width="960px">
      <v-row>
        <v-col cols="12" md="6" class="d-flex align-center justify-center">
          <div>
            <v-img :src="qrCode" aspect-ratio="1.5" contain class="mt-4" />
            <div class="text-center title mt-2">Identificador:</div>
            <div id="gameId"><code>{{ game }}</code></div>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Nome do jogador"
            class="centeredInput"
            rounded filled single-line
            color="error"
            v-model.trim="playerName"
            v-if="inputVisible"
            @keyup.enter="addPlayer"
            autofocus
          />
          <v-btn block rounded color="error" @click="addPlayer" v-if="inputVisible">
            <v-icon class="mr-3">mdi-checkbox-marked-circle</v-icon>
            Adicionar
          </v-btn>
          <v-btn block rounded text @click="inputVisible = true" v-else>
            <v-icon class="mr-3">mdi-plus-circle-outline</v-icon>
            Adicionar Jogador
          </v-btn>
          <v-list rounded dense>
            <v-list-item-group>
              <v-list-item inactive class="text-center">
                <v-list-item-avatar class="mr-0">
                  <v-img src="@/assets/loading.svg" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <span class="body-2 grey--text">Aguardando jogadores...</span>
                </v-list-item-content>
              </v-list-item>
              <draggable
                class="list-group"
                v-model="players"
                handle=".mdi-drag"
                v-bind="dragOptions"
                @start="drag = true"
                @end="drag = false"
              >
                <transition-group type="transition" :name="!drag ? 'flip-list' : null">
                  <v-list-item
                    class="font-weight-bold list-group-item"
                    v-for="player in players"
                    :key="player"
                  >
                    <v-list-item-content>
                    <div class="d-flex justify-space-between">
                      <span>
                        <v-icon>mdi-drag</v-icon>
                        {{ player }}
                      </span>
                      <v-icon small @click.stop="removePlayer(player)">mdi-close-circle</v-icon>
                    </div>
                    </v-list-item-content>
                  </v-list-item>
                </transition-group>
              </draggable>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-col cols="8" offset="2" md="4" offset-md="4">
          <v-btn
            color="success"
            class="mx-auto"
            rounded block large
            :disabled="players.length < 2"
            :to="{ name: 'game', params: { game } }"
          >Pronto</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>

<script>
import Draggable from 'vuedraggable'

export default {

  components: {
    Draggable,
  },

  data: () => ({
    playerName: '',
    inputVisible: false,
    players: [
      'Julio, o bão!', 'Jordana',
      'Elisa', 'Renato', 'Texa',
      'Tina', 'Acácio', 'Ramon',
    ],
    drag: false,
  }),

  props: {
    game: {
      type: String,
      required: true,
    },
  },

  computed: {
    qrCode() {
      const size = 480
      const api = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=`
      const url = `${window.location.origin + window.location.pathname}#/jogo-${this.game}`
      return api + url
    },
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      }
    },
  },

  methods: {
    addPlayer() {
      if (this.playerName) {
        console.log(`New player submitted: ${this.playerName}`)
        this.players.unshift(this.playerName)
      }
      this.inputVisible = false
      this.playerName = ''
    },
    removePlayer(name) {
      this.players = this.players.filter((player) => player !== name)
    },
  },
}
</script>

<style scoped>
#gameId {
  margin-bottom: 0.5em;
  line-height: 80%;
  text-align: center;
  font-size: 3.5em;
  font-weight: bolder;
}

.centeredInput >>> .v-text-field__slot label {
  width: 100%;
  margin-left: 5%;
  text-align: center;
}

.centeredInput >>> .v-text-field__slot input {
  color: #333;
  text-align: center;
}

.centeredInput >>> .v-text-field__slot input::selection {
  background-color: #f44336;
  color: white;;
}

.centeredInput >>> .v-text-field__details {
  display: none;
}

.list-group-item {
  cursor: auto;
}

.list-group-item .mdi-drag {
  cursor: move;
}

.list-group-item .mdi-close-circle {
  cursor: pointer;
}

/* draggable animation */
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
</style>
