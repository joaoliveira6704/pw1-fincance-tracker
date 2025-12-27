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
        await this.authStore.login(this.username, this.password);
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
    class="flex flex-col h-screen text-center mx-auto items-center justify-center gap-2.5"
  >
    <div class="flex flex-col">
      <h1 class="text-3xl font-ProximaNova">Login</h1>
      <p class="text-lg">@{{ username }}</p>
    </div>
    <form
      @submit.prevent="handleLogin"
      class="bg-white text-black flex flex-col w-100 h-fit p-10 py-10 rounded-xl gap-5"
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

      <button
        type="submit"
        class="flex justify-center bg-stackrgreen-500 rounded-full hover:bg-stackrgreen-200 h-fit px-4 py-2 cursor-pointer transition-all duration-200 ease-in-out text-primary-color text-lg font-ProximaNova"
      >
        Entrar
      </button>
    </form>

    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>

<style lang="scss" scoped></style>
