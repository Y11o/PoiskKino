<template>
  <v-container fluid>
    <v-dialog
      v-model="dialogVisible"
      @click:outside="hideFilmDialog"
      max-height="1200"
      max-width="800"
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
            <v-img
              :max-heigh="imgMaxHeight"
              :max-width="imgMaxWidth"
              :src="showFilm.posterUrl"
            />
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
            <Rating />
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
import Rating from "@/components/Rating.vue";

export default {
  components: {
    Rating,
  },
  methods: {
    ...mapMutations("films", {
      hideFilmDialog: "hideFilmDialog",
      setSaved: "setSaved",
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
      savedFilmsObj: (state) => state.savedFilmsObj,
    }),
    imgMaxHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 400;
        case "sm":
          return 800;
        case "md":
          return 900;
        case "lg":
          return 1000;
        case "xl":
          return 1400;
      }
    },
    imgMaxWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 200;
        case "sm":
          return 400;
        case "md":
          return 600;
        case "lg":
          return 700;
        case "xl":
          return 800;
      }
    },
  },
};
</script>
