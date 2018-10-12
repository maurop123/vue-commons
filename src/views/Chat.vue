<template lang="pug">
  chat-app
    v-layout(column align-center)
      v-flex HI
</template>

<script>
  import ChatApp from '@/components/ChatApp'

  export default {
    name: 'chat-view',
    components: {
      ChatApp,
    },
    data() {
      return {
        text: '',
      }
    },
  }
</script>
