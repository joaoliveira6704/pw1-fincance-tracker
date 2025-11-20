<script>
import BlurCircle from "@/components/BlurCircle.vue";
import Hero from "@/components/Hero.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  components: {
    Navbar,
    BlurCircle,
    Hero,
  },
};
</script>

<template>
  <main class="items-center flex flex-col relative z-10">
    <BlurCircle />
    <Navbar />
    <Hero />
  </main>
</template>

<style lang="scss" scoped></style>
