<template>
  <v-container fluid>
    <v-pagination
      v-model="pageSelected"
      :length="totalFilmListPages"
      :total-visible="Math.ceil(totalFilmListPages / 2)"
      circle
    ></v-pagination>
    <v-row class="flex" align="center">
      <Film v-for="film in films" :film="film" :key="film.id" />
    </v-row>
    <FilmDialog />
    <div class="text-center">
      <v-pagination
        v-model="pageSelected"
        :length="totalFilmListPages"
        :total-visible="Math.ceil(totalFilmListPages / 2)"
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
  created() {
    this.fetchFilms();
  },
  methods: {
    ...mapActions("films", {
      fetchFilms: "fetchFilms",
    }),
    ...mapMutations("films", {
      changePage: "changePage",
    }),
  },
  computed: {
    ...mapState("films", {
      films: (state) => state.films,
      currentPage: (state) => state.currentPage,
      totalFilmListPages: (state) => state.totalFilmListPages,
    }),
    pageSelected: {
      get() {
        return this.currentPage;
      },
      set(newValue){
        this.changePage(newValue);
        this.fetchFilms();
      },
    },
  },
};
</script>