<template>
  <v-container fluid>
    <SavedPaginations />
    <SavedSearch />
    <FilterSheet v-if="showFilterSettings" />
    <v-row class="flex" align="center">
      <Film v-for="film in savedFilmsObjOnPage" :film="film" :key="film.id" />
    </v-row>
    <FilmDialog />
    <SavedPaginations />
  </v-container>
</template>

<script>
import Film from "@/components/Film.vue";
import FilmDialog from "@/components/FilmDialog.vue";
import FilterSheet from "@/components/Favourites/FilterSheet.vue";
import SavedPaginations from "@/components/Favourites/SavedPagination.vue";
import SavedSearch from "@/components/Favourites/SavedSearch.vue";
import { mapMutations, mapState, mapActions } from "vuex";

export default {
  components: {
    Film,
    FilmDialog,
    FilterSheet,
    SavedPaginations,
    SavedSearch,
  },
  created() {
    this.loadSavedFilmsObj();
    this.loadSaved();
    this.loadRating();
    this.searchSavedFilms();
    console.log(this.savedFilmsObjOnPage);
  },
  methods: {
    ...mapActions("films", {
      searchSavedFilms: "searchSavedFilms",
    }),
    ...mapMutations("films", {
      loadSaved: "loadSaved",
      loadRating: "loadRating",
      loadSavedFilmsObj: "loadSavedFilmsObj",
    }),
  },
  computed: {
    ...mapState("films", {
      showFilterSettings: (state) => state.showFilterSettings,
      savedFilmsObjOnPage: (state) => state.savedFilmsObjOnPage,
    }),
  },
};
</script>
