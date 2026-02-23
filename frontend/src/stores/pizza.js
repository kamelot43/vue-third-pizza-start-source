import { defineStore } from "pinia";
import { useDataStore } from "@/stores/data";

export const usePizzaStore = defineStore("pizza", {
  state: () => ({
    name: "",
    dough: [],
    size: [],
    sauce: [],
    ingredientsCounts: {},
  }),
  getters: {
    // Геттер, возвращающий ингредиенты в формате, ожидаемом компонентами
    ingredients: (state) => {
      const dataStore = useDataStore();
      const result = {};
      dataStore.ingredients.forEach((ing) => {
        result[ing.id] = {
          ingredient: ing,
          count: state.ingredientsCounts[ing.id] || 0,
        };
      });
      return result;
    },
    selectedIngredients: (state) => {
      return Object.values(state.ingredients)
        .filter((item) => item.count > 0)
        .map((item) => ({
          ...item.ingredient,
          quantity: item.count,
        }));
    },
    totalPrice: (state) => {
      if (!state.size) return 0;
      const ingredientsSum = state.selectedIngredients.reduce(
        (sum, ing) => sum + ing.price * ing.quantity,
        0,
      );
      return (
        state.size.multiplier *
        (state.dough?.price + state.sauce?.price + ingredientsSum)
      );
    },
    isPizzaValid: (state) => {
      return state.name.trim() !== "" && state.totalPrice > 0;
    },
  },
  actions: {
    setName(name) {
      this.name = name;
      console.log("Store updated (name):", this.name);
    },
    setSize(size) {
      this.size = size;
      console.log("Store updated (size):", this.size);
    },
    setDough(dough) {
      this.dough = dough;
      console.log("Store updated (dough):", this.dough);
    },
    setSauce(sauce) {
      this.sauce = sauce;
      console.log("Store updated (sauce):", this.sauce);
    },
    setIngredient(ingredientId, count) {
      const dataStore = useDataStore();
      if (!dataStore.ingredients.some((ing) => ing.id === ingredientId)) return;
      const clampedCount = Math.max(0, Math.min(3, count));
      this.ingredientsCounts[ingredientId] = clampedCount;
      console.log("Ингредиент обновлён:", {
        id: ingredientId,
        count: clampedCount,
      });
    },
    addIngredient(ingredient) {
      if (!ingredient?.id) return;
      const currentCount = this.ingredientsCounts[ingredient.id] || 0;
      if (currentCount < 3) {
        this.setIngredient(ingredient.id, currentCount + 1);
        console.log("Добавлен ингредиент:", ingredient.name);
      } else {
        console.warn("Достигнут лимит для:", ingredient.name);
      }
    },
    logState() {
      console.log("Current store state:", {
        name: this.name,
        dough: this.dough,
        size: this.size,
        sauce: this.sauce,
        ingredientsCounts: this.ingredientsCounts,
      });
    },
  },
});