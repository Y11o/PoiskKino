import Vue from "vue";
import Vuex from "vuex";
import filmsModule from "@/store/filmsModule.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    filmsModule,
  },
});

export default store;
