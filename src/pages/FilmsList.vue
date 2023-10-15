<template>
  <v-container fluid>
    <ListPagination />
    <ListKeyWord />
    <v-row class="flex" align="center">
      <Film v-for="film in films" :film="film" :key="film.id" />
    </v-row>
    <FilmDialog />
    <ListPagination />
  </v-container>
</template>

<script>
import Film from "@/components/Film.vue";
import FilmDialog from "@/components/FilmDialog.vue";
import ListPagination from "@/components/FilmList/ListPagination.vue";
import ListKeyWord from "@/components/FilmList/ListKeyWord.vue";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  components: {
    Film,
    FilmDialog,
    ListPagination,
    ListKeyWord,
  },
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
      loadSaved: "loadSaved",
      loadRating: "loadRating",
    }),
  },
  computed: {
    ...mapState("films", {
      films: (state) => state.films,
      showFilterSettings: (state) => state.showFilterSettings,
    }),
  },
};
</script>
