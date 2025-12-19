<script>
import { RouterLink } from "vue-router";
import Button from "@/components/Button.vue";
import Logo from "@/components/Logo.vue";
import { useAuthStore } from "@/stores/authStore";
import { mapActions, mapState } from "pinia";

export default {
  components: {
    Button,
    Logo,
  },
  data() {
    return {
      isSessionValid: false,
    };
  },
  methods: {
    ...mapActions(useAuthStore, ["validateSession"]),
  },
  computed: {
    ...mapState(useAuthStore, ["userSession"]),
  },
  async mounted() {
    this.isSessionValid = await this.validateSession();
  },
};
</script>

<template>
  <div
    class="flex w-full max-w-7xl py-6 px-8 rounded-xl text-center justify-between fixed mt-5 backdrop-blur-sm z-50"
  >
    <Logo />
    <div v-if="isSessionValid" class="flex space-x-2">
      <Button variant="fill" to="/main">Dashboard</Button>
    </div>

    <div v-else class="flex space-x-2">
      <Button variant="outline" to="/login">Login</Button>
      <Button variant="fill" to="/register">Register</Button>
      <router-link to="/login">Login</router-link>
    </div>
  </div>
</template>

<style scoped></style>
