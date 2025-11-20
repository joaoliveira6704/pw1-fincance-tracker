<script>
import { RouterLink } from "vue-router";
import Button from "./Button.vue";
export default {
  components: {
    Button,
  },
};
</script>

<template>
  <div
    class="flex w-full max-w-7xl py-6 px-8 rounded-xl text-center justify-between fixed mt-5"
  >
    <img src="/logo-text.svg" alt="" srcset="" width="150" />
    <div class="flex space-x-2">
      <Button variant="fill"><RouterLink to="/login">Login</RouterLink></Button>
      <Button variant="outline"
        ><RouterLink to="/register">Register</RouterLink></Button
      >
    </div>
  </div>
</template>

<style scoped></style>
