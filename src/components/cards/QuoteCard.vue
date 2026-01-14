<script>
import { Quote, ArrowUpRight, TrendingUp } from "lucide-vue-next";

export default {
  name: "QuoteCard",
  components: { Quote, ArrowUpRight, TrendingUp },
  props: {
    label: {
      type: String,
      default: "Dica Financeira",
    },
    quote: {
      type: String,
      required: true,
    },
    subtext: {
      type: String,
      default: "",
    },
    variant: {
      type: String,
      default: "default",
    },
  },
};
</script>

<template>
  <div
    class="group relative overflow-hidden border rounded-3xl p-6 bg-navbar-bg border-border hover:border-stackrgreen-500/50 transition-all duration-300 shadow-sm hover:shadow-md"
  >
    <div
      class="absolute -right-4 -top-4 w-24 h-24 bg-main blur-3xl rounded-full"
    ></div>

    <div class="relative z-10">
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center gap-2">
          <div
            class="p-1.5 bg-main-bg border border-border rounded-lg text-stackrgreen-500"
          >
            <Quote class="w-4 h-4" />
          </div>
          <span class="text-primary-text text-sm font-medium">
            {{ label }}
          </span>
        </div>
      </div>

      <div class="mb-4">
        <p
          class="text-xl md:text-2xl font-ProximaNova font-bold text-primary-text leading-tight tracking-tight"
        >
          "{{ quote }}"
        </p>
      </div>

      <div
        v-if="subtext"
        class="flex items-center gap-2 pt-4 border-t border-border/50"
      >
        <div class="w-1.5 h-1.5 rounded-full bg-stackrgreen-500"></div>
        <span class="text-xs font-medium text-secondary-text font-Roboto">
          {{ subtext }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Efeito de escala suave no texto ao passar o rato */
.group:hover p {
  color: var(--primary-text);
  transform: translateY(-1px);
  transition: all 0.3s ease;
}
</style>
