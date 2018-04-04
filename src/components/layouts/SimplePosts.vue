<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4>
        <slot name="header" />
        <slot name="posts" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'simple-posts-layout',
  }
</script>
