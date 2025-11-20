<script>
import BlurCircle from "@/components/BlurCircle.vue";
import Hero from "@/components/Hero.vue";
import Navbar from "@/components/Navbar.vue";
import LightDarkBtn from "@/components/LightDarkBtn.vue";

export default {
  components: {
    Navbar,
    BlurCircle,
    Hero,
    LightDarkBtn,
  },
};
</script>

<template>
  <LightDarkBtn />
  <main class="items-center flex flex-col relative z-10">
    <BlurCircle />
    <Navbar />
    <Hero />
  </main>
</template>

<style lang="scss" scoped></style>
