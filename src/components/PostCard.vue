<template>
  <v-card>
    <template v-if="item.isArticle">
      <v-card-media v-if="item.imageUrl"
        class="white--text"
        height="300px"
        :src="item.imageUrl"
      />
      <v-card-title v-if="item.title">
        <h2>{{ item.title }}</h2>
      </v-card-title>
      <v-card-text v-if="item.excerpt">
        <div v-html="item.excerpt"></div>
        <div class="tags mt-3" v-if="item.tags">
          <v-chip v-for="tag in item.tags" :key="tag" class="tag"
          @click="toggleTagFilter(tag)">
            #{{tag}}
          </v-chip>
        </div>
      </v-card-text>
      <v-card-actions v-if="item.id">
        <v-btn flat block class="blue--text"
          :to="`posts/${item.id}`"
        >
          Read More
        </v-btn>
      </v-card-actions>
    </template>
    <template v-else>
      <v-card-text v-if="item.content">
        <div v-html="item.content"></div>
        <div class="tags mt-3" v-if="item.tags">
          <v-chip v-for="tag in item.tags" :key="tag" class="tag"
          @click="toggleTagFilter(tag)">
            #{{tag}}
          </v-chip>
        </div>
      </v-card-text>
    </template>
  </v-card>
</template>

<script>
  export default {
    name: 'post-card',
    props: {
      item: Object,
    },
    methods: {
      toggleTagFilter(tag) {
        this.$emit('toggleTagFilter', tag)
      },
    },
  }
</script>

<style scoped>
  /* .card {
    min-width: 350px;
  } */

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
