<template>
  <v-container fluid>
    <v-dialog
      v-model="dialogVisible"
      @click:outside="hideFilmDialog"
      max-height="1200"
      max-width="600"
      overlay-color="secondary"
      overlay-opacity="0.25"
    >
      <v-card color="background">
        <v-row justify="center">
          <v-card-title v-if="showFilm.nameOriginal">
            {{ showFilm.nameOriginal }}
          </v-card-title>
          <v-card-title v-else>
            {{ showFilm.nameRu }}
          </v-card-title>
        </v-row>
        <v-card-text>
          <v-row justify="center">
            <v-img :max-heigh="imgMaxHeight" :max-width="imgMaxWidth" :src="showFilm.posterUrl" />
          </v-row>
          <v-row justify="center" align="baseline">
            <v-col cols="4">
              Year: {{ showFilm.year }} Kinopoisk:
              {{ showFilm.rating }}
            </v-col>
            <v-col cols="1">
              <v-btn
                icon
                @click="save"
                color="secondary"
                v-if="!savedFilms.includes(showFilm.filmId)"
              >
                <v-icon>mdi-bookmark-outline</v-icon>
              </v-btn>
              <v-btn
                icon
                @click="deleteSave"
                color="surface"
                v-if="savedFilms.includes(showFilm.filmId)"
              >
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row justify="center" class="mu-6">
            <v-rating
              empty-icon="mdi-star-outline"
              full-icon="mdi-star"
              half-icon="mdi-star-half-full"
              background-color="secondary"
              half-increments
              hover
              length="10"
              :size="ratingSize"
              v-model="rating"
            ></v-rating>
          </v-row>
          <v-row justify="center" class="ma-6">
            <v-btn rounded color="primary" dark @click="goToFilmPage">
              На страницу фильма
            </v-btn>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
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
      let savedAdd = {
        film: this.showFilm,
        saved: true,
      };
      this.saveInFavs(savedAdd);
      this.setSaved();
    },
    deleteSave() {
      this.deleteFromFavs(this.showFilm);
      this.setSaved();
    },
    goToFilmPage() {
      this.$router.push({
        path: "/film",
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
    ratingSize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 12;
        case "sm":
          return 14;
        case "md":
          return 20;
        case "lg":
          return 24;
        case "xl":
          return 28;
      }
    },
    imgMaxHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 600;
        case "sm":
          return 800;
        case "md":
          return 1000;
        case "lg":
          return 1200;
        case "xl":
          return 1400;
      }
    },
    imgMaxWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 300;
        case "sm":
          return 400;
        case "md":
          return 600;
        case "lg":
          return 800;
        case "xl":
          return 1000;
      }
    },
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
        if (!this.savedFilmsObj.includes(this.showFilm)) {
          let ratedAdd = {
            film: this.showFilm,
            saved: false,
          };
          this.saveInFavs(ratedAdd);
        }
        this.addToRated(newFilm);
        this.setRated();
      },
    },
  },
};
</script>
