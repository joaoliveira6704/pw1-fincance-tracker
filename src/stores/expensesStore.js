import { defineStore } from "pinia";

export const useExpensesStore = defineStore("expenses", {
  state: () => ({
    expenses: [],
  }),
  getters: {
    getExpenses: (state) => state.expenses,
  },
  actions: {
    async fetchExpenses() {
      try {
        const response = await fetch("http://localhost:3000/expenses");

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        this.expenses = data;
      } catch (e) {
        this.expenses = e.message;
        console.error("Error fetching epenses:", e);
      }
    },
  },
});
