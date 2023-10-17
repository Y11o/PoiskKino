import Vue from "vue";
import Vuex from "vuex";
import filmsModule from "@/store/filmsModule.js";
import themeModule from "@/store/themeModule.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    films: filmsModule,
    themes: themeModule,
  },
});

export default store;
