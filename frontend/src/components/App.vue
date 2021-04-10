<template>
  <v-app id="trunfo">
    <AppNavigation v-model="drawer" />
    <AppHeader v-model="drawer" />

    <v-content>
      <v-container fill-height>
        <v-row justify="center" align="center">
          <router-view />
        </v-row>
      </v-container>
    </v-content>

    <AppFooter />
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
</style>
