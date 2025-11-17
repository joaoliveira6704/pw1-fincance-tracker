import { defineStore } from "pinia";

export const useObjectiveStore = defineStore("objective", {
  state: () => {
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
    ];
  },

  getters: {
    getObjectiveById: (state) => (objId) =>
      state.objectives.find((obj) => obj.id === objId),
  },
});
