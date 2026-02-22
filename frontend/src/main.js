import axios from "axios";
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "@/router";

// Формируем базовый URL для API
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const apiPath = import.meta.env.VITE_API_PATH || "/api";
axios.defaults.baseURL = baseURL + apiPath;

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
