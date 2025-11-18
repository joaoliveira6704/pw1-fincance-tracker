<script>
import LandingView from "@/views/LandingView.vue";
import { RouterView } from "vue-router";
export default {
  data() {
    return {};
  },
  components: {
    LandingView,
  },
};
</script>

<template>
  <RouterLink to="/">Página Inicial</RouterLink>
  <RouterLink to="/profile">Perfil</RouterLink>
  <RouterView />
</template>

<style scoped></style>
