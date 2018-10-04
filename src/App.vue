<template lang="pug">
  v-app
    v-content
      app-toolbar
        v-layout(column align-center)
          MediumEditor(
            v-model="text"
            :options="options"
          )
</template>

<script>
import AppToolbar from './components/AppToolbar'
import MediumEditor from './components/MediumEditor'
import DB from './database'
const db = new DB({ ref: 'test' })

export default {
  name: 'app',
  components: {
    AppToolbar,
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
