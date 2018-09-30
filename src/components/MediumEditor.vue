<template lang="pug">
    v-card
      v-card-text
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
        default: '',
      },
    },
    data() {
      return {
        activeTab: 0,
        tabs: ['medium'],
      }
    },
    mounted() {
      this.editor = new MediumEditor(this.$refs.editor, {
        placeholder: {
          text: 'Write first, edit later...',
        },
      })

      if (this.value) this.editor.setContent(this.value)

      editor.subscribe('editableInput', (ev, editable) => {
        this.$emit('input', editable)
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
