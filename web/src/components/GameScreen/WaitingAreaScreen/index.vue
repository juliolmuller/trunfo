<template>
  <v-col sm="8" md="6">
    <v-card outlined elevation="8" max-width="960px" class="py-6">
      <v-row>
        <v-col cols="12" lg="6" class="d-flex align-center justify-center">
          <div>
            <v-img :src="qrCode" aspect-ratio="1.2" contain class="mt-4" />
            <div class="text-center title my-2">Chave do Jogo:</div>
            <div id="gameKey"><code>{{ gameKey }}</code></div>
          </div>
        </v-col>

        <v-col cols="12" lg="6">
          <div class="pa-2">
            <v-text-field
              label="Nome do jogador"
              class="centeredInput"
              rounded filled single-line autofocus
              color="error"
              v-model.trim="playerName"
              v-if="inputVisible"
              @keyup.enter="handleAddPlayer"
              @blur="inputVisible = false"
            />

            <v-btn
              v-if="inputVisible"
              @click="handleAddPlayer"
              color="error"
              rounded
              block
            >
              <v-icon class="mr-3">mdi-checkbox-marked-circle</v-icon>
              Adicionar
            </v-btn>

            <v-btn
              v-else
              @click="inputVisible = true"
              rounded
              block
              text
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
                v-model="players"
                handle=".mdi-drag"
                class="list-group"
                ghostClass="ghost"
                group="description"
                :animation="200"
                :disabled="false"
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
                      <v-icon
                        small
                        @click.stop="handleRemovePlayer(player)"
                        title="Expulsar"
                      >mdi-close-circle</v-icon>
                    </div>
                    </v-list-item-content>
                  </v-list-item>
                </transition-group>
              </Draggable>
            </v-list-item-group>
          </v-list>
        </v-col>

        <v-col cols="8" offset="2" md="4" offset-md="4" class="mb-2">
          <v-btn
            color="success"
            class="mx-auto"
            rounded block large
            :loading="isLoading"
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
import { computed, onMounted, ref } from '@vue/composition-api'
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
    const { addPlayer, removePlayer, findGame, resumeGame, players } = useGame()
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

    function handleAddPlayer() {
      addPlayer(playerName.value)
      inputVisible.value = false
      playerName.value = ''
    }

    async function handleRemovePlayer(selectedPlayerName) {
      if (confirm(`Tem certeza de que deseja expulsar o jogador "${playerName}"?`)) {
        await removePlayer(selectedPlayerName)
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

    onMounted(() => findGame(gameKey))

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
