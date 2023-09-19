<template>
  <v-container>
    <v-row>
      <Film v-for="film in films" :film="film" :key="film.id" />
    </v-row>
  </v-container>
</template>

<script>
import Film from "@/components/Film.vue";
export default {
  components: {
    Film,
  },
  data: () => ({
    films: [],
  }),
  mounted() {
    this.fetchFilms();
  },
  methods: {
    fetchFilms() {
      const url = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
      fetch(url, {
        method: "GET",
        headers: {
          "X-API-KEY": "5a083dfc-2af6-456d-bc14-2f6adbae7052",
          "Content-Type": "application/json",
        },
      }) 
        .then((res) => res.json())
        .then((json) => this.films = json.films)
        .catch((err) => console.log(err));
    },
  },
};
</script>