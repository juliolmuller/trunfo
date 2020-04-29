<template>
  <v-app id="trunfo">
    <app-navigation v-model="drawer" />
    <app-header v-model="drawer" />

    <v-content>
      <v-container fill-height>
        <v-row justify="center" align="center">
          <router-view />
        </v-row>
      </v-container>
    </v-content>

    <app-footer />
  </v-app>
</template>

<script>
import AppNavigation from './components/layout/Navigation'
import AppHeader from './components/layout/Header'
import AppFooter from './components/layout/Footer'

export default {

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
</style>
