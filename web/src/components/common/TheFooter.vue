<template>
  <v-footer>
    <span class="mx-auto my-4">
      <strong>LacusSoft</strong> &copy; {{ currentYear }}
    </span>
  </v-footer>
</template>

<script>
export default {
  name: 'TheFooter',

  setup() {
    return {
      currentYear: new Date().getFullYear(),
    }
  },
}
</script>
