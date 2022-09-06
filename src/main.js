// import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./styles.css";
import "./assets/Icons/icons.css";
import * as Vue from "vue";
import moment from "moment";

// import { VueDateFns } from "vue-date-fns";

// Vue.filter("date", dateFilter);

// const Vue = createApp(App);

moment.locale("pt-br");

Vue.createApp(App)
  .use(store)
  .use(router)
  //   .use(VueDateFns)
  // .filter()
  .mount("#app");
