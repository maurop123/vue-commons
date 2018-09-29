<template>
  <v-container fluid grid-list-xl>
    <v-layout>
      <v-flex v-for="n in nOfColumns" :key="n"
        :lg3="nOfColumns === 4"
        :md4="nOfColumns === 3"
        :sm6="nOfColumns === 2"
        xs12
      >
        <v-layout column :ref="`col${n-1}`">
          <v-flex v-if="columnsData && columnsData[n-1]">
            <template v-for="item in columnsData[n-1]">
              <!-- <slot :item="item"></slot> -->
              <slot v-bind="item"></slot>
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
        default: null,
        validator(val) {
          return (val === 6
            || val === 4
            || val === 3
            || val === 2
            || val === 1
            || null
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
        // This is for enabling more dynamic or customizable columns
        const { columns } = this
        const { sm, md, lg, xl } = this.$vuetify.breakpoint
        return (columns !== null) ? columns
        : xl ? 4
        : lg ? 4
        : md ? 3
        : sm ? 2
        : 1
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
          const iCol = this.$refs[`col${i}`].slice(-1)[0]
          const nCol = this.$refs[`col${n}`].slice(-1)[0]
          return nCol.clientHeight > iCol.clientHeight ? i : n
        }, 0)
        const newCol = this.columnsData[iShortCol].concat(this.itemsQueue.shift())
        this.$set(this.columnsData, iShortCol, newCol)
      },
      resetColumnsData() {
        this.itemsQueue = [].concat(this.items)
        this.columnsData = []
        for(let i=0; i<this.nOfColumns; ++i) {
          this.columnsData.push([])
        }
      },
    },
  }
</script>

<style scoped>
  .gallery-card {
    transform-origin: center center 0;
    transition: .3s cubic-bezier(.25,.8,.50,1);
  }
  .fade-transition-leave,
  .fade-transition-leave-active,
  .fade-transition-leave-to {
    display: none;
  }
</style>
