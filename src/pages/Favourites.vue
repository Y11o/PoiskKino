<template>
  <v-container fluid>
    <v-pagination
      v-model="pageSelected"
      :length="totalSavedFilmsListPages"
      :total-visible="Math.ceil(totalSavedFilmsListPages / 2) + 1"
      circle
    ></v-pagination>
    <v-row class="flex" align="center">
      <Film v-for="film in savedFilmsObjOnPage" :film="film" :key="film.id" />
    </v-row>
    <FilmDialog />
    <div class="text-center">
      <v-pagination
        v-model="pageSelected"
        :length="totalSavedFilmsListPages"
        :total-visible="Math.ceil(totalSavedFilmsListPages / 2) + 1"
        circle
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
import Film from "@/components/Film.vue";
import FilmDialog from "@/components/FilmDialog.vue";
import { mapMutations, mapState } from "vuex";

export default {
  components: {
    Film,
    FilmDialog,
  },
  mounted() {
    this.loadSavedFilmsObj();
    this.loadSaved();
    this.loadRating();
    if (this.savedFilmsObj.length < 20) {
      this.savedFilmsObjOnPage = this.savedFilmsObj.slice(
        0,
        this.savedFilmsObj.length
      );
    } else {
      this.savedFilmsObjOnPage = this.savedFilmsObj.slice(0, 20);
    }
  },
  data: () => ({
    savedFilmsObjOnPage: [],
  }),
  methods: {
    ...mapMutations("films", {
      changePageSaved: "changePageSaved",
      loadSaved: "loadSaved",
      loadRating: "loadRating",
      loadSavedFilmsObj: "loadSavedFilmsObj",
    }),
  },
  computed: {
    ...mapState("films", {
      savedFilmsObj: (state) => state.savedFilmsObj,
      currentSavedFilmsPage: (state) => state.currentSavedFilmsPage,
      totalSavedFilmsListPages: (state) => state.totalSavedFilmsListPages,
    }),
    pageSelected: {
      get() {
        return this.currentSavedFilmsPage;
      },
      set(newValue) {
        if (this.savedFilmsObj.length < 20 + 20 * (newValue - 1)) {
          this.savedFilmsObjOnPage = this.savedFilmsObj.slice(
            20 * (newValue - 1),
            this.savedFilmsObj.length
          );
        } else {
          this.savedFilmsObjOnPage = this.savedFilmsObj.slice(
            0 + 20 * (newValue - 1),
            20 + 20 * (newValue - 1)
          );
        }
        this.changePageSaved(newValue);
      },
    },
  },
};
</script>