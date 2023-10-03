<template>
  <v-dialog
    v-model="dialogVisible"
    max-width="600"
    @click:outside="hideFilmDialog"
  >
    <v-card>
      <v-card-title v-if="showFilm.nameOriginal">
        {{ showFilm.nameOriginal }}
      </v-card-title>
      <v-card-title v-else>
        {{ showFilm.nameRu }}
      </v-card-title>
      <v-card-text>
        <v-img :src="showFilm.posterUrl" />
        Year: {{ showFilm.year }} Kinopoisk:
        {{ showFilm.rating }}
        <v-btn rounded color="primary" dark @click="goToFilmPage">
          На страницу фильма
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState} from "vuex";

export default {
  methods: {
    ...mapMutations('films', {
      hideFilmDialog: "hideFilmDialog",
    }),
    goToFilmPage() {
      this.$router.push({
        path: "/film",
        params: { filmId: this.showFilm.filmId },
        query: { id: this.showFilm.filmId },
      });
    },
  },
  computed: {
    ...mapState('films', {
      dialogVisible: (state) => state.dialogVisible,
      showFilm: (state) => state.showFilm,
    }),
  },
};
</script>