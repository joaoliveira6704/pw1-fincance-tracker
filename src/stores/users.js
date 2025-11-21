import { defineStore } from "pinia";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [],
  }),
  getters: {
    getUsers: (state) => state.users,
    getUser: (state) => (username) =>
      state.users.find((user) => user.username === username),
  },
  actions: {
    async fetchUsers() {
      try {
        const response = await fetch("http://localhost:3000/users");

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        this.users = data;
      } catch (e) {
        this.error = e.message;
        console.error("Error fetching users:", e);
      }
    },
    async fetchUserById(id) {
      try {
        const response = await fetch(`http://localhost:3000/users/${id}`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
      } catch (e) {
        this.error = e.message;
        console.error("Error fetching user:", e);
      }
    },
  },
});
