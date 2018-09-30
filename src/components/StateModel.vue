<template lang="pug">
  div
    slot(:value="value" :input="setValue")
</template>

<script>
export default {
  name: 'state-model',
  props: ['stateProp'],
  computed: {
    value() {
      return this.stateProp.split('.')
      .reduce((v,k) => v[k], this.$store.state)
    },
  },
  methods: {
    setValue(val) {
      this.$store.commit('setState', {
        key: this.stateProp, val
      })
    },
  },
}
</script>
