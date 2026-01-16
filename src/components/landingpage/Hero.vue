<template>
  <div class="flex flex-col items-center transition-all duration-500">
    <div
      ref="heroContent"
      class="text-3xl min-[475px]:text-5xl md:text-7xl max-w-5xl text-center font-ProximaNova font-bold mt-20"
    >
      <img src="/hero-image.png" class="mx-auto block hero-img" width="600" />
      <h1 class="mt-10 hero-title">
        Managing <span class="text-stackrgreen-500">Finances</span><br />
        Made Easy
      </h1>
    </div>

    <div class="hero-sub">
      <h3 class="text-stackrgrey-light mt-4 text-xs min-[475px]:text-base">
        Track Your Money. Master Your Habits.
      </h3>
    </div>

    <div class="hero-btn-container mt-5 w-full flex justify-center px-5">
      <Button variant="fill-full" class="max-w-3xl" to="/register">
        Start Now
      </Button>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";
// Verifique se este caminho está correto. Se estiver na pasta landingpage, use @/components/Button.vue
import Button from "@/components/Button.vue";

export default {
  components: {
    Button,
  },
  mounted() {
    // Criamos a timeline
    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 0.8 },
    });

    // Sequência de animação
    tl.from(".hero-img", {
      scale: 0.8,
      opacity: 0,
      duration: 1.2,
    })
      .from(
        ".hero-title",
        {
          y: 40,
          opacity: 0,
        },
        "-=0.6"
      ) // Inicia 0.6s antes do fim da anterior
      .from(
        ".hero-sub",
        {
          y: 20,
          opacity: 0,
        },
        "-=0.4"
      )
      .from(
        ".hero-btn-container",
        {
          y: 20,
          opacity: 0,
          clearProps: "all", // Limpa as propriedades após a animação para não quebrar o hover do botão
        },
        "-=0.4"
      );
  },
};
</script>

<style lang="scss" scoped>
// Garante que o container não esconda o botão caso haja algum overflow
.hero-btn-container {
  display: flex;
  visibility: visible;
}
</style>
