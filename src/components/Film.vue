<template>
  <v-col cols="3" >
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-card max-heigh="600" max-width="400" @click="showMore">
          <v-img max-heigh="600" max-width="400" :src="film.posterUrl" />
          <v-fade-transition>
            <v-overlay v-if="hover" absolute color="secondary" z-index="3">
            </v-overlay>
          </v-fade-transition>
        </v-card>
      </template>
    </v-hover>
  </v-col>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data: () => ({
    overlay: false,
  }),
  props: {
    film: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapMutations("films", {
      setShowFilm: "setShowFilm",
      showFilmDialog: "showFilmDialog",
    }),
    showMore() {
      this.setShowFilm(this.film);
      this.showFilmDialog();
    },
  },
};
</script>
