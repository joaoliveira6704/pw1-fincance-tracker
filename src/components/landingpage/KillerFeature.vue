<template>
  <div
    ref="featureSection"
    class="flex flex-col md:flex-row mt-40 md:mt-50 items-center text-center"
  >
    <div
      class="text-4xl min-[475px]:text-5xl md:text-6xl max-w-2xl text-center font-ProximaNova font-bold feature-text"
    >
      <h1>
        Spot Your<br />Spending Patterns<br />
        <span class="text-stackrgreen-500">Instantly.</span>
      </h1>
      <h3
        class="text-stackrgrey-light text-sm min-[475px]:text-xl mt-4 px-3 mb-4 md:mb-0"
      >
        Stop staring at boring spreadsheets. Our heatmap visualizes your
        transaction volume day by day. See your 'financial streaks' at a
        glance—identify high-spending days and track your consistency over time.
      </h3>
    </div>
    <div class="feature-image">
      <img
        src="/killer-feature.png"
        class="mx-auto block w-85 md:w-120"
        width="600"
      />
    </div>
  </div>
</template>

<script>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default {
  mounted() {
    gsap.from(".feature-text", {
      scrollTrigger: {
        trigger: this.$refs.featureSection,
        start: "top 55%",
      },
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });

    gsap.from(".feature-image", {
      scrollTrigger: {
        trigger: this.$refs.featureSection,
        start: "top 55%",
      },
      x: 100,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
  },
};
</script>
