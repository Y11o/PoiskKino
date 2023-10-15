<template>
  <v-container fluid>
    <v-row>
      <v-col cols="11">
        <v-pagination
          v-model="pageSelected"
          :length="totalFilmListPages"
          :total-visible="Math.ceil(totalFilmListPages / 2) + 1"
          circle
        ></v-pagination>
      </v-col>
    </v-row>
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
