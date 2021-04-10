<template>
  <v-col md="6" v-if="$store.getters.isLoading">
    <div class="text-center">
      <v-img src="@/assets/loading.svg" aspect-ratio="6" contain />
      <div class="headline font-weight-bold mt-6 mt-md-4">
        Aguarde a inicialização do jogo...
      </div>
    </div>
  </v-col>
</template>

<script>
export default {
  name: 'GameScreen',

  beforeCreate() {
    this.$store.commit('setLoading', true)
  },

  destroyed() {
    this.$store.commit('setLoading', false)
  },
}
</script>

<style scoped>
</style>
