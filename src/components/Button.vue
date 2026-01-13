<script>
import { RouterLink } from "vue-router";

export default {
  name: "Button",
  props: {
    // As 4 variantes solicitadas
    variant: {
      type: String,
      default: "fill",
      validator: (value) =>
        ["fill", "fill-full", "outline", "outline-full"].includes(value),
    },
    to: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "button",
    },
  },
  computed: {
    isLink() {
      return this.to && this.to.length > 0;
    },
    buttonClasses() {
      // 1. Classes Base (Comuns a todos)
      // Adicionei font-bold e tracking para melhor legibilidade
      const base =
        "inline-flex items-center justify-center px-3 xl:px-6 py-3 text-sm md:text-base font-bold font-ProximaNova transition-all duration-200 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

      // 2. Definição das Variantes
      const variants = {
        // A: Fundo preenchido + Tamanho do conteúdo
        fill: "bg-stackrgreen-500 text-stackrblack hover:bg-stackrgreen-200 border border-transparent rounded-xl w-fit",

        // B: Fundo preenchido + Full Width
        "fill-full":
          "bg-stackrgreen-500 text-stackrblack hover:bg-stackrgreen-200 border border-transparent rounded-xl w-full shadow-md",

        // C: Outline + Tamanho do conteúdo
        outline:
          "bg-transparent text-stackrgreen-500 border-2 border-stackrgreen-500 hover:bg-stackrgreen-500 hover:text-stackrblack rounded-xl w-fit",

        // D: Outline + Full Width
        "outline-full":
          "bg-transparent text-stackrgreen-500 border-2 border-stackrgreen-500 hover:bg-stackrgreen-500 hover:text-stackrblack rounded-xl w-full",

        cancel:
          "rounded-xl w-fit border border-red-500 text-red-500 hover:bg-red-500 hover:text-white",
      };

      return `${base} ${variants[this.variant]}`;
    },
  },
};
</script>

<template>
  <RouterLink v-if="isLink" :to="to" :class="buttonClasses">
    <slot></slot>
  </RouterLink>

  <button v-else :type="type" :class="buttonClasses">
    <slot></slot>
  </button>
</template>
