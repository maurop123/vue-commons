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
npm i -D firebase@7
npm i -D rxjs
```

## New

```
import FirebaseInterface from './Firebase'

export default new FirebaseInterface({ ref: 'pwa-tetris' }) 
```

## Get

```db.get('leaderboard').subscribe(x => console.log(x))```
