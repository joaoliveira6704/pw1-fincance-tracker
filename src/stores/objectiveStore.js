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
    loading: false,
    error: null,
  }),

  getters: {
    getObjectives: (state) => state.objectives,
    getIndexById: (state) => (objId) =>
      state.objectives.findIndex((obj) => obj.id === objId),
  },

  actions: {
    async fetchObjectives() {
      this.loading = true;
      const userID = getUserId();
      if (!userID) return;

      try {
        const data = await api.get(BASE_URL, `objectives?ownerID=${userID}`);
        this.objectives = data;
      } catch (e) {
        console.error("Erro ao buscar Objetivos", e);
      } finally {
        this.loading = false;
      }
    },

    async addObjective(name, targetAmount, deadline, description, memberIds) {
      const userId = getUserId();
      const objectiveData = factory.createGoal(
        name,
        targetAmount,
        deadline,
        description,
        userId,
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
    async addObjectiveContribution(objective, amount) {
      this.loading = true;
      try {
        const contributionObject = factory.createObjectiveContribution(amount);

        const contributionsArray = objective.contributions;

        contributionsArray.push(contributionObject);

        await api.patch(BASE_URL, `objectives/${objective.id}`, {
          contributions: contributionsArray,
        });

        const objectiveIdx = this.objectives.findIndex(
          (o) => o.id === objective.id
        );

        this.objectives[objectiveIdx].contributions = contributionsArray;
      } catch (e) {
        this.error = e.message;
        console.error("Error updating user preferences:", e);
        throw e;
      } finally {
        this.loading = false;
      }
    },
    async deleteObjective(id) {
      try {
        await api.remove(BASE_URL, `objectives/${id}`);
        const objectiveIdx = this.objectives.findIndex((o) => o.id == id);
        this.objectives.splice(objectiveIdx, 1);
      } catch (e) {
        console.error("Error removing expense", e);
      }
    },

    async updateObjective(objective) {
      this.loading = true;
      try {
        // 1. API Call
        await api.patch(BASE_URL, `objectives/${objective.id}`, {
          ...objective,
        });

        // 2. Fix: Added 'const' to prevent ReferenceError
        const objectiveIndex = this.objectives.findIndex(
          (o) => o.id === objective.id
        );

        // 3. Update local state reactively
        if (objectiveIndex !== -1) {
          this.objectives.splice(objectiveIndex, 1, { ...objective });
        }

        return objective;
      } catch (e) {
        this.error = e.message;
        console.error("Error updating objective:", e);
        throw e;
      } finally {
        this.loading = false;
      }
    },
  },
});
