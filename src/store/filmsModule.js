import axios from "axios";

export default {
  state: {
    films: [],
    dialogVisible: false,
    currentPage: 1,
    showFilm: {},
    totalFilmListPages: 1,
    filmKeyword: "",
    savedFilms: [],
    ratedFilms: [],
  },
  getters: {
    getFilms: (state) => state.films,
    getDialogVisible: (state) => state.dialogVisible,
    getShowFilm: (state) => state.showFilm,
    getCurrentPage: (state) => state.currentPage,
    getTotalFilmListPages: (state) => state.totalFilmListPages,
  },
  mutations: {
    setFilms(state, response) {
      state.films = response;
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
    setTotalFilmListPages(state, payload) {
      state.totalFilmListPages = payload;
    },
    setFilmKeyword(state, payload) {
      state.filmKeyword = payload;
    },
    loadSaved(state) {
      if (localStorage.storedSaved) {
        let localStorSaved = [];
        localStorSaved = JSON.parse(localStorage.storedSaved);
        localStorSaved.forEach((element) => {
          state.savedFilms.push(JSON.parse(element));
        });
      }
    },
    loadRating(state) {
      if (localStorage.storedRating) {
        let parsedFilms = [];
        let storedRating = JSON.parse(localStorage.storedRating);
        for (let elem = 0; elem < storedRating.length; elem++) {
          parsedFilms.push({ filmId: 0, userRating: 0 });
          const filmParsed = JSON.parse(storedRating[elem]);
          parsedFilms[elem] = { ...filmParsed };
        }
        state.ratedFilms = parsedFilms;
      }
    },
    addToSaved(state, payload) {
      state.savedFilms.push(payload);
    },
    addToRated(state, newFilm) {
      let ratedId = state.ratedFilms.map((id) => id.filmId);
      if (ratedId.includes(newFilm.filmId)) {
        state.ratedFilms[state.ratedFilms.indexOf(newFilm.filmId)].userRating =
          newFilm.userRating;
      } else {
        state.ratedFilms.push(newFilm);
      }
    },
    deleteFromSaved(state, payload) {
      state.savedFilms = state.savedFilms.filter(
        (element) => element !== payload
      );
    },
    setSaved(state) {
      localStorage.setItem("storedSaved", JSON.stringify(state.savedFilms));
    },
    setRated(state) {
      localStorage.setItem("storedRating", JSON.stringify(state.ratedFilms));
    },
  },
  actions: {
    async fetchFilms(context) {
      if (
        context.state.filmKeyword === "" ||
        context.state.filmKeyword === null
      ) {
        const response = await axios.get(
          "https://kinopoiskapiunofficial.tech/api/v2.2/films/top",
          {
            params: {
              page: context.state.currentPage,
            },
            headers: {
              "X-API-KEY": "5a083dfc-2af6-456d-bc14-2f6adbae7052",
              "Content-Type": "application/json",
            },
          }
        );
        context.commit("setTotalFilmListPages", response.data.pagesCount);
        context.commit("setFilms", response.data.films);
      } else {
        const lastPage = context.state.currentPage;
        const response = await axios.get(
          "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword",
          {
            params: {
              keyword: context.state.filmKeyword,
              page: context.state.currentPage,
            },
            headers: {
              "X-API-KEY": "5a083dfc-2af6-456d-bc14-2f6adbae7052",
              "Content-Type": "application/json",
            },
          }
        );
        context.commit(
          "setTotalFilmListPages",
          Math.ceil(response.data.searchFilmsCountResult / 20) > 20
            ? 20
            : Math.ceil(response.data.searchFilmsCountResult / 20)
        ); //api возвращает неверное значение pagesCount. И не даёт вывести больше 20 страниц (запрос выдаёт ошибку)
        if (lastPage > context.state.totalFilmListPages) {
          context.state.currentPage = 1;
          context.dispatch("fetchFilms");
        }
        context.commit("setFilms", response.data.films);
      }
    },
  },
  namespaced: true,
};
