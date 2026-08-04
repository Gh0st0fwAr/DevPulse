import { createApp } from "vue";
import App from "./App.vue";
import { pinia } from "./providers/pinia";
import { router } from "./providers/router";
import "./styles/index.css";

const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount("#app");
