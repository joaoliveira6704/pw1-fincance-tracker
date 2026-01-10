import { defineStore } from "pinia";
import * as api from "@/api/api.js";
import * as factory from "@/utils/factories";

const BASE_URL = "http://localhost:3000";

export const useCategoryStore = defineStore("categories", {
  state: () => ({
    categories: [],
  }),
  getters: {
    getCategories: (state) => state.categories,
    getCategoryById: (state) => (id) =>
      state.categories.find((c) => c.id == id),
  },
  actions: {
    async fetchCategories() {
      try {
        const data = await api.get(BASE_URL, "categories");
        this.categories = data;
      } catch (e) {
        console.error("Erro ao buscar categorias:", e);
      }
    },
  },
});
