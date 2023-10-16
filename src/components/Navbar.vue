<template>
  <v-container fluid>
    <v-app-bar app color="primary" dense hide-on-scroll>
      <v-toolbar-title class="flex text-center">
        <h2 class="white--text">POISK KINO</h2>
      </v-toolbar-title>
      <v-btn icon v-if="accent === 0" @click="switchAccent()" class="white--text">
        <v-icon>mdi-brush</v-icon>
      </v-btn>
      <v-btn icon v-if="accent === 1" @click="switchAccent()" class="white--text">
        <v-icon>mdi-palette</v-icon>
      </v-btn>
      <v-btn icon v-if="accent === 2" @click="switchAccent()" class="white--text">
        <v-icon>mdi-invert-colors</v-icon>
      </v-btn>
      <v-btn icon v-if="!isDark" @click="toggleTheme()" class="white--text">
        <v-icon>mdi-lightbulb-on</v-icon>
      </v-btn>
      <v-btn icon v-else @click="toggleTheme()" class="white--text">
        <v-icon>mdi-lightbulb-outline</v-icon>
      </v-btn>
      <template v-slot:extension>
        <v-tabs fixed-tabs show-arrows class="mr-16" active-class="surface">
          <v-tab class="white--text" to="/"> Главная </v-tab>
          <v-tab class="white--text" to="/saved"> Избранное </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState("films", {
      isDark: "isDark",
      accent: "accent",
    }),
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      this.toggleStoreTheme();
    },
    switchAccent() {
      this.toggleAccent((this.accent + 1) % 3);
    },
    ...mapMutations("films", {
      toggleStoreTheme: "toggleStoreTheme",
      toggleAccent: "toggleAccent",
    }),
  },
};
</script>
