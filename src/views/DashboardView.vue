<template>
  <div class="max-h-screen w-full text-gray-400 p-8 font-sans">
    <header class="flex justify-between items-center mb-8">
      <h1 class="text-white text-xl font-medium">Dashboard</h1>
      <button
        class="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-200 transition"
      >
        <Plus :size="18" /> Adicionar
      </button>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <DashboardCard
        v-for="(metric, index) in metrics"
        :key="index"
        v-bind="metric"
      />
    </div>

    <DashboardChart />

    <div class="flex justify-between items-center mb-4">
      <div class="flex bg-[#141414] border border-[#262626] rounded-xl p-1">
        <button
          v-for="tab in tabs"
          :key="tab.name"
          @click="activeTab = tab.name"
          :class="[
            'px-4 py-2 text-sm rounded-lg flex items-center gap-2 transition',
            activeTab === tab.name
              ? 'bg-white/10 text-white'
              : 'text-gray-500 hover:text-gray-300',
          ]"
        >
          {{ tab.name }}
          <span
            v-if="tab.count"
            class="text-[10px] bg-white/10 px-1.5 py-0.5 rounded-full"
            >{{ tab.count }}</span
          >
        </button>
      </div>
    </div>

    <!--  <div
      class="grid grid-cols-6 gap-4 px-6 py-4 bg-[#141414] border border-[#262626] rounded-xl text-[10px] font-bold uppercase tracking-[0.15em]"
    >
      <div class="flex items-center gap-3 text-gray-500">
        <input
          type="checkbox"
          class="rounded bg-black border-gray-700 accent-white"
        />
        Header
      </div>
      <div v-for="col in columns" :key="col" class="text-gray-500">
        {{ col }}
      </div>
    </div> -->
  </div>
</template>

<script>
import DashboardCard from "@/components/cards/DashboardCard.vue";
import DashboardChart from "@/components/charts/DashboardChart.vue";
import { Plus, LayoutPanelLeft } from "lucide-vue-next";

export default {
  name: "Dashboard",
  components: { Plus, LayoutPanelLeft, DashboardCard, DashboardChart },
  data() {
    return {
      activeTab: "Saldo",
      columns: ["Section Type", "Status", "Target", "Limit", "Reviewer"],
      tabs: [
        { name: "Saldo", count: null },
        { name: "Despesas", count: 32 },
        { name: "Objetivos", count: 5 },
      ],
      metrics: [
        {
          label: "Saldo Total",
          value: "€12.450,00",
          trend: "+2.4%",
          trendUp: true,
          isGood: true,
          subtext: "Soma de todas as carteiras",
          footer: "Atualizado em tempo real",
        },
        {
          label: "Despesas do Mês",
          value: "€1.140,00",
          trend: "-15%",
          trendUp: false,
          isGood: false,
          subtext: "76% do orçamento utilizado",
          footer: "Limite mensal: €1.500",
        },
        {
          label: "Progresso dos Objetivos",
          value: "28.5%",
          trend: "+5.2%",
          trendUp: true,
          isGood: true,
          subtext: "€1.200,00 guardados",
          footer: "Quantidade de Objetivos Ativos: 5",
        },
      ],
    };
  },
};
</script>

<style scoped></style>
