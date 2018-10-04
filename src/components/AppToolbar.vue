<template lang="pug">
  v-app(:dark="darkMode")
    v-navigation-drawer(
      v-if="!noDrawer"
      persistent
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    )
      v-list
        div(v-if="!noLogin")
          v-list-tile(v-if="!user")
            v-list-tile-content
              v-btn(flat to="/login") Login
          div(v-else)
            v-list-tile {{ user.email }}
            v-list-tile
              v-list-tile-content
                v-btn(flat to="/login") Logout
        v-list-tile(v-if="!noScrollToBottom")
          v-list-tile-content
            v-btn(flat @click="scrollToBottom") Scroll To Bottom
        v-list-tile(v-if="!noDarkMode" id="dark-light-mode-tile")
          v-list-tile-content
            v-btn(v-if="!darkMode" @click="darkMode = true" dark) Dark Mode
            v-btn(v-else @click="darkMode = false" light) Light Mode
    v-toolbar(app fixed :color="toolbarColor" :dark="toolbarColor !== ''")
      v-toolbar-side-icon(@click.stop="drawer = !drawer")
      v-toolbar-title(v-if="title")
        v-btn(flat @click="$router.push('/')") {{ title }}
    //router-view(class="mt-custom" v-bind="{ user }")
    slot
</template>

<script>
  import Bus from './bus'

  export default {
    name: 'app-toolbar',
    props: {
      title: {
        type: String,
        default: '',
      },
      toolbarColor: {
        type: String,
        default: '',
      },
      noDarkMode: {
        type: Boolean,
        default: false,
      },
      noDrawer: {
        type: Boolean,
        default: false,
      },
      noLogin: {
        type: Boolean,
        default: false,
      },
      noScrollToBottom: {
        type: Boolean,
        default: false,
      },
      items: {
        type: Array,
        default: () => [],
      },
      user: {
        type: Object,
        default: () => ({}),
      },
    },
    data () {
      return {
        drawer: false,
      }
    },
    computed: {
      darkMode: {
        get() {
          return this.$store.state.dark
        },
        set(val) {
          this.$store.commit('setState', {
            key: 'dark', val
          })
        },
      },
    },
    methods: {
      scrollToBottom() {
        Bus.$emit('scrollToBottom')
      },
    },
  }
</script>

<style scoped>
  #dark-light-mode-tile {}

  .mt-custom {
    margin-top: 126px!important;
  }

  .mt-custom /deep/ .toolbar__content>:first-child {
    margin-left: 8px!important;
  }

  .x-scroll {
    overflow: auto;
  }
</style>
