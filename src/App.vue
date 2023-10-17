<template>
  <v-app>
    <!-- Компонент навигации -->
    <Navbar /> 
    <!-- Содержание сайта -->
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
  beforeMount() { //Загрузка настроек темы из localStorage
    this.loadLocalStoredTheme();
  },
  methods: {
    ...mapActions("themes", {
      loadLocalStoredTheme: "loadLocalStoredTheme",
    }),
  },
};
</script>
