<template>
  <v-container fluid grid-list-xl>
    <v-layout>
      <v-flex v-for="n in nOfColumns" :key="n"
        :xl2="columns === 6"
        :xl3="columns === 4"
        :xl4="columns === 3"
        :xl6="columns === 2"
        :lg3="columns === 4"
        :lg4="columns === 3"
        :lg6="columns === 2"
        :md4="columns === 3"
        :md6="columns === 2"
        :sm6="columns === 2"
        xs12
      >
        <v-layout column>
          <v-flex>
            <template v-for="item in itemsColumn[n-1]">
              <slot :item="item"></slot>
            </template>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import _range from 'lodash/range'

  export default {
    name: 'masonry-layout',
    props: {
      columns: {
        type: Number,
        default: 2,
        validator(val) {
          return (val === 6
            || val === 4
            || val === 3
            || val === 2
            || val === 1
          )
        },
      },
      items: {
        type: Array,
        default: () => [],
      },
      responsive: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      nOfColumns() {
        const { columns, $vuetify, responsive } = this
        if (responsive) {
          return ($vuetify.breakpoint.xlOnly) ? 6
          : ($vuetify.breakpoint.lgOnly) ? 4
          : ($vuetify.breakpoint.mdOnly) ? 3
          : ($vuetify.breakpoint.smOnly) ? 2
          : 1
        }

        return columns
      },
      itemsColumn() {
        const { items, nOfColumns: columns } = this
        const newArr = () => _range(columns).map(() => [])
        return items.reduce((cols, item, i) => {
          const n = i % columns
          cols[n].push(item)
          return cols
        }, newArr())
      },
    },
  }
</script>
