<script>
import {
  Wallet,
  TrendingDown,
  TrendingUp,
  CalendarClock,
  Goal,
  ScrollText,
  User,
} from "lucide-vue-next";

import { formattedDate, formattedIncome } from "@/utils/utils";

export default {
  name: "ProfileFeed",
  components: {
    Wallet,
    TrendingDown,
    TrendingUp,
    Goal,
    CalendarClock,
    ScrollText,
    User,
  },
  props: {
    logs: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    groupedLogs() {
      if (!this.logs || this.logs.length === 0) return [];

      const sorted = [...this.logs].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      const groups = sorted.reduce((acc, log) => {
        const dateObj = new Date(log.date);
        const dateKey = dateObj.toISOString().split("T")[0];

        if (!acc[dateKey]) {
          acc[dateKey] = {
            date: dateObj,
            label: this.getDateLabel(dateObj),
            items: [],
          };
        }
        acc[dateKey].items.push(log);
        return acc;
      }, {});

      return Object.values(groups);
    },
  },
  methods: {
    formatTime(dateString) {
      if (!dateString) return "";
      return new Date(dateString).toLocaleTimeString("pt-PT", {
        hour: "2-digit",
        minute: "2-digit",
      });
    },

    getDateLabel(date) {
      const d = new Date(date);
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      d.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      yesterday.setHours(0, 0, 0, 0);

      if (d.getTime() === today.getTime()) return "Hoje";
      if (d.getTime() === yesterday.getTime()) return "Ontem";

      return formattedDate(date);
    },

    displayMoney(value) {
      return formattedIncome(value);
    },

    getIcon(log) {
      if (log.category === "wallet") return "Wallet";
      if (log.category === "objective") return "Goal";
      if (log.category === "expense") return "ScrollText";
      if (log.category === "user") return "User";
      return "TrendingDown";
    },

    getColorClass(log) {
      if (
        log.type === "remove" ||
        (log.category === "expense" && log.type === "add")
      ) {
        return "bg-red-500/10 text-red-500";
      }
      if (log.type === "add") {
        return "bg-stackrgreen-500/10 text-stackrgreen-500";
      }
      return "bg-blue-500/10 text-blue-500";
    },

    getMessage(log) {
      const amount = log.amount ? formattedIncome(log.amount) : "";

      switch (log.category) {
        case "wallet":
          if (log.type === "create") return "Criou uma nova carteira";
          if (log.type === "add") return `Adicionou ${amount} a uma carteira`;
          if (log.type === "remove") return `Eliminou uma carteira`;
          if (log.type === "deposit")
            return `Depositou ${amount} numa carteira`;
          if (log.type === "withdraw")
            return `Levantou ${amount} de uma carteira`;
          break;
        case "expense":
          if (log.type === "add") return `Gastou ${amount}`;
          if (log.type === "remove") return `Eliminou uma despesa`;
          break;
        case "objective":
          if (log.type === "create") return "Definiu um novo objetivo";
          if (log.type === "remove") return "Eliminou um objetivo";
          if (log.type === "contribute")
            return `Contribuiu com ${amount} para um objetivo`;
          if (log.type === "add") return `Guardou ${amount} num objetivo`;
          if (log.type === "update") return `Atualizou um objetivo`;
          break;
        default:
          return "Atualizou o perfil";
      }
      return "Atividade registada";
    },
  },
};
</script>

<template>
  <div class="w-full max-w-3xl mx-auto px-5">
    <h3
      class="text-xl font-bold mb-6 font-ProximaNova text-primary-text flex items-center justify-center md:justify-start gap-2"
    >
      <CalendarClock :size="20" />
      Atividade Recente
    </h3>

    <div
      v-if="groupedLogs.length === 0"
      class="text-secondary-text text-center py-8 bg-secondary-bg rounded-xl border border-border"
    >
      Ainda não existe atividade registada.
    </div>

    <div v-else class="space-y-8">
      <div v-for="(group, index) in groupedLogs" :key="index">
        <h4
          class="text-sm font-bold text-secondary-text uppercase tracking-wider mb-3 sticky top-0 bg-main-bg py-2 z-10"
        >
          {{ group.label }}
        </h4>

        <div class="space-y-3">
          <div
            v-for="log in group.items"
            :key="log.id"
            class="flex items-center gap-4 p-4 rounded-xl bg-secondary-bg border border-border transition-colors duration-200 hover:border-stackrgreen-500"
          >
            <div :class="['p-3 rounded-full shrink-0', getColorClass(log)]">
              <component :is="getIcon(log)" :size="20" />
            </div>

            <div class="grow">
              <p
                class="font-semibold text-primary-text text-[14px] sm:text-sm md:text-base"
              >
                {{ getMessage(log) }}
              </p>
              <p class="text-xs text-secondary-text mt-0.5">
                &bull; {{ formatTime(log.date) }}
              </p>
            </div>

            <div
              v-if="log.amount"
              class="text-sm font-medium text-primary-text"
            >
              {{ displayMoney(log.amount) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
