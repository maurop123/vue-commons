import Database from '@/database'
import { set, getCollection } from '@/store'

const defaultOpts = {
  destination: null,
  ref: 'poster',
}

export default class {
  constructor(options) {
    const opts = Object.assign(defaultOpts, options)
    this.destination = opts.destination
    this.db = new Database({ ref: opts.ref })
    this.rootOpts = opts.rootOpts || {}
  }

  get state() {
    return {
      posts: [],
    }
  }

  get getters() {
    return {
      getPublishedPosts(state) {
        return state.posts.filter(p => p.published)
      },
    }
  }

  get mutations() {
    return {
      setPosts: set('posts'),
    }
  }

  get actions() {
    return {
      getBlogPosts: getCollection({
        path: `destinations/${this.destination}/posts`,
        mutation: 'setPosts',
        database: this.db,
      }),
    }
  }

  get modules() {
    let modules = {}
    if (this.rootOpts.snackbar) modules['snackbar'] = {}
    return modules
  }

  get store() {
    const { state, getters, mutations, actions, modules } = this
    return { state, getters, mutations, actions, modules }
  }
}