<template>
  <v-container fluid>
    <v-toolbar dark color="secondary" class="mb-1">
      <v-row class="flex" align="center" justify="center">
        <v-spacer />
        <v-col cols="8" sm="5">
          <v-text-field
            flat
            solo-inverted
            hide-details
            label="Введите название или описание фильма"
            v-model="findByKeyword"
            clearable
            @keydown.enter="findFilms()"
            @blur="findFilms()"
          />
        </v-col>
        <v-col>
          <v-btn icon @click="findFilms()">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-toolbar>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  methods: {
    ...mapMutations("films", {
      setFilmKeyword: "setFilmKeyword",
    }),
    ...mapActions("films", {
      fetchFilms: "fetchFilms",
    }),
    ...mapMutations("films", {
      setFilmKeyword: "setFilmKeyword",
    }),
    findFilms() {
      this.fetchFilms();
    },
  },
  computed: {
    ...mapState("films", {
      films: (state) => state.films,
      filmKeyword: (state) => state.filmKeyword,
    }),
    findByKeyword: {
      get() {
        return this.filmKeyword;
      },
      set(newValue) {
        this.setFilmKeyword(newValue);
      },
    },
  },
};
</script>
