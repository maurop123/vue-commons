<template>
  <v-app>
    <v-content>
      <v-layout>
        <v-flex class="my-5"
          md4 offset-md4
          sm6 offset-sm3
        >
          <MediumEditor v-model="text" />
        </v-flex>
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
    }
  },
  mounted() {
    db.push('/', { foo: 'bar' }).subscribe(p => {
      console.log('p', p)
    })
  },
}
</script>
