<script>
import router from "@/router";
import { useAuthStore } from "@/stores/authStore";

export default {
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  data() {
    return {
      username: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async handleLogin() {
      try {
        this.error = null;
        await this.authStore.login(this.username, this.password);
        router.push("/main");
      } catch (err) {
        this.error = "Erro: Credenciais erradas.";
      }
    },
  },
};
</script>

<template>
  <h1>Login</h1>

  <form @submit.prevent="handleLogin">
    <div>
      <label>Username: </label>
      <input type="text" v-model="username" placeholder="joao" required />
    </div>

    <br />

    <div>
      <label>Password: </label>
      <input type="password" v-model="password" placeholder="joao" required />
    </div>

    <br />

    <button type="submit">Entrar</button>
  </form>

  <p v-if="error" style="color: red">{{ error }}</p>
</template>

<style lang="scss" scoped></style>
