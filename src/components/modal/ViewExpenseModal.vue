<script>
import { X, Calendar, Tag, FileText, CreditCard } from "lucide-vue-next";

export default {
  name: "ViewExpenseModal",
  components: {
    X,
    Calendar,
    Tag,
    FileText,
    CreditCard,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    expense: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["close"],
  computed: {
    formattedDate() {
      if (!this.expense || !this.expense.date) return "---";
      return new Date(this.expense.date).toLocaleDateString("pt-PT", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    },
    formattedCurrency() {
      if (!this.expense || !this.expense.amount) return "0,00 €";
      return new Intl.NumberFormat("pt-PT", {
        style: "currency",
        currency: "EUR",
      }).format(this.expense.amount);
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
        class="relative w-full max-w-lg bg-secondary-bg rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden animate-scale-in"
      >
        <div
          class="flex justify-between items-center p-6 border-b border-border bg-navbar-bg"
        >
          <h2 class="text-xl font-ProximaNova font-bold text-primary-text">
            Detalhes da Despesa
          </h2>
          <button
            @click="$emit('close')"
            class="p-2 text-secondary-text hover:text-primary-text hover:bg-secondary-bg rounded-full transition-colors"
          >
            <X class="w-6 h-6" />
          </button>
        </div>

        <div
          v-if="expense"
          class="p-4 md:p-8 space-y-6 transition-all ease-in-out duration-700"
        >
          <div class="text-center mb-6">
            <div
              class="text-4xl font-extrabold font-ProximaNova text-stackrgreen-500 mb-2"
            >
              {{ formattedCurrency }}
            </div>
            <h3 class="text-xl font-bold text-primary-text">
              {{ expense.name }}
            </h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              class="bg-main-bg p-4 rounded-xl border border-border flex items-start gap-3"
            >
              <div class="p-2 bg-secondary-bg rounded-lg text-secondary-text">
                <Calendar class="w-5 h-5" />
              </div>
              <div>
                <span
                  class="block text-xs text-secondary-text font-bold uppercase"
                  >Data</span
                >
                <span
                  class="text-sm font-medium text-primary-text capitalize"
                  >{{ formattedDate }}</span
                >
              </div>
            </div>

            <div
              class="bg-main-bg p-4 rounded-xl border border-border flex items-start gap-3"
            >
              <div class="p-2 bg-secondary-bg rounded-lg text-secondary-text">
                <Tag class="w-5 h-5" />
              </div>
              <div>
                <span
                  class="block text-xs text-secondary-text font-bold uppercase"
                  >Categoria</span
                >
                <span
                  class="text-sm font-medium text-stackrgreen-500 font-bold"
                >
                  {{ expense.category || "Geral" }}
                </span>
              </div>
            </div>
          </div>

          <div class="bg-main-bg p-4 rounded-xl border border-border">
            <div class="flex items-center gap-2 mb-2">
              <FileText class="w-4 h-4 text-secondary-text" />
              <span class="text-xs text-secondary-text font-bold uppercase"
                >Descrição</span
              >
            </div>
            <p
              class="text-sm text-left text-primary-text whitespace-pre-wrap leading-relaxed"
            >
              {{
                expense.description ||
                "Nenhuma descrição fornecida para esta despesa."
              }}
            </p>
          </div>
        </div>

        <div class="p-4 border-t border-border bg-navbar-bg flex justify-end">
          <button
            @click="$emit('close')"
            class="px-6 py-2 text-sm font-bold bg-secondary-bg hover:bg-border text-primary-text rounded-lg transition-colors border border-border"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Pequena animação de scale ao abrir o modal */
@keyframes scale-in {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
.animate-scale-in {
  animation: scale-in 0.2s ease-out forwards;
}
</style>
