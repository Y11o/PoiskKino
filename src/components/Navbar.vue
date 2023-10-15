<template>
  <v-container fluid>
    <v-app-bar app color="surface" dense hide-on-scroll>
      <v-toolbar-title class="flex text-center" color="primary">
        <h2 class="white--text">POISK KINO</h2>
      </v-toolbar-title>
      <v-btn icon v-if="!isDark" @click="toggleTheme()">
        <v-icon>mdi-lightbulb-on</v-icon>
      </v-btn>
      <v-btn icon v-else @click="toggleTheme()">
        <v-icon>mdi-lightbulb-outline</v-icon>
      </v-btn>
      <template v-slot:extension>
        <v-tabs fixed-tabs show-arrows class="mr-16" color="surface">
          <v-tab :class="class1" to="/"> Главная </v-tab>
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
    }),
    appBarColor() {
      return this.isDark ? "primary" : "surface";
    },
    class1() {
      return this.isDark ? "primary" : "white--text";
    },
  },
  methods: {
    ...mapMutations("films", {
      toggleTheme: "toggleTheme",
    }),
  },
};
</script>
