<template>
  <div>
    <v-tabs v-model="activeTab" class="elevation-1">
      <v-tab key="medium">
        medium
      </v-tab>
      <v-tab key="markdown" v-if="markdown">
        markdown
      </v-tab>
      <v-tab key="preview" v-if="markdown">
        preview
      </v-tab>
    </v-tabs>
    <v-tabs-items>
      <v-tab-item key="medium">
        <div ref="editor" class="editor"></div>
      </v-tab-item>
      <v-tab-item key="markdown" v-if="markdown">
        <v-text-field
          v-model="markdownText"
          multi-line
        ></v-text-field>
      </v-tab-item>
      <v-tab-item key="preview" v-if="markdown">
        <div v-html="markdownPreview"></div>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
  import MediumEditor from 'medium-editor'
  import 'medium-editor/dist/css/medium-editor.min.css'
  import 'medium-editor/dist/css/themes/default.min.css'

  import TurndownService from 'turndown'
  const turndownService = new TurndownService()
  const { turndown } = turndownService

  import showdown from 'showdown'
  const converter = new showdown.Converter()

  export default {
    name: 'medium-editor',
    props: {
      markdown: {
        type: Boolean,
        default: false,
      },
      // TODO add v-model
    },
    data() {
      return {
        activeTab: 0,
        markdownText: '',
        markdownPreview: '',
        tabs: ['medium', 'markdown', 'preview'],
      }
    },
    watch: {
      markdownText(val) {
        this.markdownPreview = converter.makeHtml(this.markdownText)
      },
      activeTab(val) {
        if (this.tabs[val] === 'medium') {
          this.editor.setContent(this.markdownPreview)
        } else if (this.tabs[val] === 'markdown') {
          const content = this.editor.getContent()
          this.markdownText = turndownService.turndown(content)
        }
      },
    },
    mounted() {
      this.editor = new MediumEditor(this.$refs.editor, {
        placeholder: {
          text: 'Write first, edit later...',
        },
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
