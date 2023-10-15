<template>
  <v-app :class="{ 'theme--dark': isDark }">
    <Navbar />
    <v-main><router-view /></v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    Navbar,
  },
  computed: {
    ...mapState("films", {
      isDark: "isDark",
    }),
  },
};
</script>
