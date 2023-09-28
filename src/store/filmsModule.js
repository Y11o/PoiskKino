import axios from "axios";

export default {
  state: {
    films: [],
    dialogVisible: false,
    currentPage: 1,
    showFilm: {},
  },
  getters: {
    getFilms(state) {
      return state.films;
    },
    getDialogVisible(state) {
      return state.dialogVisible;
    },
    getShowFilm(state) {
      return state.showFilm;
    },
    getCurrentPage(state) {
      return state.currentPage;
    },
  },
  mutations: {
    setFilms(state, payload) {
      state.films = payload;
    },
    showFilmDialog(state) {
      state.dialogVisible = true;
    },
    hideFilmDialog(state) {
      state.dialogVisible = false;
    },
    changePage(state, page) {
      state.currentPage = page;
    },
    setShowFilm(state, payload) {
      state.showFilm = payload;
    },
  },
  actions: {
    fetchFilms(context, {commit, state}) {
      console.log(state);
      const response = axios.get(
        "https://kinopoiskapiunofficial.tech/api/v2.2/films/top",
        {
          params: {
            page: state.currentPage,
          },
          headers: {
            "X-API-KEY": "5a083dfc-2af6-456d-bc14-2f6adbae7052",
            "Content-Type": "application/json",
          },
        }
      );
      context.commit("setFilms", response.data.films);
    },
  },
};
