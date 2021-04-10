<template>
  <v-navigation-drawer :value="value" @input="$emit('input', $event)" app right temporary clipped>
    <v-list dense>
      <v-list-item link>
        <v-list-item-action>
          <v-icon>mdi-cog</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Configurações</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-list-item-action>
          <v-icon>mdi-brightness-6</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Tema {{ $vuetify.theme.dark ? 'Claro' : 'Escuro' }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'TheNavigation',

  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
}
</script>
