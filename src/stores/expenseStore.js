import { defineStore } from "pinia";
import * as api from "@/api/api.js";
import * as factory from "@/utils/factories";

const BASE_URL = "http://localhost:3000";

function getUserId() {
  const sessionStr = localStorage.getItem("user-session");
  if (!sessionStr) return null;
  return JSON.parse(sessionStr).userId;
}

export const useExpenseStore = defineStore("expenses", {
  state: () => ({
    expenses: [],
  }),
  getters: {
    getExpenses: (state) => state.expenses,
  },
  actions: {
    async fetchExpenses() {
      const userId = getUserId();
      if (!userId) return;

      try {
        const data = await api.get(BASE_URL, `expenses?userId=${userId}`);
        this.expenses = data;
      } catch (e) {
        console.error("Erro ao buscar despesas:", e);
      }
    },
    async addExpense(date, name, amount, description) {
      const userId = getUserId();
      const expenseData = factory.createExpense(
        userId,
        name,
        date,
        amount,
        description
      );
      try {
        await api.post(BASE_URL, "expenses", expenseData);
        this.expenses.push(expenseData);
        return;
      } catch (e) {
        this.error = e.message;
        console.error("Error adding user:", e);
        throw e;
      }
    },
  },
});
