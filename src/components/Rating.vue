<template>
  <!-- Компонент интерактивного рейтинга -->
  <v-rating
    empty-icon="mdi-star-outline"
    full-icon="mdi-star"
    half-icon="mdi-star-half-full"
    background-color="secondary"
    half-increments
    hover
    length="10"
    :size="ratingSize"
    v-model="rating"
  />
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  methods: {
    ...mapMutations("films", {
      addToRated: "addToRated",
      setRated: "setRated",
    }),
    ...mapActions("films", {
      saveInFavs: "saveInFavs",
    }),
  },
  computed: {
    ...mapState("films", {
      showFilm: (state) => state.showFilm,
      ratedFilms: (state) => state.ratedFilms,
      savedFilmsObj: (state) => state.savedFilmsObj,
    }),
    //Определение размеров пунктов рейтинга в зависимости от размеров устройства
    ratingSize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 18;
        case "sm":
          return 22;
        case "md":
          return 32;
        case "lg":
          return 36;
        case "xl":
          return 40;
      }
    },
    rating: {
      //Если пользователь не оценил фильм, то отображается рейтинг Кинопоиска с точностью до 0.5 (пункт заполняется на половину)
      get() {
        let idFilms = this.ratedFilms.map((id) => id.filmId);
        if (idFilms.includes(this.showFilm.filmId)) {
          return this.ratedFilms[idFilms.indexOf(this.showFilm.filmId)]
            .userRating;
        } else {
          return Math.round(this.showFilm.rating * 2) / 2;
        }
      },
      //При оценке пользователем фильма
      set(newValue) {
        let newFilm = {
          filmId: this.showFilm.filmId,
          userRating: newValue,
        };
        if (!this.savedFilmsObj.includes(this.showFilm)) {
          let ratedAdd = {
            film: this.showFilm,
            saved: false,
          };
          this.saveInFavs(ratedAdd);
        }
        this.addToRated(newFilm);
        this.setRated();
      },
    },
  },
};
</script>
