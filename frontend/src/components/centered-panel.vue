<template>
  <v-card class="elevation-12">
    <v-toolbar color="green darken-3" dark flat>
      <v-toolbar-title>
        {{ title }}
      </v-toolbar-title>
      <v-spacer />
      <v-tooltip right>
        <template v-slot:activator="{ on }">
          <v-btn icon large href="https://codepen.io/johnjleider/pen/pMvGQO" target="_blank" v-on="on">
            <v-icon>mdi-code-tags</v-icon>
          </v-btn>
        </template>
        <span>Codepen</span>
      </v-tooltip>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          type="text"
          label="Login"
          prepend-icon="mdi-account"
          color="green darken-3"
        />
        <v-text-field
          type="password"
          label="Senha"
          prepend-icon="mdi-lock"
          color="green darken-3"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="green darken-3" dark>
        Acessar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
</style>
