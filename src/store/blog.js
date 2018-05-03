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

  get store() {
    const { state, getters, mutations, actions } = this
    return { state, getters, mutations, actions }
  }
}