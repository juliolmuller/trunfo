<template>
  <v-app-bar app clipped-right color="red" dense dark>
    <v-toolbar-title class="mr-12 align-center">
      <span class="title">Trunfo</span>
    </v-toolbar-title>
    <v-spacer />
    <v-app-bar-nav-icon @click.stop="$emit('input', !value)" />
  </v-app-bar>
</template>

<script>
export default {
  name: 'TheHeader',

  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style scoped>
</style>
