<template>
  <v-container fluid>
    <v-pagination
      v-model="pageSelected"
      :length="totalSavedFilmsListPages"
      :total-visible="Math.ceil(totalSavedFilmsListPages / 2) + 1"
      circle
    ></v-pagination>
    <v-row class="flex" align="center">
      <v-spacer></v-spacer>
      <v-col cols="3">
        <v-text-field
          label="Введите название фильма"
          v-model="keyWord"
          clearable
          @keydown.enter="filterSavedFilms()"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-btn icon @click="filterSavedFilms()">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <FilterSettings />
      </v-col>
    </v-row>
    <FilterSheet v-if="showFilterSettings" />
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
import FilterSettings from "@/components/Favourites/FilterSettings.vue";
import FilterSheet from "@/components/Favourites/FilterSheet.vue";
import { mapMutations, mapState, mapActions } from "vuex";

export default {
  components: {
    Film,
    FilmDialog,
    FilterSettings,
    FilterSheet,
  },
  created() {
    this.loadSavedFilmsObj();
    this.loadSaved();
    this.loadRating();
    console.log(this.savedFilmsObj[0]);
    this.getFilmsOnPage(this.savedFilmsObj);
  },
  methods: {
    ...mapActions("films", {
      filterSavedFilms: "filterSavedFilms",
      getFilmsOnPage: "getFilmsOnPage",
    }),
    ...mapMutations("films", {
      changePageSaved: "changePageSaved",
      loadSaved: "loadSaved",
      loadRating: "loadRating",
      loadSavedFilmsObj: "loadSavedFilmsObj",
      setTotalSavedFilmsListPages: "setTotalSavedFilmsListPages",
      changeSavedKeyword: "changeSavedKeyword",
    }),
  },
  computed: {
    ...mapState("films", {
      savedFilmsObj: (state) => state.savedFilmsObj,
      currentSavedFilmsPage: (state) => state.currentSavedFilmsPage,
      totalSavedFilmsListPages: (state) => state.totalSavedFilmsListPages,
      showFilterSettings: (state) => state.showFilterSettings,
      savedKeyword: (state) => state.savedKeyword,
      savedFilmsObjOnPage: (state) => state.savedFilmsObjOnPage,
    }),
    pageSelected: {
      get() {
        return this.currentSavedFilmsPage;
      },
      set(newValue) {
        this.changePageSaved(newValue);
        this.filterSavedFilms();
      },
    },
    keyWord: {
      get() {
        return this.savedKeyword;
      },
      set(newValue) {
        this.changeSavedKeyword(newValue);
      },
    },
  },
};
</script>
