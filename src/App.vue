<template>
  <v-app>
    <Navbar />
    <v-main class="background"><router-view /></v-main>
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
