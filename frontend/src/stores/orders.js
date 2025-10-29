import { defineStore } from "pinia";
import {useCartStore} from "./cart";
import resources from "@/services/resources";

export const useOrdersStore = defineStore("orders", {
  state: () => ({
    orders: []
  }),

  actions: {

    async loadOrders() {
      const res = await resources.order.getOrders();
      if (res.__state === "success") {
        this.orders = res.data;
      }
    },

    // addOrder(orderData) {
    //   // Правильно рассчитываем общую сумму заказа
    //   const total = orderData.pizzas.reduce((sum, pizza) => {
    //     return sum + (pizza.totalPrice * pizza.quantity);
    //   }, 0) + orderData.misc.reduce((sum, item) => {
    //     return sum + (item.price * item.quantity);
    //   }, 0);
    //
    //   this.orders.unshift({
    //     ...orderData,
    //     id: Date.now(),
    //     date: new Date().toISOString(),
    //     total // Добавляем пересчитанную сумму
    //   });
    //   this.saveToLocalStorage();
    // },

    async addOrder(orderData) {
      // можно подсчитать сумму заранее или на сервере
      const res = await resources.order.createOrder(orderData);
      if (res.__state === "success") {
        this.orders.push(res.data);
      }
    },

    async deleteOrder(orderId) {
      const res = await resources.order.removeOrder(orderId);
      if (res.__state === "success") {
        this.orders = this.orders.filter(o => o.id !== orderId);
      }
    },

    // deleteOrder(orderId) {
    //   this.orders = this.orders.filter(order => order.id !== orderId);
    //   this.saveToLocalStorage();
    // },

    repeatOrder(orderId) {
      const order = this.orders.find(o => o.id === orderId);
      if (order) {
        const cart = useCartStore();
        cart.restoreOrder(order);
      }
    },

    saveToLocalStorage() {
      localStorage.setItem('orders', JSON.stringify(this.orders));
    }
  }
});
