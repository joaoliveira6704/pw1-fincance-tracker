import { defineStore } from "pinia";
import * as api from "@/api/api.js";
import * as factory from "@/utils/factories";
import { getUserId } from "@/utils/session";
import { encryptPassword } from "@/utils/encrypt";

const BASE_URL = "http://localhost:3000";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [],
    currentUser: null,
    currentQuote: null,
    loading: false,
    error: null,
  }),
  getters: {
    getUsers: (state) => state.users,
    getUser: (state) => (username) =>
      state.users.find((user) => user.username === username),
  },
  actions: {
    async fetchQuote(type) {
      this.loading = true;
      this.error = null;
      try {
        let quoteData = await api.get(
          "https://inspirational-quotes-api.vercel.app/api/v1",
          `quotes?category=motivation,${type}&random=true`
        );

        this.currentQuote = quoteData.data[0];
      } catch (e) {
        this.error = e.message;
        console.error("Error fetching quote:", e);
      } finally {
        this.loading = false;
      }
    },
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
    async fetchUserByUsername(username) {
      this.loading = true;
      this.error = null;
      try {
        return await api.get(BASE_URL, `users?username=${username}`);
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
        // Uncomment to test Skeleton
        await new Promise((resolve) => setTimeout(resolve, 500));
        const session = JSON.parse(localStorage.getItem("user-session"));
        if (!session) throw new Error("No session found");
        const loggedUserId = session.userId;
        this.currentUser = await this.fetchUserById(loggedUserId);
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
    async updateUserPreferences(newPreferences) {
      this.loading = true;
      try {
        const userId = getUserId();

        const updatedUser = await api.patch(BASE_URL, `users/${userId}`, {
          preferences: newPreferences,
        });

        if (this.currentUser && this.currentUser.id === userId) {
          this.currentUser.preferences = { ...newPreferences };
        }

        return updatedUser;
      } catch (e) {
        this.error = e.message;
        console.error("Error updating user preferences:", e);
        throw e;
      } finally {
        this.loading = false;
      }
    },
    async fetchUserLogs(userId) {
      this.loading = true;
      this.error = null;
      try {
        return await api.get(BASE_URL, `logs?userId=${userId}`);
      } catch (e) {
        this.error = e.message;
        console.error("Error fetching users:", e);
      } finally {
        this.loading = false;
      }
    },
    async updateUser(user) {
      this.loading = true;
      try {
        await api.patch(BASE_URL, `users/${user.id}`, {
          ...user,
        });

        const userIndex = this.users.findIndex((o) => o.id === user.id);

        if (userIndex !== -1) {
          this.users.splice(userIndex, 1, { ...user });
        }

        return user;
      } catch (e) {
        this.error = e.message;
        console.error("Error updating user:", e);
        throw e;
      } finally {
        this.loading = false;
      }
    },
  },
  async mounted() {
    await fetchLoggedUser();
  },
});
