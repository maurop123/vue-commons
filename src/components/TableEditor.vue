<template lang="pug">
div
  slot(name="dialog")
    crud-dialog(
      :item="selectedItem"
      :fields="fields"
      @save="save"
      @cancel="resetSelectedItem"
      ref="editorModal"
    )
  slot(name="table")
    v-data-table(v-bind="{ headers: headersComputed, items }" hide-actions)
      template(slot="items" slot-scope="props")
        td {{ props.item[headers[0].value] }}
        td(
          class="text-xs-right"
          v-for="key in headers.slice(1)"
          :key="key.value"
        ) {{ props.item[key.value] }}
        td(class="justify-center layout px-0")
          v-btn(icon class="mx-0" @click="editItem(props.item)")
            v-icon(color="blue") edit
          v-btn(icon class="mx-0" @click="deleteItem(props.item)")
            v-icon(color="red") delete
</template>

<script>
  import CrudDialog from '@/components/CrudDialog'

  export default {
    name: 'table-editor',
    props: {
      //TODO add validation
      headers: Array,
      items: Array,
    },
    components: {
      CrudDialog,
    },
    data() {
      return {
        selectedItem: {},
      }
    },
    computed: {
      headersComputed() {
        const actions = this.headers.filter(({ value }) =>
          value === 'actions')

        return (actions.length === 0)
          ? this.headers.concat({ text: 'Actions', value: 'actions' })
          : this.headers
      },
      fields() {
        return this.headers
          .map(({text, value}) => ({key: value, label: text}))
      },
    },
    methods: {
      open() {
        this.$refs.editorModal.open()
      },
      editItem(item) {
        this.selectedItem = item
      },
      save(item) {
        //this.$store.dispatch('saveLocation', item)
        this.$emit('save', item)
      },
      deleteItem(item) {
        //this.$store.dispatch('delLocation', item)
        this.$emit('delete', item)
        this.resetSelectedItem()
      },
      resetSelectedItem() {
        this.selectedItem = {}
      },
    },
  }
</script>
