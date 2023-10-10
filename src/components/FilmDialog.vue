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
        <v-btn icon @click="save" v-if="!savedFilms.includes(showFilm.filmId)">
          <v-icon>mdi-bookmark-outline</v-icon>
        </v-btn>
        <v-btn
          icon
          @click="deleteSave"
          v-if="savedFilms.includes(showFilm.filmId)"
        >
          <v-icon>mdi-bookmark</v-icon>
        </v-btn>
        <v-rating
          empty-icon="mdi-star-outline"
          full-icon="mdi-star"
          half-icon="mdi-star-half-full"
          half-increments
          hover
          length="10"
          size="32"
          v-model="rating"
        ></v-rating>
        <v-btn rounded color="primary" dark @click="goToFilmPage">
          На страницу фильма
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  methods: {
    ...mapMutations("films", {
      hideFilmDialog: "hideFilmDialog",
      addToSaved: "addToSaved",
      addToRated: "addToRated",
      setSaved: "setSaved",
      setRated: "setRated",
      deleteFromSaved: "deleteFromSaved",
    }),
    save() {
      this.addToSaved(this.showFilm.filmId);
      this.setSaved();
    },
    deleteSave() {
      this.deleteFromSaved(this.showFilm.filmId);
      this.setSaved();
    },
    goToFilmPage() {
      this.$router.push({
        path: "/film",
        params: { filmId: this.showFilm.filmId },
        query: { id: this.showFilm.filmId },
      });
    },
  },
  computed: {
    ...mapState("films", {
      dialogVisible: (state) => state.dialogVisible,
      showFilm: (state) => state.showFilm,
      savedFilms: (state) => state.savedFilms,
      ratedFilms: (state) => state.ratedFilms,
    }),
    rating: {
      get() {
        let idFilms = this.ratedFilms.map((id) => id.filmId);
        if (idFilms.includes(this.showFilm.filmId)) {
          return this.ratedFilms[this.ratedFilms.indexOf(this.showFilm.filmId)]
            .userRating;
        } else {
          return Math.round(this.showFilm.rating * 2) / 2;
        }
      },
      set(newValue) {
        let newFilm = {
          filmId: this.showFilm.filmId,
          userRating: newValue,
        };
        this.addToRated(newFilm);
        this.setRated();
      },
    },
  },
};
</script>