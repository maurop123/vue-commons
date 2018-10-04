import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import commons from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Vuetify)

Vue.config.productionTip = false

const router = new VueRouter()

const store = new Vuex.Store(commons)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
