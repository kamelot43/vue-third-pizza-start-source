import doughSizes from "@/common/data/doughSizes";
import { ingredientNameToValue } from "@/common/data/ingredients";
import { sauceNameToValue } from "@/common/data/sauces";
import sizes from "@/common/data/sizes";

export const normalizeDough = (dough) => {
  return {
    ...dough,
    value: doughSizes[dough.id],
  };
};

export const normalizeSize = (size) => {
  return {
    ...size,
    value: sizes[size.id],
  };
};

export const normalizeIngredients = (ingredient) => {
  const value = ingredientNameToValue[ingredient.name] || "unknown";

  return {
    ...ingredient,
    value,
  };
};

export const normalizeSauces = (sauce) => {
  const value = sauceNameToValue[sauce.name] || "unknown";
  return {
    ...sauce,
    value,
  };
};
