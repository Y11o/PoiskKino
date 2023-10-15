import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import store from "@/store/index.js";

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        background: "#eee",
        surface: "#ff5722",
        primary: "#f85b49",
        secondary: "#00ccff",
        error: "#ffcc00",
      },
      dark: {
        background: "#15202b",
        surface: "#15202b",
        primary: "#f85b49",
        secondary: "#03dac6",
        error: "#ff5722",
      },
    },
  },
});

store.watch(
  (state) => state.isDark,
  (newVal) => {
    vuetify.framework.theme.dark = newVal;
  }
);

export default vuetify;
