<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4>
        <v-card class="my-4" v-if="item">
          <v-card-media v-if="item.img"
            class="white--text"
            height="300px"
            :src="item.img"
          />
          <v-card-title v-if="item.title">
            <h2>{{ item.title }}</h2>
          </v-card-title>
          <v-card-text v-if="item.content">
            <div v-html="item.content"></div>
          </v-card-text>
        </v-card>
        <div v-else>
          <h1>No Post</h1>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'post-view',
    props: ['postId'],
    data() {
      return {
        item: null,
      }
    },
    mounted() {
      this.$store.dispatch('getPostById', this.postId).then(post => {
        this.item = post
      })
    },
  }
</script>
