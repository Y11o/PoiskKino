<template>
  <v-container fluid>
    <v-pagination
      v-model="currentPage"
      :length="13"
      :total-visible="7"
      circle
      @input="handlePageChange"
    ></v-pagination>
    <v-row class="flex" align="center">
      <Film
        v-for="film in films"
        :film="film"
        :key="film.id"
        @showMore="showMore"
      />
    </v-row>
    <FilmDialog
      :film="showFilm"
      v-model="dialogVisible"
      @goToFilmPage="goToFilmPage"
    />
    <div class="text-center">
      <v-pagination
        v-model="currentPage"
        :length="13"
        :total-visible="7"
        circle
        @input="handlePageChange"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
import Film from "@/components/Film.vue";
import FilmDialog from "@/components/FilmDialog.vue";
import axios from "axios";

export default {
  components: {
    Film,
    FilmDialog,
  },
  data: () => ({
    films: [],
    showFilm: {},
    dialogVisible: false,
    currentPage: 1,
  }),
  beforeMount() {
    this.fetchFilms();
  },
  methods: {
    goToFilmPage(filmId) {
      this.$router.push({
        path: "/film",
        params: { filmId: filmId },
        query: { id: filmId },
      });
    },
    handlePageChange(value) {
      this.currentPage = value;
      this.fetchFilms();
    },
    async fetchFilms() {
      const response = await axios.get(
        "https://kinopoiskapiunofficial.tech/api/v2.2/films/top",
        {
          params: {
            page: this.currentPage,
          },
          headers: {
            "X-API-KEY": "5a083dfc-2af6-456d-bc14-2f6adbae7052",
            "Content-Type": "application/json",
          },
        }
      );
      this.films = response.data.films;
    },
    showMore(film) {
      this.showFilm = film;
      this.dialogVisible = true;
    },
  },
};
</script>