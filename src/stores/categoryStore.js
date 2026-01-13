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

    async createCategory(data) {
      try {
        await api.post(BASE_URL, "categories", data);
      } catch (e) {
        console.error("Erro ao criar categorias:", e);
      } finally {
        this.categories.push(data);
      }
    },

    async removeCategory(id) {
      try {
        await api.remove(BASE_URL, `categories/${id}`);
      } catch (e) {
        console.error("Erro ao criar categorias:", e);
      } finally {
        this.categories = this.categories.filter(
          (category) => category.id !== id
        );
      }
    },

    checkDuplicate(string) {
      console.log(this.categories.some((item) => item.label == string));
      return this.categories.some((item) => item.label == string);
    },
  },
});
