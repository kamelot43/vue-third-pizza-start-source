import { defineStore } from "pinia";
import {useCartStore} from "./cart";

export const useOrdersStore = defineStore("orders", {
  state: () => ({
    orders: JSON.parse(localStorage.getItem('orders')) || []
  }),

  actions: {
    addOrder(orderData) {
      // Правильно рассчитываем общую сумму заказа
      const total = orderData.pizzas.reduce((sum, pizza) => {
        return sum + (pizza.totalPrice * pizza.quantity);
      }, 0) + orderData.misc.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
      }, 0);

      this.orders.unshift({
        ...orderData,
        id: Date.now(),
        date: new Date().toISOString(),
        total // Добавляем пересчитанную сумму
      });
      this.saveToLocalStorage();
    },

    deleteOrder(orderId) {
      this.orders = this.orders.filter(order => order.id !== orderId);
      this.saveToLocalStorage();
    },

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
