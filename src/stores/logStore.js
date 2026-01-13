import { defineStore } from "pinia";
import * as api from "@/api/api.js";
import { createLog } from "@/utils/factories";

const BASE_URL = "http://localhost:3000";

export const useLogStore = defineStore("logs", {
  state: () => ({
    logs: [],
    loading: false,
    error: null,
  }),
  getters: {
    getFilteredLogs: (state) => (typeId) => {
      return state.logs.filter((l) => l.typeId === typeId);
    },
  },
  actions: {
    async fetchUserLogs(userId) {
      this.loading = true;
      this.error = null;
      try {
        const data = await api.get(BASE_URL, `logs?userId=${userId}`);
        this.logs = data;
        return data;
      } catch (e) {
        this.error = e.message;
        console.error("Error fetching user logs:", e);
        return [];
      } finally {
        this.loading = false;
      }
    },

    async addNewLog(userId, category, typeId = null, type, amount) {
      this.loading = true;
      this.error = null;
      try {
        const logObj = createLog(userId, category, typeId, type, amount);
        await api.post(BASE_URL, "logs", logObj);
        this.logs.push(logObj);
      } catch (e) {
        this.error = e.message;
        console.error("Error adding user logs:", e);
      } finally {
        this.loading = false;
      }
    },
  },
});
