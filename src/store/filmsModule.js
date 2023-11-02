import axios from "axios";

export default {
  //Здесь описана логика работы с API, с сохраненными и оцененными фильмами
  state: {
    films: [],
    dialogVisible: false,
    currentPage: 1,
    currentSavedFilmsPage: 1,
    showFilm: {},
    totalFilmListPages: 1,
    totalSavedFilmsListPages: 1,
    filmKeyword: "",
    savedFilms: [],
    ratedFilms: [],
    savedFilmsObj: [],
    showFilterSettings: false,
    filterSettings: {},
    savedKeyword: "",
    savedFilmsObjOnPage: [],
    chronoSort: 0,
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
    changePageSaved(state, page) {
      state.currentSavedFilmsPage = page;
    },
    setShowFilm(state, payload) {
      state.showFilm = payload;
    },
    setShowFilterSettings(state, payload) {
      state.showFilterSettings = payload;
    },
    setTotalFilmListPages(state, payload) {
      state.totalFilmListPages = payload;
    },
    setTotalSavedFilmsListPages(state, payload) {
      state.totalSavedFilmsListPages = payload;
    },
    setFilmKeyword(state, payload) {
      state.filmKeyword = payload;
    },
    changeSavedKeyword(state, payload) {
      state.savedKeyword = payload;
    },
    setFilterSettings(state, payload) {
      state.filterSettings = payload;
    },
    loadSaved(state) {
      if (localStorage.storedSaved) {
        let localStorSaved = [];
        localStorSaved = JSON.parse(localStorage.storedSaved);
        localStorSaved.forEach((element) => {
          JSON.parse(element);
        });
        state.savedFilms = localStorSaved;
      }
    },
    loadSavedFilmsObj(state) {
      if (localStorage.storedSavedObj) {
        let parsedFilms = [];
        let savedFilmsObjFromStore = JSON.parse(localStorage.storedSavedObj);
        for (let elem = 0; elem < savedFilmsObjFromStore.length; elem++) {
          parsedFilms.push({});
          let filmParsed = savedFilmsObjFromStore[elem];
          parsedFilms[elem] = { ...filmParsed };
        }
        state.totalSavedFilmsListPages = Math.ceil(parsedFilms.length / 20);
        state.savedFilmsObj = parsedFilms;
      }
    },
    loadRating(state) {
      if (localStorage.storedRating) {
        let parsedFilms = [];
        let ratingFromStore = JSON.parse(localStorage.storedRating);
        for (let elem = 0; elem < ratingFromStore.length; elem++) {
          parsedFilms.push({});
          let filmParsed = ratingFromStore[elem];
          parsedFilms[elem] = { ...filmParsed };
        }
        state.ratedFilms = parsedFilms;
      }
    },
    addToSaved(state, payload) {
      if (!state.savedFilms.includes(payload)) {
        state.savedFilms.push(payload);
      }
    },
    addToRated(state, newFilm) {
      let ratedIdList = state.ratedFilms.map((id) => id.filmId);
      if (ratedIdList.includes(newFilm.filmId)) {
        state.ratedFilms[ratedIdList.indexOf(newFilm.filmId)].userRating =
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
    setSavedObj(state) {
      localStorage.setItem(
        "storedSavedObj",
        JSON.stringify(state.savedFilmsObj)
      );
    },
    setRated(state) {
      localStorage.setItem("storedRating", JSON.stringify(state.ratedFilms));
    },
    localStoreShowFilm(state) {
      localStorage.setItem("showFilm", JSON.stringify(state.showFilm));
    },
    loadShowFilmFromStore(state) {
      if (localStorage.showFilm) {
        state.showFilm = JSON.parse(localStorage.showFilm);
      }
    },

    setChronoSort(state, payload) {
      let time = (payload + ":00").split(":");
      state.chronoSort = new Date(
        parseInt("2001", 10),
        parseInt("01", 10) - 1,
        parseInt("01", 10),
        parseInt(time[0], 10),
        parseInt(time[1], 10),
        parseInt(time[2], 10)
      ).valueOf();
    },
  },
  actions: {
    saveInFavs(context, payload) {
      if (!context.state.savedFilmsObj.includes(payload.film)) {
        context.state.savedFilmsObj.push(payload.film);
        context.commit("setSavedObj");
      }
      if (payload.saved) {
        context.commit("addToSaved", payload.film.filmId);
      }
    },
    deleteFromFavs(context, payload) {
      let ratedIdList = context.state.ratedFilms.map((id) => id.filmId);
      if (!ratedIdList.includes(payload.filmId)) {
        context.state.savedFilmsObj = context.state.savedFilmsObj.filter(
          (element) => element !== payload
        );
        context.commit("setSavedObj");
      }
      context.commit("deleteFromSaved", payload.filmId);
    },

    filterSavedFilms(context, films) {
      let filterParams = context.state.filterSettings;
      if (
        !(
          filterParams.filterByCountry === "" ||
          filterParams.filterByCountry === null ||
          filterParams.filterByCountry === undefined ||
          filterParams.filterByCountry === " "
        )
      ) {
        films = films.filter((element) =>
          element.countries
            .map((id) => (id.country || "").toLowerCase())
            .includes(filterParams.filterByCountry.toLowerCase())
        );
      }
      if (
        !(
          filterParams.filterByGenre === "" ||
          filterParams.filterByGenre === null ||
          filterParams.filterByGenre === undefined ||
          filterParams.filterByGenre === " "
        )
      ) {
        films = films.filter((element) =>
          element.genres
            .map((id) => (id.genre || "").toLowerCase())
            .includes(filterParams.filterByGenre.toLowerCase())
        );
      }
      if (filterParams.sortDesc) {
        switch (filterParams.sortBy) {
          case "Названию":
            films = films.sort((first, second) => {
              let nameA = (first.nameEn || "").toUpperCase();
              let nameB = (second.nameEn || "").toUpperCase();
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              return 0;
            });
            break;
          case "Году":
            films = films.sort(
              (first, second) =>
                parseInt(first.year || 0) - parseInt(second.year || 0)
            );
            break;
          case "Хронометражу":
            films = films.sort((first, second) => {
              context.commit("setChronoSort", first.filmLength);
              let dateFirst = context.state.chronoSort;
              context.commit("setChronoSort", second.filmLength);
              let dateSecond = context.state.chronoSort;
              if (dateFirst < dateSecond) {
                context.state.chronoSort = [];
                return -1;
              }
              if (dateFirst > dateSecond) {
                context.state.chronoSort = [];
                return 1;
              }
              context.state.chronoSort = [];
              return 0;
            });
            break;
          default:
            films = films.sort(
              (first, second) =>
                (parseFloat(first.rating.replace(",", ".")) || 0) -
                (parseFloat(second.rating.replace(",", ".")) || 0)
            );
            break;
        }
      } else {
        switch (filterParams.sortBy) {
          case "Названию":
            films = films.sort((first, second) => {
              let nameA = (first.nameEn || "").toUpperCase();
              let nameB = (second.nameEn || "").toUpperCase();
              if (nameA < nameB) {
                return 1;
              }
              if (nameA > nameB) {
                return -1;
              }
              return 0;
            });
            break;
          case "Году":
            films = films.sort(
              (first, second) =>
                parseInt(second.year || 0) - parseInt(first.year || 0)
            );
            break;
          case "Хронометражу":
            films = films.sort((first, second) => {
              context.commit("setChronoSort", first.filmLength);
              let dateFirst = context.state.chronoSort;
              context.commit("setChronoSort", second.filmLength);
              let dateSecond = context.state.chronoSort;
              if (dateFirst < dateSecond) {
                return 1;
              }
              if (dateFirst > dateSecond) {
                return -1;
              }
              return 0;
            });
            break;
          default:
            films = films.sort(
              (first, second) =>
                (parseFloat(second.rating.replace(",", ".")) || 0) -
                (parseFloat(first.rating.replace(",", ".")) || 0)
            );
            break;
        }
      }
      if (filterParams.sortBy === "Только в закладках") {
        films = films.filter((element) =>
          context.state.savedFilms.includes(element.filmId)
        );
      }
      if (filterParams.sortBy === "Только с моей оценкой") {
        let ratedIdList = context.state.ratedFilms.map((film) => film.filmId);
        films = films.filter((element) => ratedIdList.includes(element.filmId));
      }
      context.commit(
        "setTotalSavedFilmsListPages",
        Math.ceil(films.length / 20)
      );
      context.dispatch("getFilmsOnPage", films);
    },

    searchSavedFilms(context) {
      if (
        !(
          context.state.savedKeyword === "" ||
          context.state.savedKeyword === null ||
          context.state.savedKeyword === undefined
        )
      ) {
        let nameRuFilter = context.state.savedFilmsObj.filter((film) =>
          (film.nameRu || "")
            .toLowerCase()
            .includes(context.state.savedKeyword.toLowerCase())
        );
        let nameEnFilter = context.state.savedFilmsObj.filter((film) =>
          (film.nameEn || "")
            .toLowerCase()
            .includes(context.state.savedKeyword.toLowerCase())
        );
        let concatedUniq = [...new Set([...nameEnFilter, ...nameRuFilter])];
        context.dispatch("filterSavedFilms", concatedUniq);
      } else {
        context.dispatch("filterSavedFilms", context.state.savedFilmsObj);
      }
    },
    getFilmsOnPage(context, filmsArray) {
      if (
        filmsArray.length <
        20 + 20 * (context.state.currentSavedFilmsPage - 1)
      ) {
        context.state.savedFilmsObjOnPage = filmsArray.slice(
          20 * (context.state.currentSavedFilmsPage - 1),
          filmsArray.length
        );
      } else {
        context.state.savedFilmsObjOnPage = filmsArray.slice(
          0 + 20 * (context.state.currentSavedFilmsPage - 1),
          20 + 20 * (context.state.currentSavedFilmsPage - 1)
        );
      }
    },
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
              //d3293c50-bae5-4091-9c53-23cab41ad74e
              "X-API-KEY": "5a083dfc-2af6-456d-bc14-2f6adbae7052",
              "Content-Type": "application/json",
            },
          }
        );
        context.commit("setTotalFilmListPages", response.data.pagesCount);
        context.commit("setFilms", response.data.films);
      } else {
        let lastPage = context.state.currentPage;
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
