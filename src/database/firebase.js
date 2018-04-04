import firebase from 'firebase'
import { Observable } from 'rxjs/Observable';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAyqHeGbVxYnXNKrAbtkJ8tkopm76W0kvw",
  authDomain: "mauro-made-it.firebaseapp.com",
  databaseURL: "https://mauro-made-it.firebaseio.com",
})

export const fb = firebaseApp.database().ref('poster')
export const auth = firebase.auth()

const objToArry = (obj) => Object.keys(obj).map(key => obj[key])

function get(path = '/', toArray = true) {
  return Observable.create((observer) => {
    const ref = fb.child(path)

    ref.once('value', (snap) => {
      if (snap.val()) {
        observer.next(
          (toArray) ? objToArry(snap.val()) : snap.val()
        )
      } else {
        observer.next(null)
      }
    })
  })
}

function set(path = '/', payload) {
  return Observable.create(obs => {
    //TODO try fromPromise
    fb.child(path).set(payload)
    .then(() => obs.next(payload))
    .catch(err => obs.error(err))
  })
}

function push(path = '/', payload) {
  const id = fb.child(path).push().key
  const newPath = `${path}/${id}`
  return set(newPath, { id, ...payload })
}

function update(path = '/', payload) {
  if (payload.id === undefined) {
    return push(path, payload)
  } else {
    path = `${path}/${payload.id}`
    return set(path, payload)
  }
}

export const db = Object.assign(
  {},
  fb,
  { get, set, push, update }
)

export default { db, auth }
