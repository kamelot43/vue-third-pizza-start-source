<template>
    <main class="layout">
      <div class="layout__sidebar sidebar">
        <router-link :to="{ name: 'home' }" class="logo layout__logo">
          <img
            src="@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </router-link>
  
        <slot name="sidebar" />
      </div>
  
      <div class="layout__content">
        <slot />
      </div>
    </main>
  </template>
  
  <style lang="scss">
  @import "@/assets/scss/ds-system/ds.scss";
  
  .layout__sidebar {
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
  
    width: 180px;
    height: 100%;
  
    background-color: rgba($green-500, 0.05);
  }
  
  .layout__logo {
    display: block;
  
    margin-bottom: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
  
    background-color: $green-500;
  
    img {
      display: block;
  
      margin: 0 auto;
    }
  }
  
  .layout__link {
    @include b-s14-h16;
  
    display: block;
  
    padding: 8px 14px;
  
    transition: 0.3s;
  
    color: $black;
  
    &--active {
      background-color: rgba($green-500, 0.1);
    }
  
    &:hover {
      background-color: rgba($green-500, 0.2);
    }
  
    &:active {
      color: rgba($black, 0.5);
    }
  }
  
  .layout__content {
    padding-top: 22px;
    padding-right: 2.12%;
    padding-left: 200px;
  }
  
  .layout__title {
    margin-bottom: 27px;
  }
  
  .layout__button {
    $self: &;
    margin-top: 40px;
  
    button[type="button"] {
      padding: 12px 23px;
    }
  }
  </style>