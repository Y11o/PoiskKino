import Vue from "vue";
import Vuex from "vuex";
import filmsModule from "@/store/filmsModule.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    filmsModule,
  },
});
