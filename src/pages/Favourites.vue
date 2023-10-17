<template>
  <!-- Компонент, отображающий страницу с фильмами, сохраненными и/или оцененными пользователем -->
  <v-container fluid>
    <!-- Пагинация -->
    <SavedPaginations />
    <!-- Поиск по ключевым словам -->
    <SavedSearch />
    <!-- Компонент настройки фильтрации -->
    <FilterSheet v-if="showFilterSettings" />
    <!-- Отрисовка фильмов -->
    <v-row align="center" justify="center" class="pa-0 ma-0">
      <!-- Компонент карточки фильма -->
      <Film v-for="film in savedFilmsObjOnPage" :film="film" :key="film.id" />
    </v-row>
    <!-- Диалог открывается при нажатии. По нему осуществляется переход на страницу фильма. Отображает более подробную информацию о фильме -->
    <FilmDialog />
    <!-- Пагинация -->
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
    this.loadSavedFilmsObj(); //Загрузка оцененных и сохранненых объектов фильмов из localStorage
    this.loadSaved();         //Загрузка сохранненых фильмов из localStorage
    this.loadRating();        //Загрузка оцененных фильмов из localStorage
    this.searchSavedFilms();  //Загрузка оцененных и сохранненых объектов фильмов из localStorage
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
