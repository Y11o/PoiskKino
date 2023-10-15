<template>
  <v-container fluid>
    <v-pagination
      v-model="pageSelected"
      :length="totalSavedFilmsListPages"
      :total-visible="Math.ceil(totalSavedFilmsListPages / 2) + 1"
      circle
    ></v-pagination>
  </v-container>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("films", {
      searchSavedFilms: "searchSavedFilms",
    }),
    ...mapMutations("films", {
      changePageSaved: "changePageSaved",
    }),
  },
  computed: {
    ...mapState("films", {
      currentSavedFilmsPage: (state) => state.currentSavedFilmsPage,
      totalSavedFilmsListPages: (state) => state.totalSavedFilmsListPages,
    }),
    pageSelected: {
      get() {
        return this.currentSavedFilmsPage;
      },
      set(newValue) {
        this.changePageSaved(newValue);
        this.searchSavedFilms();
      },
    },
  },
};
</script>
