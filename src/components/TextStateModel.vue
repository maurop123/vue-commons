<template lang="pug">
  state-model(v-bind="{ stateProp }")
    v-text-field(
      slot-scope="{ value, input }"
      :value="value" @input="input"
      v-bind="$attrs"
    )
</template>

<script>
  import StateModel from '@/components/StateModel'

  export default {
    name: 'text-state-model',
    props: ['stateProp'],
    inheritAttrs: false,
    components: {
      StateModel,
    },
  }
</script>
