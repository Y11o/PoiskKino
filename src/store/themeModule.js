import colors from "vuetify/lib/util/colors";
import Vuetify from "@/plugins/vuetify.js";

export default {
  state: {
    localStoredTheme: {},
    isDark: false,
    accent: 0,
    lightT: {},
    darkT: {},
  },
  mutations: {
    toggleAccent(state, payload) {
      state.accent = payload;
      switch (state.accent) {
        case 0:
          state.lightT = {
            background: colors.grey.lighten3,
            surface: "#FF6633",
            primary: colors.deepOrange,
            secondary: "#FF9966",
            error: colors.red.darken4,
          };
          state.darkT = {
            background: colors.grey.darken4,
            surface: colors.indigo.darken3,
            primary: colors.indigo,
            secondary: colors.indigo.lighten1,
            error: colors.red.darken4,
          };
          break;
        case 1:
          state.lightT = {
            background: colors.grey.lighten3,
            surface: colors.indigo.darken3,
            primary: colors.indigo,
            secondary: colors.indigo.lighten1,
            error: colors.red.darken4,
          };
          state.darkT = {
            background: colors.grey.darken4,
            surface: colors.indigo.darken3,
            primary: colors.indigo,
            secondary: colors.indigo.lighten1,
            error: colors.red.darken4,
          };
          break;
        case 2:
          state.lightT = {
            background: colors.grey.lighten3,
            surface: "#FF6633",
            primary: colors.deepOrange,
            secondary: "#FF9966",
            error: colors.red.darken4,
          };
          state.darkT = {
            background: colors.grey.darken4,
            surface: "#FF6633",
            primary: colors.deepOrange,
            secondary: "#FF9966",
            error: colors.red.darken4,
          };
          break;
        default:
          break;
      }
      Vuetify.framework.theme.themes.dark = state.darkT;
      Vuetify.framework.theme.themes.light = state.lightT;
    },
    toggleStoreTheme(state, payload) {
      state.isDark = payload;
    },
    setLocalStoredTheme(state) {
      state.localStoredTheme = {
        accent: state.accent,
        isDark: state.isDark,
      };
      localStorage.setItem(
        "storedTheme",
        JSON.stringify(state.localStoredTheme)
      );
    },
  },
  actions: {
    loadLocalStoredTheme(context) {
      if (localStorage.storedTheme) {
        context.state.localStoredTheme = JSON.parse(localStorage.storedTheme);
        context.state.accent = context.state.localStoredTheme.accent;
        context.state.isDark = context.state.localStoredTheme.isDark;
        context.commit("toggleAccent", context.state.localStoredTheme.accent);
        context.commit(
          "toggleStoreTheme",
          context.state.localStoredTheme.isDark
        );
      }
    },
  },
  namespaced: true,
};
