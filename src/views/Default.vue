<template lang="pug">
  app-toolbar(v-bind="{sideNav, topNav}")
    v-layout(column align-center)
      MediumEditor(
        v-model="text"
        :options="options"
      )
</template>

<script>
  import AppToolbar from '@/components/AppToolbar'
  import MediumEditor from '@/components/MediumEditor'
  import DB from '@/database'
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
        sideNav: [
          {
            label: 'Foo Bar',
          },
          {
            path: 'bar-foo',
          },
        ],
        topNav: [
          {
            label: 'Boo Far',
          },
          {
            path: 'far-boo',
          },
        ],
      }
    },
    mounted() {
      db.push('/', { foo: 'bar' }).subscribe(p => {
        console.log('p', p)
      })
    },
  }
</script>
