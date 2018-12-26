# commons-vue

> Reusable components, store, etc.

## Install
``` bash
yarn add https://github.com/maurop123/vue-commons.git
```

Then import

```js
import { components } from '@mauromadeit/vue-commons'
```

## Examples

### Table Editor

Based on https://vuetifyjs.com/en/components/data-tables#example-crud

```pug
table-editor(
  v-bind="{ headers, items }"
  @save="save" @delete="delete"
)
```

```js
methods: {
  save(item) { ... },
  delete(item) { ... },
}
```

For model of headers and items...
https://vuetifyjs.com/en/components/data-tables

### Masonry Component

```pug
masonry(:items="pages")
  v-card(slot-scope="page" class="mb-3")
    v-card-title(v-if="page.title") {{page.title}}
```

### Bus

```js
import { bus } from '@mauromadeit/vue-commons'
```

### Reusing firebase db

```js
// src/database.js
import { Database } from '@mauromadeit/vue-commons'
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

### SSL Cert

1. https://www.aidanwoods.com/blog/lets-encrypt-the-manual-certificate/
2. https://p3plcpnl0875.prod.phx3.secureserver.net:2083/cpsess4761954074/frontend/gl_paper_lantern/ssl/install.html

```bash
sudo ls /etc/letsencrypt/live/journal.mauromadeit.com/
# copy files below to site above
sudo cat /etc/letsencrypt/live/journal.mauromadeit.com/cert.pem
sudo cat /etc/letsencrypt/live/journal.mauromadeit.com/privkey.pem
sudo cat /etc/letsencrypt/live/journal.mauromadeit.com/chain.pem
```

### Update PWA Icons

- Download font awesome icon like here https://fontawesome.com/icons/journal-whills?style=solid
- Convert to png here https://cloudconvert.com/svg-to-png
  - 260px by 260px and +200dpi
- Gen icons here - https://realfavicongenerator.net
- Replace the files in /public

## Gotcha

May not work in runtime only builds

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
