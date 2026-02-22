<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      <div class="sheet__content dough">
        <label
          v-for="doughType in doughItems"
          :key="doughType.id"
          class="dough__input"
          :class="`dough__input--${doughType.value}`"
        >
          <input
            type="radio"
            name="dought"
            :value="doughType.value"
            class="visually-hidden"
            :checked="doughType.id === modelValue?.id"
            @change="$emit('update:modelValue', doughType)"
          />
          <img :src="getPublicImage(doughType.image)" :alt="doughType.name" />
          <b>{{ doughType.name }}</b>
          <span>{{ doughType.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getPublicImage } from "@/common/helpers/publicImage";

defineProps({
  doughItems: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Object,
    default: null,
  },
});

defineEmits(["update:modelValue"]);
</script>

<style scoped>
.sheet {
  padding-top: 15px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.sheet__title {
  padding: 0 18px;
  font-size: 18px;
  font-weight: bold;
}

.sheet__content {
  display: flex;
  flex-wrap: wrap;
  padding: 18px;
  padding-bottom: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.dough__input {
  position: relative;
  margin-right: 8%;
  margin-bottom: 20px;
  padding-left: 50px;
  cursor: pointer;
}

.dough__input img {
  position: absolute;
  top: 50%;
  left: 0;
  width: 36px;
  height: 36px;
  transform: translateY(-50%);
  border-radius: 50%;
  transition: box-shadow 0.3s;
}

.dough__input b {
  font-size: 16px;
  font-weight: bold;
}

.dough__input span {
  font-size: 11px;
  display: block;
}

.dough__input:hover img {
  box-shadow: 0 0 0 2px rgba(65, 182, 25, 0.6);
}

.dough__input input:checked + img {
  box-shadow: 0 0 0 2px #41b619;
}
</style>
