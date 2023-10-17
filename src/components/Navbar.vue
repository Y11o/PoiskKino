<template>
  <v-container fluid>
    <v-app-bar app color="primary" dense hide-on-scroll>
      <v-sheet class="pa-0 ma-0" color="primary" v-if="!adaptiveSizing">
        <v-btn
          icon
          v-if="accent === 0"
          @click="switchAccent()"
          class="white--text"
        >
          <v-icon>mdi-brush</v-icon>
        </v-btn>
        <v-btn
          icon
          v-if="accent === 1"
          @click="switchAccent()"
          class="white--text"
        >
          <v-icon>mdi-palette</v-icon>
        </v-btn>
        <v-btn
          icon
          v-if="accent === 2"
          @click="switchAccent()"
          class="white--text"
        >
          <v-icon>mdi-invert-colors</v-icon>
        </v-btn>
      </v-sheet>
      <v-toolbar-title :class="`flex text-center ${adaptiveSizing?'pl-4 ml-16':'pl-0 ml-0 mr-3'}`">
        <h2 class="white--text">POISK KINO</h2>
      </v-toolbar-title>
      <v-sheet class="pa-0 ma-0" color="primary" v-if="adaptiveSizing">
        <v-btn
          icon
          v-if="accent === 0"
          @click="switchAccent()"
          class="white--text"
        >
          <v-icon>mdi-brush</v-icon>
        </v-btn>
        <v-btn
          icon
          v-if="accent === 1"
          @click="switchAccent()"
          class="white--text"
        >
          <v-icon>mdi-palette</v-icon>
        </v-btn>
        <v-btn
          icon
          v-if="accent === 2"
          @click="switchAccent()"
          class="white--text"
        >
          <v-icon>mdi-invert-colors</v-icon>
        </v-btn>
      </v-sheet>
      <v-sheet class="pa-0 ma-0" color="primary">
        <v-btn icon v-if="!isDark" @click="toggleTheme()" class="white--text">
          <v-icon>mdi-lightbulb-on</v-icon>
        </v-btn>
        <v-btn icon v-else @click="toggleTheme()" class="white--text">
          <v-icon>mdi-lightbulb-outline</v-icon>
        </v-btn>
      </v-sheet>
      <template v-slot:extension>
        <v-tabs fixed-tabs show-arrows centered active-class="surface">
          <v-tab class="white--text" to="/"> Главная </v-tab>
          <v-tab class="white--text" to="/saved"> Избранное </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("themes", {
      isDark: "isDark",
      accent: "accent",
    }),
    adaptiveSizing() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return false;
        case "sm":
          return false;
        case "md":
          return true;
        case "lg":
          return true;
        case "xl":
          return true;
      }
    },
  },
  beforeUnmount() {
    this.setLocalStoredTheme();
  },
  beforeMount() {
    this.$vuetify.theme.dark = this.isDark;
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      this.toggleStoreTheme(!this.isDark);
      this.setLocalStoredTheme();
    },
    switchAccent() {
      this.toggleAccent((this.accent + 1) % 3);
      this.setLocalStoredTheme();
    },
    ...mapMutations("themes", {
      toggleStoreTheme: "toggleStoreTheme",
      toggleAccent: "toggleAccent",
      setLocalStoredTheme: "setLocalStoredTheme",
    }),
  },
};
</script>
