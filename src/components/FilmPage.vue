<template>
  <v-container fluid>
    <v-card>
      {{ film.nameOriginal }}
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  beforeMount() {
    this.fetchFilm();
  },
  data: () => ({
    film: {},
  }),
  methods: {
    async fetchFilm() {
      const response = await axios.get(
        "https://kinopoiskapiunofficial.tech/api/v2.2/films/" +
          this.$route.query.id,
        {
          headers: {
            "X-API-KEY": "5a083dfc-2af6-456d-bc14-2f6adbae7052",
            "Content-Type": "application/json",
          },
        }
      );
      this.film = response.data;
    },
  },
};
</script>