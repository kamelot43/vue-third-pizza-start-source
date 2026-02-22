import axios from "axios";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "@/router";

// Автоматическое определение режима сборки
const isProduction = import.meta.env.PROD; // true для продакшн-сборки

// Настройка базового URL в зависимости от режима
let baseURL;
let apiPath;

if (isProduction) {
  // Продакшен — используем реальный домен бэкенда
  baseURL = "https://vue-pizza-backend-production.up.railway.app";
  apiPath = ""; // без префикса /api
} else {
  // Разработка — используем переменные окружения или localhost
  baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
  apiPath = import.meta.env.VITE_API_PATH || "/api";
}

axios.defaults.baseURL = baseURL + apiPath;

console.log("=== API BASE URL ===", axios.defaults.baseURL);

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
