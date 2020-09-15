import { createApp } from "vue";
import App from "./App.vue";
import "todomvc-app-css/index.css";

const app = createApp(App);
app.mount("#app");
app.config.devtools = true;
