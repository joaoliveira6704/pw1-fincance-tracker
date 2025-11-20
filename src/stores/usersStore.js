import { defineStore } from "pinia";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [
      {
        id:1,
        username: "joao",
        firstName: "João",
        lastName: "Oliveira",
        createdAt: "2025-05-24",
        income: 12000,
        objectives: [1, 2],
        expenses: [1, 3, 4, 5],
        friends: ["miguel"],
      },
      {
        id:2,
        username: "miguel",
        firstName: "Miguel",
        lastName: "Neto",
        createdAt: "2023-04-21",
        income: 18490,
        objectives: [10, 22],
        expenses: [12, 31, 41, 51],
      },
    ],
  }),
  getters: {
    getUsers: (state) => state.users,
    getUser: (state) => (username) =>
      state.users.find((user) => user.username === username),
  },
  actions: {},
});
