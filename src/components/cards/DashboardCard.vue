<script>
import { ArrowUpRight, ArrowDownRight } from "lucide-vue-next";

export default {
  name: "StatCard",
  components: { ArrowUpRight, ArrowDownRight },
  props: {
    label: String,
    value: String,
    trend: String,
    trendUp: Boolean,
    isGood: { type: Boolean, default: true }, // Se true, "Up" é verde. Se false, "Up" é vermelho.
    subtext: String,
    footer: String,
  },
  computed: {
    // Lógica: Se for positivo (isGood) e estiver subindo, verde.
    // Se for negativo (isGood: false, ex: despesas) e estiver descendo, verde.
    isPositiveTrend() {
      return this.isGood ? this.trendUp : !this.trendUp;
    },
    trendClass() {
      const base = "flex items-center text-xs px-2 py-1 rounded-full border ";
      return this.isPositiveTrend
        ? base + "text-green-400 border-green-900/50 bg-green-950/20"
        : base + "text-red-400 border-red-900/50 bg-red-950/20";
    },
    trendIcon() {
      return this.trendUp ? "ArrowUpRight" : "ArrowDownRight";
    },
  },
};
</script>

<template>
  <div
    class="bg-[#141414] border border-[#262626] rounded-2xl p-5 hover:border-gray-600 transition-colors"
  >
    <div class="flex justify-between items-start mb-4">
      <span class="text-sm text-gray-500 font-medium">{{ label }}</span>
      <span :class="trendClass">
        <component :is="trendIcon" :size="14" class="mr-1" />
        {{ trend }}
      </span>
    </div>
    <div class="text-3xl font-bold text-white mb-6">{{ value }}</div>
    <div class="flex items-center gap-2 text-sm text-white mb-1">
      <span class="opacity-80">{{ subtext }}</span>
    </div>
    <div class="text-xs text-gray-500">{{ footer }}</div>
  </div>
</template>
