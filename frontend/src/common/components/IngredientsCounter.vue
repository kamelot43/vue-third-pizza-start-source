<template>
    <div class="counter counter--orange ingredients__counter">
      <button
        type="button"
        class="counter__button counter__button--minus"
        :disabled="modelValue <= min"
        @click="decrement"
      >
        <span class="visually-hidden">Меньше</span>
      </button>
      <input
        type="text"
        name="counter"
        class="counter__input"
        :value="modelValue"
        @input="handleInput"
      />
      <button
        type="button"
        class="counter__button counter__button--plus"
        :disabled="modelValue >= max"
        @click="increment"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    modelValue: {
      type: Number,
      required: true
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 3
    }
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const increment = () => {
    if (props.modelValue < props.max) {
      emit('update:modelValue', props.modelValue + 1);
    }
  };
  
  const decrement = () => {
    if (props.modelValue > props.min) {
      emit('update:modelValue', props.modelValue - 1);
    }
  };
  
  const handleInput = (event) => {
  const value = parseInt(event.target.value);
  if (!isNaN(value)) {
    const clampedValue = Math.max(props.min, Math.min(props.max, value));
    emit('update:modelValue', clampedValue);
  }
};
  </script>
  
  <style scoped>
  
  .counter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 54px;
    margin-top: 10px;
    margin-left: 36px;
  }
  
  .counter__button {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .counter__button--minus {
    background-color: #f0e6ff;
  }
  
  .counter__button--plus {
    background-color: #6c5ce7;
  }
  
  .counter__input {
    width: 22px;
    text-align: center;
    border: none;
    outline: none;
    background-color: transparent;
  }
  </style>