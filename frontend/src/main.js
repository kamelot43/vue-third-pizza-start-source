import axios from "axios";
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "@/router";

console.log('=== VITE ENV DEBUG ===');
console.log('VITE_API_URL from import.meta:', import.meta.env.VITE_API_URL);
console.log('All env keys:', Object.keys(import.meta.env));

axios.defaults.baseURL = 'https://vue-pizza-backend-production.up.railway.app';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
