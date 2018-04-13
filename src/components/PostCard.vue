<template>
  <v-card v-if="post" class="my-4 card">
    <v-card-media v-if="post.img"
      class="white--text"
      height="300px"
      :src="post.img"
    />
    <v-card-title v-if="post.title">
      <h2>{{ post.title }}</h2>
    </v-card-title>
    <v-card-text v-if="post.content" class="truncate">
      <div v-html="post.content"></div>
      <div class="fade"></div>
    </v-card-text>
    <v-card-actions v-if="post.id">
      <v-btn flat block class="blue--text"
        :to="`posts/${post.id}`"
      >
        Read More
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: 'post-card',
    props: {
      post: Object,
    },
  }
</script>

<style scoped>
  .card {
    min-width: 350px;
  }

  .truncate {
    /* max-height: 150px; */
    max-height: 9em;
    overflow: hidden;
    /* doesn't work
    text-overflow: ellipsis; */
  }

  .fade {
    position: absolute;
    bottom: 52px;
    left: 0;
    height: 50px;
    width: 100%;
    background: linear-gradient(rgba(255,255,255,0), rgba(255,255,255,1));
  }
</style>
