<script>
import { RouterLink } from "vue-router";
import Button from "@/components/Button.vue";
import Logo from "@/components/Logo.vue";
import { useAuthStore } from "@/stores/authStore";
import { mapActions, mapState } from "pinia";
import gsap from "gsap";

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
    gsap.from(this.$refs.nav, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      clearProps: "transform",
    });
  },
};
</script>

<template>
  <nav
    ref="nav"
    class="fixed top-0 left-1/2 -translate-x-1/2 z-50 flex w-[calc(100%-2.5rem)] max-w-6xl items-center justify-between py-4 px-6 mt-4 md:mt-5 bg-navbar-bg/90 backdrop-blur-lg rounded-2xl"
  >
    <Logo />

    <div v-if="isSessionValid" class="flex space-x-2">
      <Button variant="fill" to="/main">Dashboard</Button>
    </div>

    <div v-else class="flex space-x-2">
      <Button variant="outline" to="/login">Login</Button>
      <Button variant="fill" to="/register">Register</Button>
    </div>
  </nav>
</template>
