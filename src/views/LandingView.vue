<script>
import BlurCircle from "@/components/BlurCircle.vue";
import Hero from "@/components/Hero.vue";
import Navbar from "@/components/Navbar.vue";
import LightDarkBtn from "@/components/LightDarkBtn.vue";
import SocialProof from "@/components/SocialProof.vue";
import KillerFeature from "@/components/KillerFeature.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Navbar,
    BlurCircle,
    Hero,
    LightDarkBtn,
    SocialProof,
    KillerFeature,
    Footer,
  },
};
</script>

<template>
  <LightDarkBtn variant="landing" />
  <main class="items-center flex flex-col relative z-10">
    <BlurCircle />
    <Navbar />
    <Hero />
    <KillerFeature />
    <SocialProof />
    <Footer />
  </main>
</template>

<style lang="scss" scoped></style>
