import colors from "vuetify/lib/util/colors";
import Vuetify from "@/plugins/vuetify.js";

export default {
  state: {
    localStoredTheme: {},
    isDark: false,
    currAccent: 0,
    accentList: ["Switch on theme", "Indigo", "Peach"],
    lightT: {},
    darkT: {},
    peachLightAccent: {
      background: colors.grey.lighten3,
      surface: "#FF6633",
      primary: colors.deepOrange,
      secondary: "#FF9966",
      error: colors.red.darken4,
    },
    peachDarkAccent: {
      background: colors.grey.darken4,
      surface: "#FF6633",
      primary: colors.deepOrange,
      secondary: "#FF9966",
      error: colors.red.darken4,
    },
    indigoLightAccent: {
      background: colors.grey.lighten3,
      surface: colors.indigo.darken3,
      primary: colors.indigo,
      secondary: colors.indigo.lighten1,
      error: colors.red.darken4,
    },
    indigoDarkAccent: {
      background: colors.grey.darken4,
      surface: colors.indigo.darken3,
      primary: colors.indigo,
      secondary: colors.indigo.lighten1,
      error: colors.red.darken4,
    },
  },
  mutations: {
    toggleAccent(state, payload) {
      state.currAccent = payload;
      switch (state.accentList[state.currAccent]) {
        case "Switch on theme":
          state.lightT = state.peachLightAccent;
          state.darkT = state.indigoDarkAccent;
          break;
        case "Indigo":
          state.lightT = state.indigoLightAccent;
          state.darkT = state.indigoDarkAccent;
          break;
        case "Peach":
          state.lightT = state.peachLightAccent;
          state.darkT = state.peachDarkAccent;
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
        currAccent: state.currAccent,
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
        context.state.currAccent = context.state.localStoredTheme.currAccent;
        context.state.isDark = context.state.localStoredTheme.isDark;
        context.commit(
          "toggleAccent",
          context.state.localStoredTheme.currAccent
        );
        context.commit(
          "toggleStoreTheme",
          context.state.localStoredTheme.isDark
        );
      }
    },
  },
  namespaced: true,
};
