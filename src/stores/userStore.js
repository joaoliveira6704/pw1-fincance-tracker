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
          throw new Error(`Error: ${response.status} `);
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
    async fetchLoggedUser() {
      const loggedUserId = JSON.parse(
        localStorage.getItem("user-session")
      ).userId;

      return await this.fetchUserById(loggedUserId);
    },
    async addUser(userData) {
      try {
        const response = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const newUser = await response.json();
        this.users.push(newUser);
        return newUser;
      } catch (e) {
        this.error = e.message;
        console.error("Error adding user:", e);
        throw e;
      }
    },
  },
});
