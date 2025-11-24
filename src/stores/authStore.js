import { defineStore } from "pinia";
import router from "@/router";

function getUserSession() {
  const data =
    localStorage.getItem("user-session") ||
    sessionStorage.getItem("user-session");
  return data ? JSON.parse(data) : {};
}

async function saveUserSession(userId, token) {
  localStorage.setItem("user-session", JSON.stringify({ userId, token }));

  try {
    const checkResponse = await fetch(
      `http://localhost:3000/userSessions?userId=${userId}`
    );
    const existingSessions = await checkResponse.json();

    if (existingSessions.length > 0) {
      const sessionId = existingSessions[0].id;

      await fetch(`http://localhost:3000/userSessions/${sessionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: token,
        }),
      });
    } else {
      await fetch("http://localhost:3000/userSessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          token: token,
        }),
      });
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

      const url = `http://localhost:3000/userSessions?userId=${this.userId}&token=${this.sessionToken}`;
      try {
        const response = await fetch(url);
        const data = await response.json();

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
      const url = `http://localhost:3000/users?username=${username}&password=${password}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.length === 1) {
          const loggedInUser = data[0];
          const token = crypto.randomUUID();

          this.userId = loggedInUser.id;
          this.sessionToken = token;

          await saveUserSession(this.userId, this.sessionToken);

          router.push("/main");
          return true;
        } else {
          throw new Error("Credenciais inválidas");
        }
      } catch (error) {
        console.error("Erro de login:", error);
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
