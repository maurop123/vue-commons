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
        v-list-tile(
          v-for="link in sideNavLinks"
          :key="JSON.stringify(link)"
        )
          v-list-tile-content
            v-btn(:to="link.path" flat) {{ link.label }}
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
      v-spacer
      v-toolbar-items(class="hidden-sm-down")
        v-btn(
          v-for="link in topNavLinks"
          :key="JSON.stringify(link)"
          v-if="link"
          :to="link.path"
          flat
        ) {{ link.label }}
    //router-view(class="mt-custom" v-bind="{ user }")
    v-content
      slot
    v-snackbar(
      v-model="snackbar"
      :timeout="2000"
      bottom
    )
      v-layout {{ toast }}
</template>

<script>
  import Bus from './bus'
  import { title, paramCase } from 'change-case'
  import { mapState } from 'vuex'
  
  const navLinkValidator = links => links
  .reduce((res, link) => (link.path || link.label) && res, true)

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
      sideNav: {
        type: Array,
        default: () => [],
        validator: navLinkValidator,
      },
      topNav: {
        type: Array,
        default: () => [],
        validator: navLinkValidator,
      },
      user: {
        type: Object,
        default: () => ({}),
      },
    },
    data () {
      return {
        drawer: false,
        snackbar: false,
      }
    },
    computed: {
      ...mapState(['toast']),
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
      sideNavLinks() {
        return this.sideNav.map(this.navify)
      },
      topNavLinks() {
        return this.topNav.map(this.navify)
      },
    },
    watch: {
      toast() {
        this.snackbar = true
      },
    },
    methods: {
      navify(link) {
        return (link.path && link.label) ? link
        : (link.label) ? { ...link, path: paramCase(link.label) }
        : (link.path) ? { ...link, label: title(link.path) }
        : null
      },
      scrollToBottom() {
        Bus.$emit('scrollToBottom')
      },
    },
  }
</script>

<style scoped>
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
