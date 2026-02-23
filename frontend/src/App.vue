<template>
  <app-layout>
    <router-view v-slot="{ Component }">
      <transition name="slide" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </app-layout>
</template>

<script setup>
import AppLayout from "@/layouts/AppLayout.vue";
import { onMounted, ref } from "vue";
import { useDataStore } from "@/stores/data";
import { usePizzaStore } from "@/stores/pizza";
import { useAuthStore } from "@/stores/auth";
import JwtService from "@/services/jwt/jwt.service";
import { router } from "@/router";
import { useRoute } from "vue-router";

const dataStore = useDataStore();
const pizzaStore = usePizzaStore();
const route = useRoute();
const isLoaded = ref(false);

const checkLoggedIn = async () => {
  const authStore = useAuthStore();
  const token = JwtService.getToken();
  if (!token) {
    isLoaded.value = true;
    return;
  }

  try {
    await authStore.whoami();
    const { redirect } = route.query;
    await router.push(redirect ? redirect : { name: "home" });
  } catch (e) {
    JwtService.destroyToken();
    console.error(e);
  } finally {
    isLoaded.value = true;
  }
};

// Функция предзагрузки всех изображений
const preloadImages = () => {
  const baseUrl =
    import.meta.env.VITE_STATIC_URL ||
    "https://vue-pizza-backend-production.up.railway.app";

  // Все возможные изображения для предзагрузки
  const imagesToPreload = [
    // Ингредиенты (filling-big)
    ...dataStore.ingredients.map(
      (i) => `/public/img/filling-big/${i.value}.svg`,
    ),

    // Фоны основ пиццы
    "/public/img/foundation/big-creamy.svg",
    "/public/img/foundation/big-tomato.svg",
    "/public/img/foundation/small-creamy.svg",
    "/public/img/foundation/small-tomato.svg",

    // Иконки
    "/public/img/cart.svg",
    "/public/img/login.svg",
    "/public/img/button-arrow.svg",
    "/public/img/popup.svg",
    "/public/img/edit.svg",
    "/public/img/product.svg",

    // Ингредиенты для попапа (маленькие)
    "/public/img/filling/ananas.svg",
    "/public/img/filling/tomatoes.svg",

    // Изображения для диаметров
    "/public/img/diameter.svg",
  ];

  // Загружаем каждое изображение
  imagesToPreload.forEach((src) => {
    const img = new Image();
    img.src = `${baseUrl}${src}`;
  });

  console.log("Preloaded", imagesToPreload.length, "images");
};

onMounted(async () => {
  // Загружаем данные
  await dataStore.loadData();

  // Проверяем авторизацию (не блокируем загрузку данных)
  await checkLoggedIn();

  // Устанавливаем значения по умолчанию для конструктора пиццы
  if (dataStore.doughs.length) {
    pizzaStore.setDough(dataStore.doughs[0]);
  }
  if (dataStore.sizes.length) {
    pizzaStore.setSize(dataStore.sizes[0]);
  }
  if (dataStore.sauces.length) {
    pizzaStore.setSauce(dataStore.sauces[0]);
  }

  if (dataStore.isDataLoaded) {
    preloadImages();
  }
});
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
