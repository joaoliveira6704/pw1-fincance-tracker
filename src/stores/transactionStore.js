import { defineStore } from "pinia";

export const useTransactionStore = defineStore("transactions", {
  state: () => ({
    transactions: [],
  }),
  getters: {
    getTransactions: (state) => state.transactions,
  },
  actions: {
    async fetchTransactions() {
      const response = await fetch("http://localhost:3000/transactions");

      const data = await response.json();
      this.transactions = data;
    },
  },
});
