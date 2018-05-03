<template lang="pug">
  v-container
    v-card(class="my-4" v-if="post")
      v-card-media(v-if="post.imageUrl"
        class="white--text"
        height="300px"
        :src="post.imageUrl"
      )
      v-card-title(v-if="post.title")
        h2 {{ post.title }}
      v-card-text(v-if="post.content")
        div(v-html="post.content")
</template>

<script>
export default {
  name: 'post-view',
  props: {
    postId: String,
  },
  computed: {
    post() {
      return this.$store.state.blog.posts
      .find(p => p.id === this.postId)
    }
  },
}
</script>
