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
  <h1 class="text-3xl font-bold underline text-red-400">Tailwind!</h1>
  <RouterView />
</template>

<style scoped></style>
