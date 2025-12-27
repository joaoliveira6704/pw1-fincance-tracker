<template>
  <header class="flex justify-between items-center mb-8">
    <h1 class="text-white text-xl font-medium">Dashboard</h1>
    <button
      class="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-200 transition"
    ></button>
  </header>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
    <DashboardCard
      v-for="(metric, index) in metrics"
      :key="index"
      v-bind="metric"
    />
  </div>

  <DashboardChart />

  <Heatmap :heatmapData="[]" />
</template>

<script>
import DashboardCard from "../cards/DashboardCard.vue";
import DashboardChart from "../charts/DashboardChart.vue";
import Heatmap from "../charts/Heatmap.vue";

export default {
  components: { Heatmap, DashboardChart, DashboardCard },
  data() {
    return {
      metrics: [
        {
          label: "-----",
          value: "-----",
          trend: "-----",
          trendUp: true,
          isGood: true,
          subtext: "--------",
          footer: "---------",
        },
        {
          label: "-----",
          value: "-----",
          trend: "-----",
          trendUp: true,
          isGood: true,
          subtext: "--------",
          footer: "---------",
        },
        {
          label: "-----",
          value: "-----",
          trend: "-----",
          trendUp: true,
          isGood: true,
          subtext: "--------",
          footer: "---------",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
