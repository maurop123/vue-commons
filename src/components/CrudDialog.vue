<template lang="pug">
v-dialog(v-model="dialog" max-width="500px")
  v-btn(v-if="!hideActivator" slot="activator"
    color="primary" dark class="mb-2"
  ) New Item

  v-card
    v-card-title(v-if="header")
      span(class="headline") {{ header }}
    v-card-text
      v-container(grid-list-md)
        v-layout(wrap)
          slot(:editedItem="editedItem")
            //v-flex(xs12 sm6 md4 v-if="fieldsComputed"
            v-flex(xs12 sm6 md4 v-if="fields"
              v-for="{ key, label } in fields" :key="key"
            )
              v-text-field(:label="label" v-model="editedItem[key]")
            v-flex(v-else)
              span(class="headline") Nothing to edit :-p
    v-card-actions
      v-btn(color="blue darken-1" flat @click.native="reset") Reset
      v-spacer
      v-btn(color="blue darken-1" flat @click.native="close") Cancel
      v-btn(color="blue darken-1" flat @click.native="save") Save
</template>

<script>
  export default {
    name: 'crud-dialog',
    props: {
      header: String,
      fields: Array,
      item: Object,
      hideActivator: Boolean,
      noAutoOpen: Boolean,
    },
    data() {
      const flatObject = obj => obj
      .reduce((item, {key, val}) =>
        Object.assign({}, item, { [key]: val })
      , {})

      const defaultItem = this.fields ? flatObject(this.fields) : {}
      const editedItem = defaultItem

      return {
        dialog: false,
        defaultItem,
        editedItem,
      }
    },
    computed: {
      fieldsComputed() {
        //TODO figure this out
        return (this.fields) ? this.fields
          : Object.keys(this.fields)
            .map(f => ({ key: f, label: f }))
      },
    },
    watch: {
      item(val) {
        if (
          val && Object.keys(val).length > 0
          && !this.noAutoOpen
        ) {
          this.editedItem = val
          this.dialog = true
        }
      },
    },
    methods: {
      close() {
        this.dialog = false
        this.$emit('cancel')
      },
      save() {
        this.$emit('save', this.editedItem)
        this.reset()
        this.close()
      },
      reset() {
        // this.editedItem = this.defaultItem
        this.editedItem = {}
      },
      open() {
        this.dialog = true
      },
    },
  }
</script>
