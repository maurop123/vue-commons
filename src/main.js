import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import commons from './store'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuex)
Vue.use(Vuetify)

Vue.config.productionTip = false

const store = new Vuex.Store(commons)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
