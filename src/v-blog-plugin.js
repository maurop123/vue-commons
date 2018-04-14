import Post from '@/views/Post'

export default {
  install(Vue, opts) {
    const { router } = opts
    router.addRoutes([{
      path: '/posts/:postId',
      name:'post',
      component: Post,
      props: true,
    }])
  }
}
