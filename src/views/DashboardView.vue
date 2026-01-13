<script>
import Button from "@/components/Button.vue";
import DashboardCard from "@/components/cards/DashboardCard.vue";
import QuoteCard from "@/components/cards/QuoteCard.vue";
import DashboardChart from "@/components/charts/DashboardChart.vue";
import Heatmap from "@/components/charts/Heatmap.vue";
import DashboardSkeleton from "@/components/skeletons/DashboardSkeleton.vue";
import { useExpenseStore } from "@/stores/expenseStore";
import { useLogStore } from "@/stores/logStore";
import { useObjectivesStore } from "@/stores/objectiveStore";
import { useThemeStore } from "@/stores/themeStore";
import { useUsersStore } from "@/stores/userStore";
import { useWalletStore } from "@/stores/walletStore";
import { getDailyCount, processObjectivesData } from "@/utils/utils";
import { Plus, LayoutPanelLeft } from "lucide-vue-next";
import { mapActions, mapState } from "pinia";

export default {
  name: "Dashboard",
  components: {
    Plus,
    LayoutPanelLeft,
    DashboardCard,
    DashboardChart,
    Heatmap,
    DashboardSkeleton,
    Button,
    QuoteCard,
  },
  data() {
    return {
      isLoading: false,
      heatmapData: [],
      userData: [],
      type: null,
      metrics: [
        {
          label: "Saldo Total",
          value: "€0,00",
          trend: "+2.4%",
          trendUp: true,
          isGood: true,
          subtext: "Soma de todas as carteiras",
          footer: "Atualizado em tempo real",
        },
        {
          label: "Despesas do Mês",
          value: "€0,00",
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
  methods: {
    ...mapActions(useWalletStore, ["fetchWallets"]),
    ...mapActions(useUsersStore, ["fetchLoggedUser", "fetchQuote"]),
    ...mapActions(useExpenseStore, ["fetchExpenses"]),
    ...mapActions(useLogStore, ["fetchUserLogs"]),
    ...mapActions(useObjectivesStore, ["fetchObjectives"]),
    formatCurrency(val) {
      return new Intl.NumberFormat("pt-PT", {
        style: "currency",
        currency: "EUR",
      }).format(val);
    },
    applyMetrics() {
      this.metrics[0].value = this.formatCurrency(
        this.wallets.reduce((sum, wallet) => sum + Number(wallet.balance), 0)
      );
      const now = new Date(); // Data Atual

      // Data do Mês Anterior
      const prevDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);

      const currentMonthTotal = this.getTotalByMonth(now);
      const prevMonthTotal = this.getTotalByMonth(prevDate);

      // Calcular a Trend

      let trendPercentage =
        ((currentMonthTotal - prevMonthTotal) / prevMonthTotal) * 100;

      // Orçamento Fixo
      const budgetLimit = this.currentUser.preferences.monthlyLimit;
      const budgetUsage = (currentMonthTotal / budgetLimit) * 100;

      // Atualizar o metrics[1]
      this.metrics[1].value = this.formatCurrency(currentMonthTotal);

      const sign = trendPercentage > 0 ? "+" : "";
      this.metrics[1].trend = `${sign}${trendPercentage.toFixed(1) || 0.0}%`;

      this.metrics[1].trendUp = trendPercentage > 0;
      this.metrics[1].isGood = trendPercentage <= 0;

      this.metrics[1].subtext = `${budgetUsage.toFixed(
        0
      )}% do limite mensal utilizado`;

      this.metrics[1].footer = `Limite Mensal ${this.formatCurrency(
        this.currentUser.preferences.monthlyLimit
      )}`;

      this.type = this.metrics[1].isGood ? "momentum" : "boost";

      // Atualizar o metrics[2]
      let processedObjData = processObjectivesData(this.objectives);

      this.metrics[2].value =
        this.objectives.length > 0
          ? processedObjData.percentage.toFixed(2) + "%"
          : "Sem Objetivos";

      this.metrics[2].hasTrend = false;

      this.metrics[2].trendUp = trendPercentage > 0;
      this.metrics[2].isGood = trendPercentage <= 0;

      this.metrics[2].subtext = `${this.formatCurrency(
        processedObjData.sum
      )} guardados`;

      this.metrics[2].footer = `Objetivos Ativos: ${this.objectives.length}`;

      this.type =
        this.metrics[1].isGood && this.metrics[0].isGood ? "momentum" : "boost";
    },
  },
  computed: {
    ...mapState(useWalletStore, ["wallets", "loading"]),
    ...mapState(useUsersStore, ["currentQuote", "loading", "currentUser"]),
    ...mapState(useThemeStore, ["darkMode"]),
    ...mapState(useExpenseStore, ["expenses", "getTotalByMonth", "loading"]),
    ...mapState(useObjectivesStore, ["objectives", "loading"]),
  },
  async mounted() {
    this.isLoading = true;
    const loggedUser = await this.fetchLoggedUser();
    this.userData = await this.fetchUserLogs(loggedUser.id);
    this.heatmapData = getDailyCount(this.userData);
    await this.fetchWallets();
    await this.fetchExpenses();
    await this.fetchObjectives();
    this.applyMetrics();
    await this.fetchQuote(this.type);
    this.isLoading = false;
  },
};
</script>

<template>
  <div
    v-if="isLoading"
    class="max-h-screen w-full text-gray-400 p-8 font-sans"
    style="background-color: var(--main-bg)"
  >
    <DashboardSkeleton />
  </div>
  <div
    v-else
    class="w-full min-h-screen overflow-auto bg-main-bg text-primary-text pt-10 pb-5 px-4 md:px-8"
  >
    <header class="items-center text-center pb-5">
      <h1 class="text-4xl md:text-5xl font-bold font-ProximaNova mb-4">
        Dashboard
      </h1>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <DashboardCard
        v-for="(metric, index) in metrics"
        :key="index"
        v-bind="metric"
      />
    </div>
    <QuoteCard
      v-if="currentQuote"
      class="mb-6"
      label="Frase Motivacional Para Ti"
      :subtext="`Por: ${currentQuote.author}`"
      :quote="currentQuote.message"
    />
    <DashboardChart :logs="userData" />

    <Heatmap :heatmapData="heatmapData" :darkMode="darkMode" />
  </div>
</template>

<style scoped></style>
