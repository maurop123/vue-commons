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
      <v-layout column :ref="`${n-1}Col`">
          <v-flex>
            <template v-if="columnsData && columnsData[n-1]"
              v-for="item in columnsData[n-1]">
              <slot :item="item"></slot>
            </template>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'masonry-grid',
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
    },
    data() {
      return {
        columnsData: null,
        itemsQueue: [],
      }
    },
    computed: {
      nOfColumns() {
        const { columns } = this
        // This is for enabling more dynamic or customizable columns
        return columns
      },
    },
    watch: {
      items() {
        this.resetColumnsData()
      },
    },
    updated() {
      if (this.itemsQueue.length > 0) this.updateColumnsData()
    },
    mounted() {
      this.resetColumnsData()
    },
    methods: {
      updateColumnsData() {
        const iShortCol = this.columnsData.reduce((n, col, i) => {
          const iCol = this.$refs[`${i}Col`][0]
          const nCol = this.$refs[`${n}Col`][0]
          return nCol.clientHeight > iCol.clientHeight ? i : n
        }, 0)
        const newCol = this.columnsData[iShortCol].concat(this.itemsQueue.shift())
        this.$set(this.columnsData, iShortCol, newCol)
      },
      resetColumnsData() {
        this.itemsQueue = [].concat(this.items)
        this.columnsData = []
        for(let i=0; i<this.columns; ++i) {
          this.columnsData.push([])
        }
      },
    },
  }
</script>
