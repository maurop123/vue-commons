<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md3 class="mt-8">
        <slot name="side" />
      </v-flex>
      <v-flex xs12 md9>
        <slot name="posts" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'vert-split-posts-layout',
  }
</script>

<style scoped>
  .mt-8 {
    margin-top: 160px !important;
  }
</style>
