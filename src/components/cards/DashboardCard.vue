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
    isGood: { type: Boolean, default: true },
    subtext: String,
    footer: String,
    hasTrend: { type: Boolean, default: true },
  },
  computed: {
    isPositiveTrend() {
      return this.isGood ? this.trendUp : !this.trendUp;
    },
    trendClass() {
      const base =
        "flex items-center text-primary-text text-xs px-2 py-1 rounded-full border ";
      return this.isGood
        ? base + "border-green-900/50 bg-green-500/20"
        : base + "border-red-900/50 bg-red-500/20";
    },
    trendIcon() {
      return this.trendUp ? "ArrowUpRight" : "ArrowDownRight";
    },
  },
};
</script>

<template>
  <div
    class="border rounded-2xl p-5 bg-navbar-bg border-border transition-colors"
  >
    <div class="flex justify-between items-start mb-4">
      <span class="text-sm font-medium text-primary-text">{{ label }}</span>
      <span v-if="hasTrend" :class="trendClass">
        <component :is="trendIcon" :size="14" class="mr-1" />
        {{ trend }}
      </span>
    </div>
    <div class="text-3xl font-bold text-primary-text mb-6">{{ value }}</div>
    <div class="flex items-center gap-2 text-sm mb-1">
      <span class="text-primary-text">{{ subtext }}</span>
    </div>
    <div class="text-xs" id="footer">{{ footer }}</div>
  </div>
</template>

<style scoped></style>
