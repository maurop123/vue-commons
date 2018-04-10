<template>
  <v-layout class="section-layout">
    <slot />
  </v-layout>
</template>

<script>
  export default {
    name: 'horizontal-scroller',
  }
</script>

<style scoped>
  .section-layout {
    overflow: auto;
  }

  .section-layout::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #F5F5F5;
  }

  .section-layout::-webkit-scrollbar {
    width: 12px;
    background-color: #F5F5F5;
  }

  .section-layout::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: lightgrey;
  }
</style>
