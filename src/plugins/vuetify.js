import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        background: colors.grey.lighten3,
        surface: "#FF6633",
        primary: colors.deepOrange,
        secondary: "#FF9966",
        error: colors.red.darken4,
      },
      dark: {
        background: colors.grey.darken4,
        surface: colors.indigo.darken3,
        primary: colors.indigo,
        secondary: colors.indigo.lighten1,
        error: colors.red.darken4,
      },
    },
  },
});

export default vuetify;
