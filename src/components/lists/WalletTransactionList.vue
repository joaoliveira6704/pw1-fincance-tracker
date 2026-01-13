<script>
import {
  Wallet,
  TrendingDown,
  TrendingUp,
  CalendarClock,
  Goal,
  ScrollText,
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
  },
  props: {
    walletId: Text,
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

      if (log.type === "create") return "Criou esta carteira";
      if (log.type === "deposit") return `Depositou ${amount}`;
      if (log.type === "withdraw") return `Levantou ${amount}`;
    },
  },
};
</script>

<template>
  <div class="space-y-8">
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
            <p class="font-semibold text-primary-text text-sm md:text-base">
              {{ getMessage(log) }}
            </p>
            <p class="text-xs text-secondary-text mt-0.5">
              &bull; {{ formatTime(log.date) }}
            </p>
          </div>

          <div v-if="log.amount" class="text-sm font-medium text-primary-text">
            {{ displayMoney(log.amount) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
