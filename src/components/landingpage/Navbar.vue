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

    // Animação da Navbar
    gsap.from(this.$refs.nav, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
    });
  },
};
</script>

<template>
  <div
    ref="nav"
    class="flex w-screen max-w-7xl py-6 px-8 rounded-none md:rounded-xl text-center justify-between fixed mt-0 md:mt-5 backdrop-blur-sm z-50 border border-white/10"
  >
    <Logo />
    <div v-if="isSessionValid" class="flex space-x-2">
      <Button variant="fill" to="/main">Dashboard</Button>
    </div>

    <div v-else class="flex space-x-2">
      <Button variant="outline" to="/login">Login</Button>
      <Button variant="fill" to="/register">Register</Button>
    </div>
  </div>
</template>
