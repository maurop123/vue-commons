<template>
  <v-app>
    <v-content>
      <v-layout column align-center>
        <MediumEditor
          v-model="text"
          :options="options"
        />
      </v-layout>
    </v-content>
  </v-app>
</template>

<script>
import MediumEditor from './components/MediumEditor'
import DB from './database'
const db = new DB({ ref: 'test' })

export default {
  name: 'app',
  components: {
    MediumEditor,
  },
  data() {
    return {
      text: '',
      options: {
        placeholder: {
          text: 'options test pass',
        },
      },
    }
  },
  mounted() {
    db.push('/', { foo: 'bar' }).subscribe(p => {
      console.log('p', p)
    })
  },
}
</script>
