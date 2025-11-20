<script>
import LandingView from "@/views/LandingView.vue";
import { RouterView } from "vue-router";

export default {
  data() {
    return {};
  },
};
</script>

<template>
  <RouterLink to="/">Página Inicial</RouterLink>
  <RouterLink to="/profile">Perfil</RouterLink>
  <RouterLink to="/register">Register</RouterLink>
  <RouterView />
</template>

<style scoped></style>
