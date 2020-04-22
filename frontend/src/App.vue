<template>
  <v-app id="app" style="background:#e52d27;background:linear-gradient(to right,#b31217,#e52d27);">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <centered-panel :title="panelTitle" />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import CenteredPanel from './components/centered-panel'

export default {

  components: {
    CenteredPanel,
  },

  data: () => ({
    panelTitle: 'Formulário Centralizado',
  }),
}
</script>

<style>
.v-application {
  background: #e52d27;
  background: -webkit-linear-gradient(to right, #b31217, #e52d27);
  background: linear-gradient(to right, #b31217, #e52d27);
}
</style>
