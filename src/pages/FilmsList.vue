<template>
  <v-container>
    <Film 
        v-for="film in films" 
        :film="film" 
        :key="film.id" 
    />
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
    
  },
};
</script>