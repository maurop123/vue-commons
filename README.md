# commons-vue

> Reusable components, store, etc.

## Install
``` bash
yarn add https://github.com/maurop123/vue-commons.git
```

## Examples

### Masonry Component

```pug
masonry(:items="pages")
  v-card(slot-scope="page" class="mb-3")
    v-card-title(v-if="page.title") {{page.title}}
```

### Reusing firebase db

```js
// src/database.js
import { Database } from 'mauromadeit-vue-commons'
export default new Database({ ref: 'money-reports' })

// import and use anywhere
import db from '@/database'
db.get('items').subscribe(data => ...) // [{ id: 1, name: Al}, { id: 2, name: Bo }]
db.push('items', payload).subscribe()
```

### State Model and Texts

```pug
text-state-model(
  :stateProp="`enrollment.owners.${i}.city`"
  label="City"
  :rules="[required()]"
)

// which is equivalent to...

state-model(stateProp="enrollment.companyName")
  v-text-field(
    slot-scope="{ value, input }"
    :value="value" @input="input"
    label="Company Legal Name"
    :rules="[required()]"
  )
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
