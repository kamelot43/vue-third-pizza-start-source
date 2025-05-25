import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    addresses: JSON.parse(localStorage.getItem('addresses')) || [],
    editingAddress: null
  }),

  actions: {
    addAddress(address) {
      this.addresses.push({ ...address, id: Date.now() });
      this.saveToLocalStorage();
    },

    updateAddress(updatedAddress) {
      const index = this.addresses.findIndex(a => a.id === updatedAddress.id);
      if (index !== -1) {
        this.addresses.splice(index, 1, updatedAddress);
        this.saveToLocalStorage();
      }
    },

    deleteAddress(addressId) {
      this.addresses = this.addresses.filter(a => a.id !== addressId);
      this.saveToLocalStorage();
    },

    startEditing(address) {
      this.editingAddress = { ...address };
    },

    cancelEditing() {
      this.editingAddress = null;
    },

    saveToLocalStorage() {
      localStorage.setItem('addresses', JSON.stringify(this.addresses));
    }
  }
});
