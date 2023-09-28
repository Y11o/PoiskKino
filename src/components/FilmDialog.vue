<template>
  <v-dialog v-model="dialogVisible" max-width="600">
    <v-card>
      <v-card-title v-if="film.nameOriginal">
        {{ film.nameOriginal }}
      </v-card-title>
      <v-card-title v-else>
        {{ film.nameRu }}
      </v-card-title>
      <v-card-text>
        <v-img :src="film.posterUrl" />
        Year: {{ film.year }} Kinopoisk: {{ film.rating }}
        <v-btn rounded color="primary" dark @click="goToFilmPage">
          Подробнее
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    film: {
      type: Object,
      required: true,
    },
    value: {
      type: Boolean,
      required: false,
    },
  },
  created() {
    this.dialogVisible = this.value;
  },
  data: () => ({
    dialogVisible: false,
  }),
  watch: {
    value(newValue) {
      this.dialogVisible = newValue;
    },
    dialogVisible(newValue) {
      this.$emit("input", newValue);
    },
  },
  methods: {
    goToFilmPage() {
      this.$emit("goToFilmPage", this.film.filmId);
    },
  },
};
</script>