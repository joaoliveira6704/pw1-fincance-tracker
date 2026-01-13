<script>
import { useUsersStore } from "@/stores/userStore";
import {
  formattedDate,
  formattedIncome,
  getObjectiveData,
} from "@/utils/utils";
import {
  X,
  Calendar,
  Target,
  Users,
  Info,
  TrendingUp,
  Wallet,
} from "lucide-vue-next";
import { mapActions, mapState } from "pinia";
import AddContributorCard from "../cards/AddContributorCard.vue";
import Button from "../Button.vue";
import WalletTransactionList from "../lists/WalletTransactionList.vue";
import { useLogStore } from "@/stores/logStore";

export default {
  name: "ViewWalletModal",
  components: {
    X,
    Calendar,
    Wallet,
    Users,
    Info,
    TrendingUp,
    AddContributorCard,
    Button,
    WalletTransactionList,
  },
  methods: {},
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    wallet: {
      type: Object,
      default: () => ({}),
    },
    logs: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["close"],
  computed: {
    ...mapState(useLogStore, ["getFilteredLogs"]),
    formattedTarget() {
      return formattedIncome(this.wallet.balance);
    },
    filterLogs() {
      return this.getFilteredLogs(this.wallet.id);
    },
  },
};
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      @click.self="$emit('close')"
    >
      <div
        class="relative w-full max-w-lg bg-secondary-bg rounded-3xl shadow-2xl border border-border flex flex-col overflow-hidden animate-scale-in"
      >
        <div
          class="flex justify-between items-center p-6 border-b border-border bg-main-bg"
        >
          <div class="flex items-center gap-2">
            <div class="p-2 bg-stackrgreen-500/10 rounded-lg">
              <Wallet class="w-5 h-5 text-stackrgreen-500" />
            </div>
            <h2
              class="text-base sm:text-xl font-ProximaNova font-bold text-primary-text"
            >
              Detalhes da Carteira
            </h2>
          </div>
          <button
            @click="$emit('close')"
            class="p-2 text-secondary-text hover:text-primary-text hover:bg-secondary-bg rounded-full transition-colors"
          >
            <X class="w-6 h-6" />
          </button>
        </div>

        <div
          v-if="wallet"
          class="p-2 md:p-8 space-y-8 overflow-y-scroll max-h-[50vh] transition-all ease-in-out duration-700"
        >
          <div class="text-center">
            <span
              class="text-xs font-bold text-secondary-text uppercase tracking-widest"
              >Saldo Atual</span
            >
            <div
              class="text-4xl md:text-5xl font-extrabold font-ProximaNova text-stackrgreen-500 my-2"
            >
              {{ formattedTarget }}
            </div>
            <h3 class="text-xl md:text-2xl font-bold text-primary-text">
              {{ wallet.name }}
            </h3>
          </div>

          <div class="bg-main-bg p-4 rounded-xl border border-border">
            <div class="flex items-center gap-2 mb-4">
              <TrendingUp class="w-4 h-4 text-secondary-text" />
              <span
                class="text-[10px] text-secondary-text font-black uppercase tracking-wider"
              >
                Histórico de Contribuições
              </span>
            </div>

            <div
              v-if="wallet"
              class="max-h-100 overflow-y-auto pr-2 flex flex-col gap-2"
            >
              <WalletTransactionList
                :wallet-id="wallet.id"
                :logs="filterLogs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes scale-in {
  from {
    transform: scale(0.9) translateY(20px);
    opacity: 0;
  }
  to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}
.animate-scale-in {
  animation: scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Custom Scrollbar */
div::-webkit-scrollbar {
  width: 4px;
}
div::-webkit-scrollbar-track {
  background: transparent;
}
div::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 10px;
}
</style>
