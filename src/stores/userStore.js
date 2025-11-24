import { defineStore } from "pinia";
import * as api from "@/api/api.js";
import * as factory from "@/utils/factories";

const BASE_URL = "http://localhost:3000";

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
        this.users = await api.get(BASE_URL, "users");
      } catch (e) {
        this.error = e.message;
        console.error("Error fetching users:", e);
      }
    },
    async fetchUserById(id) {
      try {
        return await api.get(BASE_URL, `users/${id}`);
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
    async addUser(username, firstName, lastName, email, password) {
      try {
        const userData = factory.createUser(
          username,
          firstName,
          lastName,
          email,
          password
        );
        return await api.post(BASE_URL, "users", userData);
      } catch (e) {
        this.error = e.message;
        console.error("Error adding user:", e);
        throw e;
      }
    },
  },
});
