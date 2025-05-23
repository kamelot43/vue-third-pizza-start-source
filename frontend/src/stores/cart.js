import { defineStore } from "pinia";
import { usePizzaStore } from "@/stores/pizza";
import { useDataStore } from "@/stores/data";

export const useCartStore = defineStore("cart", {
  state: () => ({
    phone: "",
    address: {
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
          ...ingredient,
          quantity: count
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

    updatePizzaQuantity(id, quantity) {
      const pizza = this.pizzas.find(p => p.id === id);
      if (pizza) {
        pizza.quantity = Math.max(1, quantity);
      }
    },

    getMiscItem(itemId) {
      return useDataStore().misc.find(m => m.id === itemId);
    }
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
