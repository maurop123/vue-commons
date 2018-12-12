<template lang="pug">
  app-toolbar(v-bind="{sideNav, topNav}")
    v-layout(column align-center)
      v-flex
        table-editor( v-bind="{ headers, items }" )
      v-flex
        v-btn(
          @click="showSnackbar"
        ) Show Snackbar
      v-flex
        MediumEditor(
          v-model="text"
          :options="options"
        )
</template>

<script>
  import AppToolbar from '@/components/AppToolbar'
  import MediumEditor from '@/components/MediumEditor'
  import TableEditor from '@/components/TableEditor'
  import DB from '@/database'
  const db = new DB({ ref: 'test' })

  export default {
    name: 'app',
    components: {
      AppToolbar,
      MediumEditor,
      TableEditor,
    },
    data() {
      return {
        text: '',
        headers: [{
          text: 'What',
          value: 'what'
        }, {
          text: 'Who',
          value: 'who'
        }, {
          text: 'How Much',
          value: 'how_much'
        }, {
          text: 'Recorded At',
          value: 'recorded_at'
        }],
        items: [{
          what: 'Wake up early',
          who: 'Mauro',
          how_much: 3,
          recordedAt: new Date(),
        }, {
          what: 'Make art',
          who: 'Luna',
          how_much: 8,
          recordedAt: new Date(),
        }, {
          what: 'Do a ceremony',
          who: 'Luna, Mauro, and friends',
          how_much: 50,
          recordedAt: new Date(),
        }],
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
    methods: {
      showSnackbar() {
        this.$store.commit('setState', [
          'toast', 'O Hai!' + new Date(),
        ])
      },
    },
    mounted() {
      db.push('/', { foo: 'bar' }).subscribe(p => {
        console.log('p', p)
      })
    },
  }
</script>
