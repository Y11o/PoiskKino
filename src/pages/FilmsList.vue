<template>
  <!-- Компонент, отображающий страницу с фильмами, полученными от API -->
  <v-container fluid>
    <!-- Пагинация -->
    <ListPagination />
    <!-- Поиск по ключевым словам -->
    <ListKeyWord />
    <!-- Отрисовка карточек с фильмами -->
    <v-row align="center" justify="center" class="pa-0 ma-0">
      <!-- Компонент карточки фильма -->
      <Film v-for="film in films" :film="film" :key="film.id" />
    </v-row>
    <!-- Диалог открывается при нажатии. По нему осуществляется переход на страницу фильма. Отображает более подробную информацию о фильме -->
    <FilmDialog />
    <!-- Пагинация -->
    <ListPagination />
  </v-container>
</template>

<script>
import Film from "@/components/Film.vue";
import FilmDialog from "@/components/FilmDialog.vue";
import ListPagination from "@/components/FilmList/ListPagination.vue";
import ListKeyWord from "@/components/FilmList/ListKeyWord.vue";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  components: {
    Film,
    FilmDialog,
    ListPagination,
    ListKeyWord,
  },
  created() {
    this.fetchFilms();  //Запрос к API с фильмами
    this.loadSaved();   //Загрузка избранных из localStorage
    this.loadRating();  //Загрузка оцененных из localStorage
  },
  methods: {
    ...mapActions("films", {
      fetchFilms: "fetchFilms",
    }),
    ...mapMutations("films", {
      loadSaved: "loadSaved",
      loadRating: "loadRating",
    }),
  },
  computed: {
    ...mapState("films", {
      films: (state) => state.films,
      showFilterSettings: (state) => state.showFilterSettings,
    }),
  },
};
</script>
