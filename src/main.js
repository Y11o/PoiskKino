import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store/index.js";
import vuetify from "./plugins/vuetify";
import axios from "axios";

Vue.prototype.axios = axios;

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
