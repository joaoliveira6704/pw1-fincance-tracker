<script>
import { RouterLink } from "vue-router";
import Button from "./Button.vue";
import Logo from "./Logo.vue";
import { useAuthStore } from "@/stores/authStore";

export default {
  components: {
    Button,
    Logo,
  },
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  computed: {
    isAuth() {
      return this.authStore.isAuthenticated;
    },
  },
};
</script>

<template>
  <div
    class="flex w-full max-w-7xl py-6 px-8 rounded-xl text-center justify-between fixed mt-5 backdrop-blur-sm z-50"
  >
    <Logo />
    <div v-if="isAuth" class="flex space-x-2">
      <Button variant="fill" to="/main">Entrar</Button>
    </div>

    <div v-else class="flex space-x-2">
      <Button variant="outline" to="/login">Login</Button>
      <Button variant="fill" to="/register">Register</Button>
    </div>
  </div>
</template>

<style scoped></style>
