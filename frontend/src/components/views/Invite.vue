<template>
  <v-col md="6">
    <v-card outlined elevation="8" max-width="780px">
      <v-card-title primary-title>
        <h1>{{ game }}</h1>
      </v-card-title>
    </v-card>
  </v-col>
</template>

<script>
export default {

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
  },
}
</script>

<style>

</style>
