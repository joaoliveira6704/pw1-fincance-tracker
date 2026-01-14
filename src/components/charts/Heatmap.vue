<template>
  <div
    class="heatmap-container border border-border bg-navbar-bg rounded-2xl p-3 sm:p-6 shadow-sm items-center mx-auto flex flex-col gap-6 w-full"
  >
    <div
      class="flex flex-col sm:flex-row justify-between w-full items-center gap-4"
    >
      <div class="text-left">
        <h3 class="text-lg font-bold text-primary-text">Heatmap</h3>
        <p class="text-sm text-secondary-text">Visualização de ações por dia</p>
      </div>

      <div
        class="flex items-center bg-secondary-bg p-1 rounded-lg border border-border"
      >
        <ChevronLeft
          :size="28"
          class="p-1.5 cursor-pointer rounded-md hover:bg-main-bg transition-colors disabled:opacity-30"
          @click="changeYear('lower')"
        />
        <span
          class="px-4 font-ProximaNova font-bold text-lg min-w-[100px] text-center"
        >
          {{ selectedYear }}
        </span>
        <ChevronRight
          :size="28"
          class="p-1.5 cursor-pointer rounded-md hover:bg-main-bg transition-colors disabled:opacity-30"
          @click="changeYear('higher')"
          :disabled="selectedYear >= currentYear"
        />
      </div>
    </div>

    <div
      ref="scrollContainer"
      class="py-2 overflow-x-auto max-w-6xl w-full custom-scrollbar"
    >
      <div class="min-w-[800px]">
        <CalendarHeatmap
          :key="selectedYear"
          class="heatmap-custom"
          :dark-mode="darkMode"
          :values="heatmapData"
          :start-date="selectedYear + '-01-01'"
          :end-date="selectedYear + '-12-31'"
          :tooltip-formatter="formatTooltip"
          no-data-text="Sem transações"
          :range-color="rangeColors"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import { CalendarHeatmap } from "vue3-calendar-heatmap";
import "vue3-calendar-heatmap/dist/style.css";

export default {
  components: { CalendarHeatmap, ChevronLeft, ChevronRight },
  props: {
    heatmapData: { type: Array, required: true, default: () => [] },
    darkMode: Boolean,
  },
  data() {
    return {
      selectedYear: new Date().getFullYear(),
      currentYear: new Date().getFullYear(),
    };
  },
  mounted() {
    this.scrollToEnd();
  },
  computed: {
    rangeColors() {
      return this.darkMode
        ? ["#2d2d2d", "#0e4429", "#006d32", "#26a641", "#39d353", "#39d353"] // Dark mode colors
        : ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39", "#39d353"]; // Light mode colors
    },
  },
  methods: {
    changeYear(operation) {
      if (operation === "lower") {
        this.selectedYear -= 1;
      } else if (this.selectedYear < this.currentYear) {
        this.selectedYear += 1;
      }
      // Re-scroll to end after year change
      this.$nextTick(() => {
        this.scrollToEnd();
      });
    },
    scrollToEnd() {
      const container = this.$refs.scrollContainer;
      if (container) {
        container.scrollLeft = container.scrollWidth;
      }
    },
    formatTooltip(v) {
      return `${v.count} ${
        v.count === 1 ? "ação" : "ações"
      } no dia ${v.date.toLocaleDateString("pt-PT", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}`;
    },
  },
};
</script>

<style scoped>
:deep(.vch__day__square) {
  rx: 1;
  ry: 2;
}

:deep(.vch__wrapper .vch__months__labels__wrapper text),
:deep(.vch__wrapper .vch__days__labels__wrapper text) {
  fill: currentColor;
  font-size: 10px;
}

.custom-scrollbar::-webkit-scrollbar {
  height: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
</style>
