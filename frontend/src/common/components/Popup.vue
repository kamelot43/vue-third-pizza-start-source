<template>
  <transition name="popup">
    <div
        v-if="popup.isVisible"
        class="popup-overlay"
        @click.self="close"
    >
      <div class="popup">
        <a href="#" class="close" @click.prevent="close">
          <span class="visually-hidden">Закрыть попап</span>
        </a>
        <div class="popup__title">
          <h2 class="title">Спасибо за заказ</h2>
        </div>
        <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
        <div class="popup__button">
          <a href="#" class="button" @click.prevent="confirm">Отлично, я жду!</a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>

import { usePopupStore  } from '@/stores/popup';
import { useRouter } from 'vue-router';

const router = useRouter();
const popup = usePopupStore();

const close = () => {
  popup.hide();
};

const confirm = () => {
  popup.hide();
  router.push('/user/orders');
};

</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}


.popup {
  @include pf_center-all;

  z-index: 10;

  display: block;

  box-sizing: border-box;
  width: 420px;
  padding: 64px 95px;

  background-color: $white;
  box-shadow: $shadow-light;

  &::before,
  &::after {
    position: absolute;

    width: 48px;
    height: 48px;

    content: "";

    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  &::before {
    top: 15px;
    left: 15px;

    background-image: url("@/assets/img/filling/ananas.svg");
  }

  &::after {
    right: 15px;
    bottom: 15px;

    background-image: url("@/assets/img/filling/tomatoes.svg");
  }

  p {
    margin-top: 24px;
    margin-bottom: 24px;

    text-align: center;
  }
}

.popup-enter-active,
.popup-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.popup__button {
  :deep(a) {
    padding: 16px 32px;
  }
}

.popup__title {
  text-align: center;

  font-size: 1.3em;
}

.close {
  position: absolute;
  top: 16px;
  right: 16px;

  width: 25px;
  height: 25px;

  cursor: pointer;
  transition: 0.3s;
  text-decoration: none;

  color: $black;
  border-radius: 50%;
  outline: none;

  &::before,
  &::after {
    position: absolute;
    top: 50%;
    left: 50%;

    width: 25px;
    height: 2px;

    content: "";

    border-radius: 2px;
    background-color: $black;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.5;
  }

  &:focus {
    &::before,
    &::after {
      background-color: $orange-100;
    }
  }

  &--white {
    &::before,
    &::after {
      background-color: $white;
    }
  }
}

</style>
