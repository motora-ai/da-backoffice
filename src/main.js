import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./styles.css";
import "./assets/Icons/icons.css";
createApp(App).use(store).use(router).mount("#app");
