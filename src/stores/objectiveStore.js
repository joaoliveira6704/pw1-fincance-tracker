import { defineStore } from "pinia";
import * as api from "@/api/api.js";
import * as factory from "@/utils/factories.js";

const BASE_URL = "http://localhost:3000";

function getUserId() {
  const sessionStr = localStorage.getItem("user-session");
  if (!sessionStr) return null;
  return JSON.parse(sessionStr).userId;
}

export const useObjectivesStore = defineStore("objectives", {
  state: () => ({
    objectives: [],
  }),

  getters: {
    getObjectives: (state) => state.objectives,
    getIndexById: (state) => (objId) =>
      state.objectives.findIndex((obj) => obj.id === objId),
  },

  actions: {
    async fetchObjectives() {
      const userID = getUserId();
      if (!userID) return;

      try {
        const data = await api.get(BASE_URL, `objectives?userID=${userID}`);
        this.objectives = data;
      } catch (e) {
        console.error("Erro ao buscar Objetivos", e);
      }
    },

    async addObjective(
      name,
      targetAmount,
      deadline,
      status,
      isShared,
      memberIds
    ) {
      const userId = getUserId();
      const objectiveData = factory.createGoal(
        name,
        targetAmount,
        deadline,
        status,
        userId,
        isShared,
        memberIds
      );
      try {
        await api.post(BASE_URL, "objectives", objectiveData);
        this.objectives.push(objectiveData);
        return;
      } catch (e) {
        this.error = e.message;
        console.error("Error adding Objective", e);
        throw e;
      }
    },
  },
});
