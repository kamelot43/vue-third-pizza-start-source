<template>
  <div class="cart-form">
    <label class="cart-form__select">
      <span class="cart-form__label">Получение заказа:</span>
      <select
          v-model="deliveryType"
          class="select"
          @change="updateAddress"
      >
        <option value="pickup">Заберу сам</option>
        <option value="new">Новый адрес</option>
        <option value="home">Дом</option>
      </select>
    </label>

    <label class="input input--big-label">
      <span>Контактный телефон:</span>
      <input
          type="tel"
          v-model="phone"
          placeholder="+7 999 999-99-99"
          required
      >
    </label>

    <div v-if="deliveryType !== 'pickup'" class="cart-form__address">
      <span class="cart-form__label">Новый адрес:</span>

      <div class="cart-form__input">
        <label class="input">
          <span>Улица*</span>
          <input
              type="text"
              v-model="address.street"
              required
          >
        </label>
      </div>

      <div class="cart-form__input cart-form__input--small">
        <label class="input">
          <span>Дом*</span>
          <input
              type="text"
              v-model="address.building"
              required
          >
        </label>
      </div>

      <div class="cart-form__input cart-form__input--small">
        <label class="input">
          <span>Квартира</span>
          <input
              type="text"
              v-model="address.flat"
          >
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  phone: String,
  address: Object,
  deliveryType: String
});

const emit = defineEmits([
  'update:phone',
  'update:address',
  'update:deliveryType'
]);

const phone = computed({
  get: () => props.phone,
  set: (value) => emit('update:phone', value)
});

const deliveryType = computed({
  get: () => props.deliveryType,
  set: (value) => emit('update:deliveryType', value)
});

const updateAddress = (field, value) => {
  emit('update:address', { ...props.address, [field]: value });
};
</script>
