# API

- Keys
- npm dependencies
- New
- Get
- Set
- Push
- Del
- objToArr


## npm dependencies

```
npm i -D firebase@7.24.0
npm i -D rxjs
```

## New

```
import FirebaseInterface from './Firebase'

export default new FirebaseInterface({ ref: 'pwa-tetris' }) 
```

## Get

```db.get('leaderboard').subscribe(x => console.log(x))```
