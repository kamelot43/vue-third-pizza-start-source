import { defineStore } from "pinia";

export const usePopupStore = defineStore("popup", {
  state: () => ({
    isVisible: false,
    type: "success", // 'success' | 'error' | 'info'
    title: "",
    message: "",
  }),
  actions: {
    show(options = {}) {
      this.isVisible = true;
      this.type = options.type || "success";
      this.title = options.title || "";
      this.message = options.message || "";
    },
    hide() {
      this.isVisible = false;
      // Сбрасываем через небольшую задержку, чтобы не было визуального мелькания
      setTimeout(() => {
        this.type = "success";
        this.title = "";
        this.message = "";
      }, 300);
    },
    showSuccess() {
      this.show({ type: "success" });
    },
    showError(message = "Не удалось оформить заказ") {
      this.show({
        type: "error",
        title: "Что-то пошло не так",
        message,
      });
    },
  },
});
