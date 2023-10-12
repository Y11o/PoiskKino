<template>
  <v-container fluid>
    <v-pagination
      v-if="keyWord === ''"
      v-model="pageSelected"
      :length="totalSavedFilmsListPages"
      :total-visible="Math.ceil(totalSavedFilmsListPages / 2) + 1"
      circle
    ></v-pagination>
    <v-row class="flex" align="center">
      <v-spacer></v-spacer>
      <v-col cols="3">
        <v-text-field
          label="Введите название или описание фильма"
          v-model="keyWord"
          clearable
          @keydown.enter="filterSavedFilms()"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-btn icon @click="filterSavedFilms()">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="flex" align="center">
      <Film v-for="film in savedFilmsObjOnPage" :film="film" :key="film.id" />
    </v-row>
    <FilmDialog />
    <div class="text-center">
      <v-pagination
        v-if="keyWord === ''"
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
  created() {
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
    keyWord: "",
  }),
  methods: {
    ...mapMutations("films", {
      changePageSaved: "changePageSaved",
      loadSaved: "loadSaved",
      loadRating: "loadRating",
      loadSavedFilmsObj: "loadSavedFilmsObj",
    }),
    filterSavedFilms() {
      if (!this.keyWord === "") {
        let nameRuFilter = this.savedFilmsObj.filter((film) =>
          film.nameRu.toLowerCase().includes(keyWord.toLowerCase())
        );
        let nameEnFilter = this.savedFilmsObj.filter((film) =>
          film.nameEn.toLowerCase().includes(keyWord.toLowerCase())
        );
        console.log(nameRuFilter.concat(nameEnFilter));
        this.getFilmsOnPage(nameRuFilter.concat(nameEnFilter));
      } else {
        this.getFilmsOnPage(this.savedFilmsObj);
      }
    },
    getFilmsOnPage(filmsArray) {
      if (filmsArray.length < 20 + 20 * (this.currentSavedFilmsPage - 1)) {
        this.savedFilmsObjOnPage = filmsArray.slice(
          20 * (this.currentSavedFilmsPage - 1),
          filmsArray.length
        );
      } else {
        this.savedFilmsObjOnPage = filmsArray.slice(
          0 + 20 * (this.currentSavedFilmsPage - 1),
          20 + 20 * (this.currentSavedFilmsPage - 1)
        );
      }
    },
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
        this.changePageSaved(newValue);
        this.getFilmsOnPage(this.savedFilmsObj);
      },
    },
  },
};
</script>