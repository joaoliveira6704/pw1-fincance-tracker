<template>
  <div
    ref="socialSection"
    class="flex flex-col md:flex-row mt-20 md:mt-50 items-center text-center"
  >
    <div class="social-image">
      <img
        src="/social-proof.png"
        class="mx-auto hidden md:block w-85 md:w-60"
        width="600"
      />
    </div>
    <div
      class="text-4xl min-[475px]:text-5xl md:text-6xl max-w-2xl text-center font-ProximaNova font-bold social-text"
    >
      <h1>
        Reach Goals<br />
        <span class="text-stackrgreen-500">Together.</span>
      </h1>
      <h3
        class="text-stackrgrey-light mt-4 text-sm min-[475px]:text-xl px-3 mb-4 md:mb-0"
      >
        Planning a group trip or a joint gift? Don't do it alone. Add friends,
        create shared goals, and track contributions in real-time. See exactly
        who paid what and how close you are to the target.
      </h3>
    </div>
    <div class="social-image">
      <img
        src="/social-proof.png"
        class="mx-auto block md:hidden w-85 md:w-60"
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
    gsap.from(".social-image", {
      scrollTrigger: {
        trigger: this.$refs.socialSection,
        start: "top 80%",
      },
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });

    gsap.from(".social-text", {
      scrollTrigger: {
        trigger: this.$refs.socialSection,
        start: "top 80%",
      },
      x: 100,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
  },
};
</script>
