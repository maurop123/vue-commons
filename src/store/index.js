import { db } from '@/database'

export default {
  getCollection,
}

export function getCollection(opts = {
  key: null,
  path: null,
  mutation: null,
}, done) {
  const { key, path, mutation } = opts
  return ({state, commit}) => {
    if (key === null && path === null) {
      throw new Error('Need collection key or path. Both are null.')
    } else {
      const path = (path) ? path : `users/${state.user.uid}/${key}`
      db.get(path).subscribe(col => {
        if (col) {
          if (mutation) {
            commit(mutation, col)
          } else {
            done(col)
          }
        } else {
          console.log(`Nothing returned at ${path}`)
        }
      })
    }
  }
}
