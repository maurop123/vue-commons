<template>
  <v-flex>
    <v-card class="card">
      <v-card-media
        v-if="img && img.src"
        :src="img.src"
        height="300px"
        :class="img.classes"
      />
      <v-card-title v-if="title">
        <h3 class="headline">{{ title }}</h3>
      </v-card-title>
      <v-card-text v-if="description"
        class="truncate"
      >
        <div>
          {{ description }}
          <!-- <span class="ellipses"></span> -->
        </div>
        <div class="fade"></div>
      </v-card-text>
      <v-card-actions v-if="link && link.url">
        <v-btn v-if="link.source === 'medium'"
          flat block
          class="green--text"
          :href="link.url"
        >
          Read More on Medium
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
  export default {
    name: 'flex-card',
    props: {
      title: String,
      description: String,
      img: Object,
      link: Object,
    },
  }
</script>

<style scoped>
  .card {
    min-width: 350px;
  }

  .animate {
    transition: all .25s ease;
  }

  .contain >>> .card__media__background {
    background-size: contain !important;
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

https%3A%2F%2Fmedia.giphy.com%2Fmedia%2FbEjLIhTDqJRaE%2Fgiphy.gif
