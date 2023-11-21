import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import {
  peachLightAccent,
  indigoDarkAccent,
} from "@/styles/accents/Accents.js";

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: peachLightAccent,
      dark: indigoDarkAccent,
    },
  },
});

export default vuetify;
