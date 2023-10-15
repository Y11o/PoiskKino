<template>
  <v-container fluid>
    <v-row class="flex" align="center" dense>
      <v-spacer></v-spacer>
      <v-col cols="3">
        <v-text-field
          label="Введите название или описание фильма"
          v-model="findByKeyword"
          clearable
          @keydown.enter="findFilms()"
        ></v-text-field>
      </v-col>
      <v-col cols="5">
        <v-btn icon @click="findFilms()">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-col>
    </v-row>
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
