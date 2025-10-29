import { defineStore } from "pinia";
import { usePizzaStore } from "@/stores/pizza";
import { useDataStore } from "@/stores/data";
import { useAuthStore } from "./auth";
import resources from "@/services/resources";

export const useCartStore = defineStore("cart", {
  state: () => ({
    phone: "",
    // deliveryType: 'pickup', // 'pickup' | 'new' | 'existing'
    address: {
      id: null,
      name: '',
      street: "",
      building: "",
      flat: "",
      comment: "",
    },
    pizzas: [],
    misc: [],
  }),

  actions: {
    addPizza() {
      const pizzaStore = usePizzaStore();

      // Преобразование формата ингредиентов
      const formattedIngredients = Object.values(pizzaStore.ingredients)
        .filter(item => item.count > 0)
        .map(({ ingredient, count }) => ({
          ...ingredient,       // Распространяем свойства ингредиента
          quantity: count      // Добавляем количество
        }));

      this.pizzas.push({
        id: Date.now(),
        // Сохраняем оригинальные данные
        ...pizzaStore.$state,
        // Перезаписываем ingredients совместимым форматом
        ingredients: formattedIngredients,
        totalPrice: pizzaStore.totalPrice,
        quantity: 1
      });

      pizzaStore.$reset();
    },

    editPizza(pizzaId) {
      const pizza = this.pizzas.find(p => p.id === pizzaId);
      if (!pizza) return;

      const pizzaStore = usePizzaStore();

      // Восстанавливаем состояние конструктора
      pizzaStore.$patch({
        ...pizza,
        ingredients: this.convertToIngredientsObject(pizza.ingredients)
      });

      // Удаляем пиццу из корзины
      this.pizzas = this.pizzas.filter(p => p.id !== pizzaId);
    },

    restoreOrder(orderData) {
      this.$reset();

      this.pizzas = orderData.pizzas.map(pizza => ({
        ...pizza,
        ingredients: [...pizza.ingredients]
      }));
      this.misc = [...orderData.misc];
      this.phone = orderData.phone;
      this.address = { ...orderData.address };
    },

    convertToIngredientsObject(ingredientsArray) {
      return ingredientsArray.reduce((acc, item) => {
        acc[item.id] = { ingredient: item, count: item.quantity };
        return acc;
      }, {});
    },

    updateMisc(itemId, quantity) {
      const item = this.misc.find(m => m.id === itemId);
      if (item) {
        item.quantity = Math.max(0, quantity);
      } else {
        this.misc.push({
          id: itemId,
          quantity: 1,
          ...this.getMiscItem(itemId)
        });
      }
    },

    updatePizzaQuantity(pizzaId, newQuantity) {
      const pizzaIndex = this.pizzas.findIndex(p => p.id === pizzaId);
      if (pizzaIndex === -1) return;

      if (newQuantity <= 0) {
        this.pizzas.splice(pizzaIndex, 1);
      } else {
        this.pizzas[pizzaIndex].quantity = newQuantity;
      }
    },

    getMiscItem(itemId) {
      return useDataStore().misc.find(m => m.id === itemId);
    },

    async publishOrder() {
      const authStore = useAuthStore();
      // Собираем payload
      const payload = {
        userId: authStore.user?.id ?? null,
        phone: this.phone,
        address: this.address,
        pizzas: this.pizzas,
        misc: this.misc,
      };
      // Отправляем запрос
      const res = await resources.order.createOrder(payload);
      // Вернём результат вызова наружу (можно дальше обрабатывать __state и data)
      return res;
    },
  },

  getters: {
    total: (state) => {
      const pizzasSum = state.pizzas.reduce(
        (sum, pizza) => sum + (pizza.totalPrice * pizza.quantity),
        0
      );

      const miscSum = state.misc.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
      );

      return pizzasSum + miscSum;
    }
  }
});
