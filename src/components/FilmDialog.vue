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
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  methods: {
    ...mapMutations("films", {
      hideFilmDialog: "hideFilmDialog",
      addToRated: "addToRated",
      setSaved: "setSaved",
      setRated: "setRated",
    }),
    ...mapActions("films", {
      saveInFavs: "saveInFavs",
      deleteFromFavs: "deleteFromFavs",
    }),
    save() {
      this.saveInFavs(this.showFilm);
      this.setSaved();
    },
    deleteSave() {
      this.deleteFromFavs(this.showFilm);
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
      savedFilmsObj: (state) => state.savedFilmsObj,
    }),
    rating: {
      get() {
        let idFilms = this.ratedFilms.map((id) => id.filmId);
        if (idFilms.includes(this.showFilm.filmId)) {
          return this.ratedFilms[idFilms.indexOf(this.showFilm.filmId)]
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