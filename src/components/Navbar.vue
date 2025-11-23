<script>
import { RouterLink } from "vue-router";
import Button from "./Button.vue";
import Logo from "./Logo.vue";
export default {
  components: {
    Button,
    Logo,
  },
};
</script>

<template>
  <div
    class="flex w-full max-w-7xl py-6 px-8 rounded-xl text-center justify-between fixed mt-5 backdrop-blur-sm"
  >
    <Logo />
    <div class="flex space-x-2">
      <Button variant="outline" to="/login">Login</Button>
      <Button variant="fill" to="/register">Register</Button>
    </div>
  </div>
</template>

<style scoped></style>
