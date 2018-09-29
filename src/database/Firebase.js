import firebase from 'firebase'
import { Observable } from 'rxjs/Observable';

export default class {
  constructor({
    config = {
      apiKey: "AIzaSyAyqHeGbVxYnXNKrAbtkJ8tkopm76W0kvw",
      authDomain: "mauro-made-it.firebaseapp.com",
      databaseURL: "https://mauro-made-it.firebaseio.com",
    },
    ref
  }) {
    const firebaseApp = firebase.initializeApp(config)
    this.fb = ref ? firebaseApp.database().ref(ref) : firebaseApp.database()
    this.auth = firebase.auth()
  }

  get(path = '/', toArray = true) {
    return Observable.create((observer) => {
      const ref = this.fb.child(path)

      ref.once('value', (snap) => {
        if (snap.val()) {
          observer.next(
            (toArray) ? this.objToArry(snap.val()) : snap.val()
          )
        } else {
          observer.next(null)
        }
      })
    })
  }

  set(path = '/', payload) {
    return Observable.create(obs => {
      //TODO try fromPromise
      this.fb.child(path).set(payload)
      .then(() => obs.next(payload))
      .catch(err => obs.error(err))
    })
  }

  push(path = '/', payload) {
    const id = this.fb.child(path).push().key
    const newPath = `${path}/${id}`
    return this.set(newPath, { id, ...payload })
  }

  update(path = '/', payload) {
    if (payload.id === undefined) {
      return this.push(path, payload)
    } else {
      path = `${path}/${payload.id}`
      return this.set(path, payload)
    }
  }

  del(path = '/', payload) {
    if (payload.id !== undefined) {
      path = path.split('/').concat(payload.id).join('/')
    }
    return this.set(path, null)
  }

  objToArry(obj) { return Object.keys(obj).map(key => obj[key]) }
}


//
// export const db = Object.assign(
//   {},
//   fb,
//   { get, set, push, update }
// )
//
// export default { db, auth }
