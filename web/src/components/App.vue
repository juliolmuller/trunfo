<template>
  <v-app id="trunfo">
    <AppNavigation v-model="drawer" />
    <AppHeader v-model="drawer" />

    <v-main>
      <v-container fill-height>
        <v-row justify="center" align="center">
          <router-view />
        </v-row>
      </v-container>
    </v-main>

    <AppFooter />

    <v-snackbar
      :value="$store.getters.isNotifying"
      :color="$store.getters.notification.color"
      elevation="24"
      absolute top
    >
      {{ $store.getters.notification.message }}
    </v-snackbar>
  </v-app>
</template>

<script>
import AppNavigation from './common/TheNavigation'
import AppHeader from './common/TheHeader'
import AppFooter from './common/TheFooter'

export default {
  name: 'App',

  components: {
    AppNavigation,
    AppHeader,
    AppFooter,
  },

  data: () => ({
    drawer: false,
  }),
}
</script>

<style>
.centeredInput .v-text-field__slot label {
  width: 100%;
  margin-left: 5%;
  text-align: center;
}

.centeredInput .v-text-field__slot input {
  color: #333;
  text-align: center;
}

.centeredInput.large .v-text-field__slot input {
  height: 3em;
  font-size: 2.6em;
}

.centeredInput.mono .v-text-field__slot input {
  font-family: monospace;
}

.centeredInput.upper .v-text-field__slot input {
  text-transform: uppercase;
}

.centeredInput .v-text-field__slot input::selection {
  background-color: #f44336;
  color: white;;
}

.centeredInput .v-text-field__details {
  display: none;
}

.v-snack.v-snack--absolute {
  margin-top: 3.5rem;
  position: fixed;
  z-index: 100;
}
</style>
