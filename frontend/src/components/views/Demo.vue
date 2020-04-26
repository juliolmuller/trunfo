<template>
  <div>
    <v-tooltip right>
      <template v-slot:activator="{ on }">
        <v-btn
          href="https://github.com/juliolmuller/trunfo"
          icon
          large
          target="_blank"
          v-on="on"
        >
          <v-icon large>mdi-code-tags</v-icon>
        </v-btn>
      </template>
      <span>Código-Fonte</span>
    </v-tooltip>
    <v-tooltip right>
      <template v-slot:activator="{ on }">
        <v-btn
          href="https://codepen.io/johnjleider/pen/aezMOO"
          icon
          large
          target="_blank"
          v-on="on"
        >
          <v-icon large>mdi-codepen</v-icon>
        </v-btn>
      </template>
      <span>Codepen</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
