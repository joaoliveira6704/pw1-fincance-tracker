import { defineStore } from "pinia";
import * as api from "@/api/api.js";
import * as factory from "@/utils/factories";

const BASE_URL = "http://localhost:3000";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [],
    loading: false,
    error: null,
  }),
  getters: {
    getUsers: (state) => state.users,
    getUser: (state) => (username) =>
      state.users.find((user) => user.username === username),
  },
  actions: {
    async fetchUsers() {
      this.loading = true;
      this.error = null;
      try {
        this.users = await api.get(BASE_URL, "users");
      } catch (e) {
        this.error = e.message;
        console.error("Error fetching users:", e);
      } finally {
        this.loading = false;
      }
    },
    async fetchUserById(id) {
      this.loading = true;
      this.error = null;
      try {
        return await api.get(BASE_URL, `users/${id}`);
      } catch (e) {
        this.error = e.message;
        console.error("Error fetching user:", e);
      } finally {
        this.loading = false;
      }
    },
    async fetchLoggedUser() {
      this.loading = true;
      this.error = null;

      try {
        // Test Skeleton
        await new Promise((resolve) => setTimeout(resolve, 500));
        const session = JSON.parse(localStorage.getItem("user-session"));
        if (!session) throw new Error("No session found");
        const loggedUserId = session.userId;

        return await this.fetchUserById(loggedUserId);
      } catch (e) {
        this.error = e.message;
        console.error("Error fetching user:", e);
      } finally {
        this.loading = false;
      }
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
