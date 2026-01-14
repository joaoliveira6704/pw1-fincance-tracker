<script>
import router from "@/router";
import { useAuthStore } from "@/stores/authStore";
import RegisterInput from "@/components/RegisterInput.vue";
import Button from "@/components/Button.vue";

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
        await this.authStore.login(this.username.toLowerCase(), this.password);
        router.push("/main");
      } catch (err) {
        this.error = "Erro: Credenciais erradas.";
      }
    },
  },
  components: {
    RegisterInput,
    Button,
  },
};
</script>

<template>
  <!-- WRAPPER -->
  <div
    class="flex bg-main-bg flex-col h-screen mx-auto items-center justify-center gap-2.5"
  >
    <div class="flex flex-col">
      <h1 class="text-3xl font-ProximaNova font-bold">Login</h1>
      <p class="text-base text-stackrgreen-500">
        @{{ username.toLowerCase() }}
      </p>
    </div>
    <form
      @submit.prevent="handleLogin"
      class="bg-navbar-bg border border-border text-primary-text flex flex-col w-100 h-fit p-10 py-10 rounded-xl gap-5"
    >
      <div>
        <RegisterInput
          v-model="username"
          label-text="Username"
          :is-valid="null"
          required
        />
        <RegisterInput
          v-model="password"
          label-text="Password"
          :is-valid="null"
          input-type="password"
          required
        />
      </div>

      <Button variant="fill-full" type="submit">Login</Button>
      <p>Ainda não tens conta?</p>
      <Button variant="outline-full" to="/register">Criar Conta</Button>
    </form>

    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>

<style lang="scss" scoped></style>
