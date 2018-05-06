import Post from '@/views/Post'
import BlogStore from '@/store/blog'

export default {
  install(Vue, opts) {
    const { router, store, destination } = opts

    router.addRoutes([{
      path: '/posts/:postId/:postLink',
      name:'post',
      component: Post,
      props: true,
    }])

    const blog = new BlogStore({ destination, rootOpts: opts })
    store.registerModule('blog', blog.store)
    store.dispatch('getBlogPosts')
  }
}
