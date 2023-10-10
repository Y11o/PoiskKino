<template>
  <v-container fluid>
    <v-pagination
      v-model="pageSelected"
      :length="totalFilmListPages"
      :total-visible="Math.ceil(totalFilmListPages / 2) + 1"
      circle
    ></v-pagination>
    <v-row class="flex" align="center">
      <v-spacer></v-spacer>
      <v-col cols="3">
        <v-text-field
          label="Введите название или описание фильма"
          v-model="findByKeyword"
          clearable
          @keydown.enter="findFilms()"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-btn icon @click="findFilms()">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="flex" align="center">
      <Film v-for="film in films" :film="film" :key="film.id" />
    </v-row>
    <FilmDialog />
    <div class="text-center">
      <v-pagination
        v-model="pageSelected"
        :length="totalFilmListPages"
        :total-visible="Math.ceil(totalFilmListPages / 2) + 1"
        circle
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
import Film from "@/components/Film.vue";
import FilmDialog from "@/components/FilmDialog.vue";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  components: {
    Film,
    FilmDialog,
  },
  data: () => ({}),
  created() {
    this.fetchFilms();
    this.loadSaved();
    this.loadRating();
  },
  methods: {
    ...mapActions("films", {
      fetchFilms: "fetchFilms",
    }),
    ...mapMutations("films", {
      changePage: "changePage",
      setFilmKeyword: "setFilmKeyword",
      loadSaved: "loadSaved",
      loadRating: "loadRating",
    }),
    findFilms() {
      this.fetchFilms();
    },
  },
  computed: {
    ...mapState("films", {
      films: (state) => state.films,
      currentPage: (state) => state.currentPage,
      totalFilmListPages: (state) => state.totalFilmListPages,
      filmKeyword: (state) => state.filmKeyword,
    }),
    pageSelected: {
      get() {
        return this.currentPage;
      },
      set(newValue) {
        this.changePage(newValue);
        this.fetchFilms();
      },
    },
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