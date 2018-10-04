import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(VueRouter)
Vue.use(Vuetify)

Vue.config.productionTip = false

const router = new VueRouter()

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
