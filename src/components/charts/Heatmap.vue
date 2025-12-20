<template>
  <div
    class="flex border rounded-2xl py-6 px-2 text-center items-center justify-center mx-auto gap-10"
    style="background-color: var(--navbar-bg); border-color: var(--border)"
  >
    <CalendarHeatmap
      class="w-4xl"
      v-if="selectedYear > 0"
      :values="heatmapData"
      :start-date="selectedYear + '-01-01'"
      :end-date="selectedYear + '-12-31'"
      :range-color="[
        '#ebedf0',
        '#9be9a8',
        '#40c463',
        '#30a14e',
        '#216e39',
        '#216e39',
      ]"
    />
    <div class="flex items-center gap-4 mb-4">
      <button
        class="px-3 py-1 border rounded hover:bg-bg-secondary"
        @click="changeYear('lower')"
      >
        &lt;
      </button>

      <p class="font-bold">Ano: {{ selectedYear }}</p>

      <button
        class="px-3 py-1 border rounded hover:bg-bg-secondary disabled:opacity-50"
        @click="changeYear('higher')"
        :disabled="selectedYear >= currentYear"
      >
        &gt;
      </button>
    </div>
  </div>
</template>

<script>
import { CalendarHeatmap } from "vue3-calendar-heatmap";
import "vue3-calendar-heatmap/dist/style.css";

export default {
  components: {
    CalendarHeatmap,
  },
  props: {
    heatmapData: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      selectedYear: 0,
      currentYear: 0,
    };
  },
  mounted() {
    const now = new Date();
    this.selectedYear = now.getFullYear();
    this.currentYear = now.getFullYear();
  },
  methods: {
    changeYear(operation) {
      if (operation === "lower") {
        this.selectedYear -= 1;
      } else {
        if (this.selectedYear < this.currentYear) {
          this.selectedYear += 1;
        }
      }
    },
  },
};
</script>
