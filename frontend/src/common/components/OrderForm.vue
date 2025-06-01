<template>
  <div class="cart-form">
    <!-- Селектор доставки -->
    <label class="cart-form__select">
      <span class="cart-form__label">Получение заказа:</span>
      <select
          class="select"
          :value="deliveryType === 'existing' ? address.id : deliveryType"
          @change="handleDeliveryChange"
      >
        <option value="pickup">Заберу сам</option>
        <option value="new">Новый адрес</option>
        <option
            v-for="addr in profileStore.addresses"
            :key="addr.id"
            :value="addr.id"
        >
          {{ addr.name }}
        </option>
      </select>
    </label>

    <!-- Телефон -->
    <label class="input input--big-label">
      <span>Контактный телефон:</span>
      <input
          type="tel"
          :value="phone"
          @input="$emit('update:phone', $event.target.value)"
          placeholder="+7 999 999-99-99"
          required
      >
    </label>

    <!-- Блок адреса -->
    <div v-if="deliveryType !== 'pickup'" class="cart-form__address">
      <span class="cart-form__label">Адрес доставки:</span>

      <!-- Улица -->
      <div class="cart-form__input">
        <label class="input">
          <span>Улица*</span>
          <input
              type="text"
              :value="address.street"
              @input="$emit('update:address', { ...address, street: $event.target.value })"
              :disabled="deliveryType === 'existing'"
              required
          >
        </label>
      </div>

      <!-- Дом и квартира -->
      <div class="cart-form__input cart-form__input--small">
        <label class="input">
          <span>Дом*</span>
          <input
              type="text"
              :value="address.building"
              @input="$emit('update:address', { ...address, building: $event.target.value })"
              :disabled="deliveryType === 'existing'"
              required
          >
        </label>
      </div>

      <div class="cart-form__input cart-form__input--small">
        <label class="input">
          <span>Квартира</span>
          <input
              type="text"
              :value="address.apartment"
              @input="$emit('update:address', { ...address, apartment: $event.target.value })"
              :disabled="deliveryType === 'existing'"
          >
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import { useProfileStore } from '@/stores/profile';

const profileStore = useProfileStore();

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

// Новое состояние для выбора адреса
const selectedAddressId = computed({
  get: () => props.address?.id || null,
  set: (id) => {
    const selectedAddress = profileStore.addresses.find(addr => addr.id === id);
    if (selectedAddress) {
      emit('update:address', { ...selectedAddress });
    }
  }
});

// Опции для селекта
const deliveryOptions = computed(() => [
  { value: 'pickup', label: 'Заберу сам' },
  { value: 'new', label: 'Новый адрес' },
  ...profileStore.addresses.map(addr => ({
    value: addr.id,
    label: addr.name
  }))
]);

const handleDeliveryChange = (event) => {
  const value = event.target.value;

  if (value === 'pickup') {
    deliveryType.value = 'pickup';
  } else if (value === 'new') {
    deliveryType.value = 'new';
    emit('update:address', {
      street: '',
      building: '',
      apartment: '',
      comment: '',
      name: ''
    });
  } else {
    // Выбор существующего адреса
    const selectedAddress = profileStore.getAddressById(Number(value));
    if (selectedAddress) {
      deliveryType.value = 'existing';
      emit('update:address', {
        ...selectedAddress,
        id: selectedAddress.id
      });
    }
  }
};

const updateAddress = (field, value) => {
  emit('update:address', { ...props.address, [field]: value });
};

// Отслеживаем изменения адреса извне
watch(() => props.address, (newAddress) => {
  if (!newAddress.id) {
    selectedAddressId.value = null;
  }
}, { deep: true });
</script>
