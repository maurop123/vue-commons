<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-tabs v-model="activeTab">
        <v-tab key="medium">
          medium
        </v-tab>
        <v-tab key="markdown">
          markdown
        </v-tab>
        <v-tab key="preview">
          preview
        </v-tab>
        <v-tab-item key="medium">
          <div ref="editor" class="editor"></div>
        </v-tab-item>
        <v-tab-item key="markdown">
          <v-text-field
            v-model="markdownText"
            multi-line
          ></v-text-field>
        </v-tab-item>
        <v-tab-item key="preview">
          <div v-html="markdownPreview"></div>
        </v-tab-item>
      </v-tabs>
    </v-flex>
  </v-layout>
</template>

<script>
  import MediumEditor from 'medium-editor'
  import 'medium-editor/dist/css/medium-editor.min.css'
  import 'medium-editor/dist/css/themes/default.min.css'

  //import TurndownService from 'turndown'
  //const turndownService = new TurndownService()
  //const { turndown } = turndownService

  //import showdown from 'showdown'
  //const converter = new showdown.Converter()

  export default {
    name: 'medium-editor',
    data() {
      return {
        activeTab: 0,
        markdownText: '',
        markdownPreview: '',
        tabs: ['medium', 'markdown', 'preview'],
      }
    },
  }
</script>
