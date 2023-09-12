import Vue from "vue";
import VueRouter from "vue-router";
import FilmsList from "@/pages/FilmsList.vue"
import Favourites from "@/pages/Favourites.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "FilmsList",
    component: FilmsList,
  },
  {
    path: "/saved",
    name: "Favourites",
    component: Favourites,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
