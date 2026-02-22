<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script setup>
import { shallowRef, watch } from "vue";
import { useRoute } from "vue-router";

// Собираем все layout-файлы из папки src/layouts
const layouts = import.meta.glob("/src/layouts/*.vue");

const route = useRoute();
const layout = shallowRef(null);

watch(
  () => route.meta,
  async (meta) => {
    const layoutName = meta.layout || "DefaultLayout";
    try {
      // Формируем ключ для доступа к загрузчику
      const loader = layouts[`/src/layouts/${layoutName}.vue`];
      if (loader) {
        const component = await loader();
        layout.value = component?.default;
      } else {
        throw new Error("Layout not found");
      }
    } catch (e) {
      console.error(
        "Динамический шаблон не найден. Установлен шаблон по-умолчанию.",
        e,
      );
      // Загружаем дефолтный layout
      const defaultLoader = layouts["/src/layouts/DefaultLayout.vue"];
      if (defaultLoader) {
        const defaultComponent = await defaultLoader();
        layout.value = defaultComponent?.default;
      }
    }
  },
  { immediate: true }, // сразу загружаем при монтировании
);
</script>
