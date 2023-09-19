<template>
  <v-col cols="4">
    <v-card width="900" height="600">
      <v-card-title>{{film.nameEn}}</v-card-title>
      <v-card-text>
        <v-img :src="film.posterUrl" />
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    film: {
      type: Object,
      required: true,
    },
  },
};
</script>