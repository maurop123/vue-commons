import Database from '@/database/FirebaseClass'

const exp = () => ({
  pop,
  push,
  set,
  unshift,
  update,
  updateWithId,
  updateCollection,
  getCollection,
  getItByKey,
  make,
})

export default exp()

let db

// factory function
export function make({ dbCfg }) {
  db = new Database(dbCfg)

  return exp()
}

// getters
export function getItByKey(list, key) {
  return state => k => state[list].find(x => x[key] === k)
}

// mutations

export function pop(key) {
  return (state, payload) => state[key].pop(payload)
}

export function push(key) {
  return (state, payload) => state[key].push(payload)
}

export function set(key) {
  return (state, payload) => state[key] = payload
}

export function unshift(key) {
  return (state, payload) => state[key].unshift(payload)
}

export function update(key) {
  return (state, payload) => state[key] = payload
}

export function updateWithId(key) {
  return (state, payload) => state[key] = state[key].map(m => payload.id === m.id ? payload : m)
}

export function updateCollection(key) {
  return (state, payload) => {
    if (state[key].find(x => x.id === payload.id)) {
      return updateWithId(key)(state, payload)
    } else {
      return push(key)(state, payload)
    }
  }
}

// actions

export function getCollection(opts = {
  key: null,
  path: null,
  mutation: null,
  db,
}, done) {
  const { key, path, mutation } = opts
  return (context) => {
    const {state, commit} = context
      console.log('state, commt')
    if (key === null && path === null) {
      throw new Error('Need collection key or path. Both are null.')
    } else {
      const _path = (path !== null) ? path : `users/${state.user.uid}/${key}`
      db.get(_path).subscribe(col => {
        console.log('col', col)
        if (col) {
          if (mutation) {
            commit(mutation, col)
          } else {
            done(context, col)
          }
        } else {
          console.log(`Nothing returned at ${_path}`)
        }
      })
    }
  }
}
