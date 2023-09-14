<template>
  <v-container>
    <v-row>
      <Film 
        v-for="film in films" 
        :film="film" 
        :key="film.id" 
      />
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
    //this.axios.get();
  },
};
</script>