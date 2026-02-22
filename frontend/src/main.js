import axios from "axios";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "@/router";

// Базовый URL для всех API-запросов
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";
axios.defaults.baseURL = baseURL;

console.log("API Base URL:", axios.defaults.baseURL); // для отладки

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
