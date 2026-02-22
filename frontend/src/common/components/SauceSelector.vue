<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>
    <label
      v-for="sauceType in sauceItems"
      :key="sauceType.id"
      class="radio ingredients__input"
    >
      <input
        type="radio"
        name="sauce"
        :value="sauceType.value"
        :checked="sauceType.id === modelValue?.id"
        @change="$emit('update:modelValue', sauceType)"
      />
      <span>{{ sauceType.name }}</span>
    </label>
  </div>
</template>

<script setup>
defineEmits(["update:modelValue"]);

defineProps({
  sauceItems: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Object,
    default: null,
  },
});
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

.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 14px;
}

.ingredients__sauce p {
  font-size: 16px;
  margin-right: 16px;
  margin-bottom: 10px;
}

.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
  cursor: pointer;
}

.ingredients__input span {
  font-size: 16px;
  padding-left: 28px;
  position: relative;
}

.ingredients__input span::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  width: 20px;
  height: 20px;
  transform: translateY(-50%);
  border-radius: 50%;
  background-color: white;
  transition: border-color 0.3s;
}
</style>
