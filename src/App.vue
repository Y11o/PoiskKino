<template>
  <v-app>
    <Navbar />
    <v-main class="background"><router-view /></v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { mapActions } from "vuex";
export default {
  name: "App",
  components: {
    Navbar,
  },
  beforeMount() {
    this.loadLocalStoredTheme();
  },
  methods: {
    ...mapActions("themes", {
      loadLocalStoredTheme: "loadLocalStoredTheme",
    }),
  },
};
</script>
