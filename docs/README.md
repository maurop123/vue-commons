# commons-vue

> Reusable components, store, etc.

## Install
``` bash
yarn add https://github.com/maurop123/vue-commons.git
```

## Examples

### Reusing firebase db

```js
// src/database.js
import { Database } from 'mauromadeit-vue-commons'
export default new Database({ ref: 'money-reports' })

// import and use anywhere
import db from '@/database'
db.get('items', true).subscribe(data => ...) // [{ id: 1, name: Al}, { id: 2, name: Bo }]
```

## Contributing

Initial setup
```bash
yarn install
```

Make changes and build. **Don't forget to build!**
```bash
yarn build
```

Test changes locally
```bash
rm -rf ../path/node_modules/mauromadeit-vue-commons/*
cp -r ./* ../path/node_modules/mauromadeit-vue-commons/
```

Bump version and push
```bash
npm version patch
git push
```
