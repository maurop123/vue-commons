<template>
  <v-container fluid grid-list-xl
    class="trim">
    <v-layout>
      <slot />
    </v-layout>
  </v-container>
</template>

<style scoped>
  .trim {
    padding: 0;
  }
</style>
