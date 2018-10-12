import Vue from 'vue'
import VueRouter from 'vue-router'
import Default from '@/views/Default'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Default,
    },
    {
      path: '/chat',
      component: require('@/views/Chat'),
    },
  ],
})

export default router
