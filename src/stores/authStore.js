import { defineStore } from "pinia";
import router from "@/router";
import * as api from "@/api/api.js";
import { comparePassword } from "@/utils/encrypt";

const BASE_URL = "http://localhost:3000";

function getUserSession() {
  const data =
    localStorage.getItem("user-session") ||
    sessionStorage.getItem("user-session");
  return data ? JSON.parse(data) : {};
}

async function saveUserSession(userId, token) {
  localStorage.setItem("user-session", JSON.stringify({ userId, token }));

  try {
    const existingSessions = await api.get(
      BASE_URL,
      `userSessions?userId=${userId}`
    );

    if (existingSessions.length > 0) {
      const newData = {
        id: existingSessions[0].id,
        userId: existingSessions[0].userId,
        token: token,
      };

      const message = await api.patch(
        BASE_URL,
        `userSessions/${existingSessions[0].id}`,
        newData
      );

      console.log(message);
    } else {
      const data = {
        userId: userId,
        token: token,
      };

      const message = await api.post(BASE_URL, "userSessions", data);

      console.log(message);
    }
  } catch (error) {
    console.error("Erro do servidor:", error);
  }
}

export const useAuthStore = defineStore("auth", {
  state: () => {
    const userSession = getUserSession();
    return {
      userId: userSession.userId || null,
      sessionToken: userSession.token || null,
    };
  },

  getters: {
    isAuthenticated: (state) => !!state.userId && !!state.sessionToken,
  },

  actions: {
    async validateSession() {
      if (!this.userId || !this.sessionToken) return false;

      try {
        const data = await api.get(
          BASE_URL,
          `userSessions?userId=${this.userId}&token=${this.sessionToken}`
        );

        if (data.length === 1) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        this.logout();
        console.log(error);
        return false;
      }
    },

    async login(username, password) {
      try {
        const data = await api.get(BASE_URL, `users?username=${username}`);

        // Check if user exists
        if (data.length === 0) {
          throw new Error("Utilizador não encontrado");
        }

        const user = data[0];

        // Verify password using your utility
        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
          // If passwords don't match, we stop here
          throw new Error("Senha incorreta");
        }

        // Success logic: Generate token and update state
        const token = crypto.randomUUID();
        this.userId = user.id;
        this.sessionToken = token;

        await saveUserSession(this.userId, this.sessionToken);

        router.push("/main");
        return true;
      } catch (error) {
        console.error("Erro de login:", error.message);
        throw error;
      }
    },

    logout() {
      this.userId = null;
      this.sessionToken = null;
      localStorage.removeItem("user-session");
      sessionStorage.removeItem("user-session");
      router.push("/login");
    },
  },
});
