<template>
  <v-container fluid>
    <v-toolbar class="mb-1 elevation-0 pa-0 background">
      <v-row no-gutters class="flex" justify="center">
        <v-col cols="12">
          <v-pagination
            v-model="pageSelected"
            navigation-text-color="white"
            navigation-color="surface"
            color="secondary"
            :length="totalFilmListPages"
            :total-visible="paginationVisible"
            circle
          ></v-pagination>
        </v-col>
      </v-row>
    </v-toolbar>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState("films", {
      currentPage: (state) => state.currentPage,
      totalFilmListPages: (state) => state.totalFilmListPages,
    }),
    paginationVisible() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return Math.ceil(this.totalFilmListPages / 4) + 1;
        default:
          return Math.ceil(this.totalFilmListPages / 2) + 1;
      }
    },
    pageSelected: {
      get() {
        return this.currentPage;
      },
      set(newValue) {
        this.changePage(newValue);
        this.fetchFilms();
      },
    },
  },
  methods: {
    ...mapActions("films", {
      fetchFilms: "fetchFilms",
    }),
    ...mapMutations("films", {
      changePage: "changePage",
    }),
  },
};
</script>
