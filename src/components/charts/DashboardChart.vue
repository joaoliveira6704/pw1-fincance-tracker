<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "vue-chartjs";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import { processChartData } from "@/utils/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default {
  name: "MainChart",
  components: {
    Line,
    ChevronLeft,
    ChevronRight,
  },
  props: {
    logs: { type: Array, default: () => [] },
  },
  data() {
    return {
      isFetching: false,
      chartData: null,
      mockCurrentDate: new Date(),

      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            // Cores ajustadas para combinar com o tema Dark/Light
            backgroundColor: "#212121", // bg-stackrblack
            titleColor: "#ffffff",
            bodyColor: "#9e9e9e", // stackr-grey-light
            borderColor: "#2e2e2e", // border-gray
            borderWidth: 1,
            padding: 12,
            boxPadding: 4,
            usePointStyle: true,
            titleFont: { family: "ProximaNova", size: 13 },
            bodyFont: { family: "Roboto", size: 12 },
            callbacks: {
              label: (context) => {
                let label = context.dataset.label || "";
                if (label) label += ": ";
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat("pt-PT", {
                    style: "currency",
                    currency: "EUR",
                  }).format(context.parsed.y);
                }
                return label;
              },
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: "#9e9e9e", // stackr-grey-light
              font: { family: "Roboto", size: 10, weight: "bold" },
              maxTicksLimit: 7,
            },
            border: { display: false },
          },
          y: { display: false, min: 0 },
        },
        elements: {
          point: {
            radius: 0,
            hoverRadius: 6,
            hoverBackgroundColor: "#212121", // stackr-black
            hoverBorderWidth: 2,
            hoverBorderColor: (ctx) => ctx.dataset.borderColor,
          },
          line: { tension: 0.4, borderWidth: 2 },
        },
      },
    };
  },
  computed: {
    currentDateReference() {
      return this.mockCurrentDate;
    },
    currentMonthLabel() {
      return `Comparativo de ${this.currentDateReference.toLocaleString(
        "pt-PT",
        { month: "long", year: "numeric" }
      )}`;
    },
  },

  watch: {
    logs: {
      handler() {
        this.updateChart();
      },
      deep: true,
    },
    currentDateReference() {
      this.updateChart();
    },
  },

  mounted() {
    this.updateChart();
  },
  methods: {
    changeMonth(offset) {
      const newDate = new Date(this.mockCurrentDate);
      newDate.setMonth(newDate.getMonth() + offset);
      this.mockCurrentDate = newDate;
    },

    hexToRgba(hex, alpha) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    },

    createGradient(ctx, hexColor) {
      const gradient = ctx.createLinearGradient(0, 0, 0, 300);
      try {
        gradient.addColorStop(0, this.hexToRgba(hexColor, 0.25));
        gradient.addColorStop(1, this.hexToRgba(hexColor, 0));
      } catch (e) {
        return hexColor;
      }
      return gradient;
    },
    updateChart() {
      const rawData = processChartData(this.logs, this.currentDateReference);

      if (!rawData) {
        this.chartData = null;
        return;
      }

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Definição das cores baseadas no teu CSS
      const colorGreen = "#4ddf7b"; // --stackr-green
      const colorRed = "#ef4444"; // Vermelho padrão (para despesas)
      const colorBlue = "#3b82f6"; // Azul padrão (para objetivos)

      this.chartData = {
        labels: rawData.labels,
        datasets: [
          {
            label: "Saldo Total",
            data: rawData.dataBalance,
            borderColor: colorGreen,
            backgroundColor: this.createGradient(ctx, colorGreen),
            fill: true,
            tension: 0.4,
            hidden: false,
          },
          {
            label: "Despesas",
            data: rawData.dataExpenses,
            borderColor: colorRed,
            backgroundColor: this.createGradient(ctx, colorRed),
            fill: true,
            tension: 0.4,
            hidden: false,
          },
          {
            label: "Objetivos",
            data: rawData.dataObjectives,
            borderColor: colorBlue,
            backgroundColor: this.createGradient(ctx, colorBlue),
            fill: true,
            tension: 0.4,
            hidden: false,
          },
        ],
      };
    },

    toggleDataset(index) {
      if (!this.$refs.lineChart?.chart) return;
      const chart = this.$refs.lineChart.chart;
      const isHidden = chart.getDatasetMeta(index).hidden;
      chart.setDatasetVisibility(index, isHidden);
      chart.update();

      if (this.chartData?.datasets[index]) {
        this.chartData.datasets[index].hidden = !isHidden;
      }
    },
  },
};
</script>

<template>
  <div
    class="border bg-navbar-bg border-border rounded-2xl p-6 mb-6 transition-colors duration-200"
  >
    <div class="flex justify-between items-center mb-10">
      <div class="flex items-center gap-4">
        <div>
          <h2 class="text-primary-text font-medium font-ProximaNova text-lg">
            Visão Geral
          </h2>
          <p
            class="text-xs text-primary-text opacity-80 capitalize font-Roboto"
          >
            {{ currentMonthLabel }}
          </p>
        </div>

        <div
          class="flex items-center bg-secondary-bg border border-border rounded-lg p-0.5 ml-2"
        >
          <button
            @click="changeMonth(-1)"
            class="p-1.5 hover:bg-border rounded-md transition text-secondary-text hover:text-primary-text"
            title="Mês Anterior"
          >
            <ChevronLeft :size="16" />
          </button>

          <div class="w-px h-4 bg-border mx-0.5"></div>

          <button
            @click="changeMonth(1)"
            class="p-1.5 hover:bg-border rounded-md transition text-secondary-text hover:text-primary-text"
            title="Próximo Mês"
          >
            <ChevronRight :size="16" />
          </button>
        </div>
      </div>

      <div class="flex gap-2">
        <button
          v-if="chartData && chartData.datasets"
          v-for="(dataset, index) in chartData.datasets"
          :key="index"
          @click="toggleDataset(index)"
          class="flex items-center gap-2 cursor-pointer px-3 py-1.5 text-xs rounded-md border border-border transition bg-secondary-bg hover:bg-border"
          :class="{ 'opacity-50': dataset.hidden }"
        >
          <span
            class="w-2 h-2 rounded-full"
            :style="{ backgroundColor: dataset.borderColor }"
          ></span>
          <span class="text-primary-text font-Roboto">{{ dataset.label }}</span>
        </button>
      </div>
    </div>

    <div class="h-64 w-full relative">
      <div v-if="isFetching" class="flex h-full items-center justify-center">
        <span class="text-stackrgrey-light text-sm animate-pulse font-Roboto"
          >A carregar dados...</span
        >
      </div>

      <div
        v-else-if="
          !chartData || !chartData.datasets || chartData.datasets.length === 0
        "
        class="flex h-full items-center justify-center flex-col gap-2"
      >
        <span class="text-secondary-text text-sm font-Roboto"
          >Sem dados para este mês.</span
        >
        <button
          @click="updateChart"
          class="text-xs text-stackrgreen-500 cursor-pointer hover:text-stackrgreen-200 hover:underline transition-colors"
        >
          Tentar novamente
        </button>
      </div>

      <Line v-else ref="lineChart" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
