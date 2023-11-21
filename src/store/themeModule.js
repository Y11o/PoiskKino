import Vuetify from "@/plugins/vuetify.js";
import {
  peachLightAccent,
  peachDarkAccent,
  indigoLightAccent,
  indigoDarkAccent,
} from "@/styles/accents/Accents.js";

export default {
  state: {
    localStoredTheme: {},
    isDark: false,
    currAccent: 0,
    accentList: ["Switch on theme", "Indigo", "Peach"],
    lightT: {},
    darkT: {},
    peachLightAccent: peachLightAccent,
    peachDarkAccent: peachDarkAccent,
    indigoLightAccent: indigoLightAccent,
    indigoDarkAccent: indigoDarkAccent,
  },
  mutations: {
    toggleAccent(state, payload) {
      console.log(peachLightAccent, peachDarkAccent, indigoLightAccent, indigoDarkAccent);
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
