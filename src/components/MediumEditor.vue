<template lang="pug">
  div(ref="editor" class="editor")
</template>

<script>
  import MediumEditor from 'medium-editor'
  import 'medium-editor/dist/css/medium-editor.min.css'
  import 'medium-editor/dist/css/themes/default.min.css'

  export default {
    name: 'medium-editor',
    props: {
      value: {
        type: String,
        default: '<p>it</p>',
      },
      options: {
        type: Object,
        default: () => null,
      },
    },
    data() {
      return {
        editor: null,
      }
    },
    watch: {
      value(val) {
        this.editor.setContent(val)
      },
    },
    mounted() {
      this.editor = new MediumEditor(this.$refs.editor, {
        placeholder: {
          text: 'Write first, edit later...',
        },
        ...this.options,
      })

      if (this.value) this.editor.setContent(this.value)

      this.editor.subscribe('editableInput', (ev, editable) => {
        this.$emit('input', editable.innerHTML)
      })
    },
  }
</script>

<style>
  .editor {
    background: white;
    padding: 16px;
  }
</style>
