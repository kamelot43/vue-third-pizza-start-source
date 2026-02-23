import axios from "axios";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "@/router";

// Базовый URL для всех API-запросов
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";
axios.defaults.baseURL = baseURL;

const app = createApp(App);

const staticBase = import.meta.env.VITE_STATIC_URL || 'http://localhost:3000';
app.config.globalProperties.$getCssUrl = (path) => {
  const cleanPath = path.replace(/^\/api/, '').replace(/^\//, '');
  return `url(${staticBase}/${cleanPath})`;
};

app.use(createPinia());
app.use(router);
app.mount("#app");
