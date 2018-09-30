<template>
  <v-app>
    <v-content>
      <v-layout>
        <v-flex class="my-5"
          md4 offset-md4
          sm6 offset-sm3
        >
          <MediumEditor />
        </v-flex>
      </v-layout>
    </v-content>
  </v-app>
</template>

<script>
import MediumEditor from './components/MediumEditor.vue'
import defComp from './components'

console.log('defComp', defComp)

export default {
  name: 'app',
  components: {
    MediumEditor,
  }
}
</script>
