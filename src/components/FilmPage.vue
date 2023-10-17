<template>
  <v-container fluid>
    <v-card color="background" flat>
      <v-row justify="center" align="baseline">
        <v-card-title v-if="film.nameRu" color="background">
          {{ film.nameRu }}
        </v-card-title>
        <v-card-title
          v-else-if="film.nameRu === null && film.nameOriginal"
          color="background"
        >
          {{ film.nameOriginal }}
        </v-card-title>
        <v-card-title
          v-if="
            film.nameRu === null && film.nameOriginal === null && film.nameEn
          "
          color="background"
        >
          {{ film.nameEn }}
        </v-card-title>
        <v-sheet class="mt-2" color="background">
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
        </v-sheet>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-img max-heigh="900" max-width="600" :src="film.posterUrl" />
        </v-col>

        <v-col cols="8">
          {{ film.description }}

          <v-row no-gutters>
            <v-col cols="6">
              <v-sheet v-if="film.slogan" class="pt-2 mt-2" color="background">
                Слоган: {{ film.slogan }}
              </v-sheet>
            </v-col>

            <v-col cols="6">
              <v-row no-gutters>
                <v-col>
                  <v-sheet
                    v-if="film.ratingKinopoisk"
                    class="pt-2 mt-2"
                    color="background"
                  >
                    Kinopoisk: {{ film.ratingKinopoisk }}</v-sheet
                  >
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col>
                  <v-sheet
                    v-if="film.ratingKinopoiskVoteCount"
                    class="pt-2 mt-2"
                    color="background"
                  >
                    {{ film.ratingKinopoiskVoteCount }} оценок</v-sheet
                  >
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col>
                  <v-sheet
                    v-if="film.ratingImdb"
                    class="pt-2 mt-2"
                    color="background"
                  >
                    IMDB: {{ film.ratingImdb }}
                  </v-sheet>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col>
                  <v-sheet
                    v-if="film.ratingImdbVoteCount"
                    class="pt-2 mt-2"
                    color="background"
                  >
                    {{ film.ratingImdbVoteCount }} оценок</v-sheet
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-col>
              <v-sheet v-if="film.year" class="pt-2 mt-2" color="background">
                Релиз {{ film.year }} года</v-sheet
              >
            </v-col>

            <v-col>
              <v-sheet
                v-if="film.ratingAgeLimits"
                class="pt-2 mt-2"
                color="background"
              >
                Возраст:
                {{ film.ratingAgeLimits.replace(/^\D+/g, "") + "+" }}</v-sheet
              >
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col>
              <v-sheet class="mt-2" color="background">
                Ваша оценка:
                <v-rating
                  empty-icon="mdi-star-outline"
                  full-icon="mdi-star"
                  half-icon="mdi-star-half-full"
                  background-color="secondary"
                  half-increments
                  hover
                  length="10"
                  size="24"
                  v-model="rating"
                ></v-rating>
              </v-sheet>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
    <v-row justify="center">
      <v-card color="background" flat>
        <v-card-title>Также рекомендуем к просмотру</v-card-title>
      </v-card>
    </v-row>
    <v-row class="flex" align="center">
      <v-col cols="3" v-for="rec in similars" :film="rec" :key="rec.filmId">
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-card max-heigh="600" max-width="400">
              <v-img max-heigh="600" max-width="400" :src="rec.posterUrl" />
              <v-fade-transition>
                <v-overlay v-if="hover" absolute color="secondary" z-index="3">
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  created() {
    this.loadSavedFilmsObj();
    if (!this.showFilm.filmId) {
      this.loadShowFilmFromStore();
    }
    this.localStoreShowFilm();
    this.loadSaved();
    this.loadRating();
  },
  beforeMount() {
    this.fetchFilm();
    this.fetchSimilars();
  },
  data: () => ({
    film: {},
    similars: [],
  }),
  methods: {
    ...mapActions("films", {
      saveInFavs: "saveInFavs",
      deleteFromFavs: "deleteFromFavs",
    }),
    ...mapMutations("films", {
      addToRated: "addToRated",
      setSaved: "setSaved",
      setRated: "setRated",
      loadSaved: "loadSaved",
      loadRating: "loadRating",
      loadSavedFilmsObj: "loadSavedFilmsObj",
      localStoreShowFilm: "localStoreShowFilm",
      loadShowFilmFromStore: "loadShowFilmFromStore",
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
    async fetchSimilars() {
      const response = await axios.get(
        "https://kinopoiskapiunofficial.tech/api/v2.2/films/" +
          this.showFilm.filmId +
          "/similars",
        {
          headers: {
            "X-API-KEY": "5a083dfc-2af6-456d-bc14-2f6adbae7052",
            "Content-Type": "application/json",
          },
        }
      );
      this.similars = response.data.items;
    },
    async fetchFilm() {
      const response = await axios.get(
        "https://kinopoiskapiunofficial.tech/api/v2.2/films/" +
          this.$route.query.id,
        {
          headers: {
            "X-API-KEY": "5a083dfc-2af6-456d-bc14-2f6adbae7052",
            "Content-Type": "application/json",
          },
        }
      );
      this.film = response.data;
    },
  },
  computed: {
    ...mapState("films", {
      showFilm: (state) => state.showFilm,
      savedFilms: (state) => state.savedFilms,
      ratedFilms: (state) => state.ratedFilms,
      savedFilmsObj: (state) => state.savedFilmsObj,
    }),
    rating: {
      get() {
        let idFilms = this.ratedFilms.map((id) => id.filmId);
        if (idFilms.includes(this.film.kinopoiskId)) {
          return this.ratedFilms[idFilms.indexOf(this.film.kinopoiskId)]
            .userRating;
        } else {
          return Math.round(this.film.ratingKinopoisk * 2) / 2;
        }
      },
      set(newValue) {
        let newFilm = {
          filmId: this.film.kinopoiskId,
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
