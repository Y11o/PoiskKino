<template>
  <v-container fluid>
    <v-toolbar class="mb-1 elevation-0 pa-0" color="background">
      <v-row no-gutters class="flex" justify="center">
        <v-col cols="12">
          <v-pagination
            v-model="pageSelected"
            navigation-text-color="white"
            navigation-color="surface"
            color="secondary"
            :length="totalSavedFilmsListPages"
            :total-visible="paginationVisible"
            circle
          />
        </v-col>
      </v-row>
    </v-toolbar>
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
    paginationVisible() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return Math.ceil(this.totalSavedFilmsListPages / 4) + 1;
        default:
          return Math.ceil(this.totalSavedFilmsListPages / 2) + 1;
      }
    },
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
