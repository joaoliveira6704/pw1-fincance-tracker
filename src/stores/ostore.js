import { defineStore } from "pinia";

export const useObjectiveStore = defineStore("objective", {
  state: () => ({
    counter: 1,
    objectives: [
      {
        id: 1,
        name: "Viagem",
        meta: 1000,
        log: [
          {
            type: "in",
            amount: 10,
            date: "2025-11-15T14:40:00",
          },
          {
            type: "out",
            amount: 5,
            date: "2025-11-16T13:00:00",
          },
        ],
        createdDate: "2025-11-01",
        dueDate: "2025-12-01",
        hasFixedContribution: true,
        fixedContribution: 20,
      },
      {
        id: 2,
        name: "Carro",
        meta: 12000,
        log: [
          {
            type: "in",
            amount: 10,
            date: "2025-11-15T14:40:00",
          },
          {
            type: "out",
            amount: 5,
            date: "2025-11-16T13:00:00",
          },
        ],
        createdDate: "2025-11-01",
        dueDate: "2025-12-01",
        hasFixedContribution: false,
        fixedContribution: 20,
      },
    ],
  }),

  getters: {
    getIndexById: (state) => (objId) =>
      state.objectives.findIndex((obj, index) => obj.id === objId),
  },

  actions: {
    createObjective(
      name,
      meta,
      /* dueDate, */
      hasFixedContribution,
      fixedContribution
    ) {
      const obj = {
        id: this.objectives.length + 1,
        name,
        meta,
        logs: [],
        createdDate: Date.now().toString(),
        /* dueDate, */
        hasFixedContribution,
        fixedContribution,
      };
      this.objectives.push(obj);
      console.log(this.objectives);
    },

    deleteObjective(id) {
      this.objectives.splice(this.getIndexById(id), 1);
    },

    logID(id) {
      console.log(id);
    },
  },
});
