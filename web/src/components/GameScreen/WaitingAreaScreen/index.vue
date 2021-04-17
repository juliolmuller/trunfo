<template>
  <v-col sm="12">
    <v-card outlined elevation="12" max-width="640px" class="mx-auto py-6">
      <v-row>
        <v-col cols="12" sm="5" class="d-flex align-center justify-center">
          <div class="mt-5">
            <v-img :src="qrCode" aspect-ratio="1.0" contain />
            <div class="text-center title mt-5 mb-2">Chave do Jogo:</div>
            <div id="gameKey"><code>{{ gameKey }}</code></div>
          </div>
        </v-col>

        <v-col cols="12" sm="7">
          <div class="pa-2" @blur="inputVisible = false">
            <v-text-field
              label="Nome do jogador"
              class="centeredInput"
              rounded filled single-line autofocus
              color="error"
              @keyup.enter="handleAddPlayer"
              v-model.trim="playerName"
              v-if="inputVisible"
            />

            <v-btn
              block
              rounded
              color="error"
              :loading="isLoading"
              @click="handleAddPlayer"
              v-if="inputVisible"
            >
              <v-icon class="mr-3">mdi-checkbox-marked-circle</v-icon>
              Adicionar
            </v-btn>

            <v-btn
              text
              block
              rounded
              @click="inputVisible = true"
              v-else
            >
              <v-icon class="mr-3">mdi-plus-circle-outline</v-icon>
              Adicionar Jogador
            </v-btn>
          </div>

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
              <Draggable
                handle=".mdi-drag"
                class="list-group players"
                ghostClass="ghost"
                group="description"
                :animation="200"
                :disabled="false"
                @start="drag = true"
                @end="drag = false"
                v-model="players"
              >
                <transition-group type="transition" :name="!drag ? 'flip-list' : null">
                  <v-list-item
                    class="font-weight-bold list-group-item"
                    v-for="player in players"
                    :key="player.name"
                  >
                    <v-list-item-content>
                      <div class="d-flex justify-space-between">
                        <span>
                          <v-icon>mdi-drag</v-icon>
                          {{ player.name }}
                        </span>
                        <v-icon
                          small
                          title="Expulsar"
                          @click.stop="handleRemovePlayer(player.name)"
                        >mdi-close-circle</v-icon>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </transition-group>
              </Draggable>
            </v-list-item-group>
          </v-list>
        </v-col>

        <v-col cols="8" offset="2" sm="4" offset-sm="4" class="mb-2">
          <v-btn
            color="success"
            class="mx-auto"
            rounded block large
            :loading="!inputVisible && isLoading"
            :disabled="players.length < 2"
            @click.prevent="handleResumeGame"
          >Pronto</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>

<script>
import Draggable from 'vuedraggable'
import { computed, ref } from '@vue/composition-api'
import { useGame, useNotification } from '@/store'

export default {
  name: 'WaitingAreaScreen',

  components: {
    Draggable,
  },

  props: {
    gameKey: {
      type: String,
      required: true,
    },
  },

  setup({ gameKey }, { root }) {
    const { players, addPlayer, removePlayer, resumeGame, onChangePlayer } = useGame()
    const { notify } = useNotification()
    const playerName = ref('')
    const inputVisible = ref(false)
    const isLoading = ref(false)
    const drag = ref(false)

    const qrCode = computed(() => {
      const size = 480
      const { origin, pathname } = window.location
      const url = `${origin}${pathname}#/jogo-${gameKey}/registrar`

      return `https://api.qrserver.com/v1/create-qr-code?size=${size}x${size}&data=${url}`
    })

    async function handleAddPlayer() {
      if (isLoading.value) {
        return
      }

      try {
        isLoading.value = true
        await addPlayer(playerName.value)
        inputVisible.value = false
        playerName.value = ''
      } catch (error) {
        notify(error)
      } finally {
        isLoading.value = false
      }
    }

    async function handleRemovePlayer(selectedPlayerName) {
      if (confirm(`Tem certeza de que deseja expulsar o jogador "${playerName}"?`)) {
        try {
          await removePlayer(selectedPlayerName)
        } catch (error) {
          notify(error)
        }
      }
    }

    async function handleResumeGame() {
      try {
        isLoading.value = true
        await resumeGame()
        root.$router.replace({
          name: 'game',
          params: { gameKey },
        })
      } catch (error) {
        isLoading.value = false
        notify(error)
      }
    }

    onChangePlayer()

    return {
      drag,
      qrCode,
      players,
      isLoading,
      playerName,
      inputVisible,
      handleAddPlayer,
      handleRemovePlayer,
      handleResumeGame,
    }
  },
}
</script>

<style scoped>
#gameKey {
  margin-bottom: 0.5em;
  line-height: 80%;
  text-align: center;
  font-size: 3.5em;
  font-weight: bolder;
}

@media (min-width: 600px) {
  .list-group.players {
    max-height: 50vh;
    overflow-y: auto;
  }
}

.list-group-item {
  cursor: auto;
}

.list-group-item .mdi-drag {
  cursor: move;
}

.list-group-item .mdi-close-circle {
  cursor: pointer;
  opacity: 0;
  transition: opacity 200ms;
}

.list-group-item:hover .mdi-close-circle {
  cursor: pointer;
  opacity: 1;
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
