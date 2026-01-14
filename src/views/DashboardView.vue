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
import {
  formattedIncome,
  getDailyCount,
  processObjectivesData,
} from "@/utils/utils";
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
          value: "0",
          trend: "",
          trendUp: true,
          isGood: true,
          subtext: "Soma do saldo das tuas carteiras",
          footer: "Atualizado em tempo real",
        },
        {
          label: "Despesas",
          value: "0",
          trend: "",
          trendUp: true,
          isGood: true,
          subtext: "",
          footer: "",
        },
        {
          label: "Objetivos",
          value: "0",
          trend: "",
          trendUp: true,
          isGood: true,
          subtext: "",
          footer: "",
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
    applyMetrics() {
      // --- 1. CÁLCULO DO SALDO TOTAL (Atual) ---
      const currentBalance = this.wallets.reduce(
        (sum, wallet) => sum + Number(wallet.balance),
        0
      );
      this.metrics[0].value = formattedIncome(currentBalance);

      // --- 2. CÁLCULO DA TREND DO SALDO ---
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      // Calculamos quanto foi adicionado/removido das carteiras NESTE mês através dos logs
      const currentMonthWalletChanges = this.userData
        .filter(
          (log) =>
            new Date(log.date) >= firstDayOfMonth && log.category === "wallet"
        )
        .reduce((acc, log) => {
          const amount = Number(log.amount) || 0;
          if (["add", "create"].includes(log.type)) return acc + amount;
          if (log.type === "remove") return acc - amount;
          return acc;
        }, 0);

      // Saldo anterior = Saldo atual - Mudanças deste mês
      const previousBalance = currentBalance - currentMonthWalletChanges;

      // Evitar divisão por zero e calcular %
      let balanceTrend = 0;
      if (previousBalance > 0) {
        balanceTrend =
          ((currentBalance - previousBalance) / previousBalance) * 100;
      }

      // Atualizar metric do Saldo (index 0)
      const balanceSign = balanceTrend > 0 ? "+" : "";
      this.metrics[0].trend = `${balanceSign}${balanceTrend.toFixed(1)}%`;
      this.metrics[0].trendUp = balanceTrend >= 0;
      this.metrics[0].isGood = balanceTrend >= 0; // Para saldo, subir é bom!

      // --- 3. CÁLCULO DAS DESPESAS (metric index 1) ---
      const prevDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const currentMonthTotal = this.getTotalByMonth(now);
      const prevMonthTotal = this.getTotalByMonth(prevDate) || 1; // evita NaN

      let expenseTrend =
        ((currentMonthTotal - prevMonthTotal) / prevMonthTotal) * 100;

      const budgetLimit = this.currentUser.preferences.monthlyLimit || 1;
      const budgetUsage = (currentMonthTotal / budgetLimit) * 100;

      this.metrics[1].value = formattedIncome(currentMonthTotal);
      const expSign = expenseTrend > 0 ? "+" : "";
      this.metrics[1].trend = `${expSign}${expenseTrend.toFixed(1)}%`;
      this.metrics[1].trendUp = expenseTrend > 0;
      this.metrics[1].isGood = expenseTrend <= 0; // Para despesa, subir é mau!
      this.metrics[1].subtext = `${budgetUsage.toFixed(
        0
      )}% do limite mensal utilizado`;
      this.metrics[1].footer = `Limite Mensal ${formattedIncome(budgetLimit)}`;

      // --- 4. CÁLCULO DOS OBJETIVOS (metric index 2) ---
      let processedObjData = processObjectivesData(this.objectives);
      this.metrics[2].value =
        this.objectives.length > 0
          ? processedObjData.percentage.toFixed(2) + "%"
          : "Sem Objetivos";

      this.metrics[2].subtext = `${formattedIncome(
        processedObjData.sum
      )} guardados`;
      this.metrics[2].footer = `Objetivos Ativos: ${this.objectives.length}`;

      // Lógica da frase motivacional
      this.type =
        this.metrics[1].isGood && this.metrics[0].isGood ? "momentum" : "boost";
    },
  },
  computed: {
    ...mapState(useWalletStore, ["wallets"]),
    ...mapState(useUsersStore, ["currentQuote", "currentUser"]),
    ...mapState(useThemeStore, ["darkMode"]),
    ...mapState(useExpenseStore, ["expenses", "getTotalByMonth"]),
    ...mapState(useObjectivesStore, ["objectives"]),
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
  <div v-if="isLoading" class="max-h-screen w-full p-8 font-sans bg-main-bg">
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
        class="md:last:col-span-2 lg:last:col-span-1"
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
