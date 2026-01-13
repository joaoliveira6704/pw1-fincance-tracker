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
    loading: false,
  }),
  getters: {
    getExpenses: (state) => state.expenses,
    getTotalByMonth: (state) => {
      return (dateInput) => {
        const targetDate = new Date(dateInput);
        const targetMonth = targetDate.getMonth();
        const targetYear = targetDate.getFullYear();

        return state.expenses
          .filter((expense) => {
            const expenseDate = new Date(expense.date);
            return (
              expenseDate.getMonth() === targetMonth &&
              expenseDate.getFullYear() === targetYear
            );
          })
          .reduce((sum, expense) => sum + Number(expense.amount), 0);
      };
    },
  },
  actions: {
    async fetchExpenses() {
      this.loading = true;
      const userId = getUserId();
      if (!userId) return;

      try {
        const data = await api.get(BASE_URL, `expenses?userId=${userId}`);
        this.expenses = data;
      } catch (e) {
        console.error("Erro ao buscar despesas:", e);
      } finally {
        this.loading = false;
      }
    },
    async addExpense(date, name, categoryId, amount, description) {
      const userId = getUserId();
      const expenseData = factory.createExpense(
        userId,
        name,
        categoryId,
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
    async removeExpense(id) {
      try {
        await api.remove(BASE_URL, `expenses/${id}`);
        const expenseIndex = this.expenses.findIndex((e) => e.id == id);
        this.expenses.splice(expenseIndex, 1);
      } catch (e) {
        console.error("Error removing expense", e);
      }
    },
    async updateExpense(expense) {
      this.loading = true;
      try {
        await api.patch(BASE_URL, `expenses/${expense.id}`, {
          ...expense,
        });

        const expenseIndex = this.expenses.findIndex(
          (o) => o.id === expense.id
        );

        if (expenseIndex !== -1) {
          this.expenses.splice(expenseIndex, 1, { ...expense });
        }

        return expense;
      } catch (e) {
        this.error = e.message;
        console.error("Error updating expense:", e);
        throw e;
      } finally {
        this.loading = false;
      }
    },
  },
});
