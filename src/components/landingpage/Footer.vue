<template>
  <footer ref="footer" class="text-gray-400 mt-30 w-full px-0 md:px-40">
    <hr class="border border-border" />
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div class="col-span-2 md:col-span-1 space-y-4 footer-content">
          <h3 class="text-xl font-ProximaNova-Bold text-white">stackr</h3>
          <p class="text-sm">Commit to your financial health.</p>
          <p class="text-sm">&copy; 2025 stackr. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default {
  mounted() {
    gsap.from(".footer-content", {
      scrollTrigger: {
        trigger: this.$refs.footer,
        start: "top bottom",
      },
      y: 20,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
  },
};
</script>
