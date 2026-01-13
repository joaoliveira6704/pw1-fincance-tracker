<script>
import { ScrollText, TrendingDown, Filter } from "lucide-vue-next";
import ExpenseCard from "@/components/cards/ExpenseCard.vue";
import ViewExpenseModal from "@/components/modal/ViewExpenseModal.vue";
import { useExpenseStore } from "@/stores/expenseStore";
import { useLogStore } from "@/stores/logStore"; // Para registar logs
import { getUserId } from "@/utils/session";
import { mapState, mapActions } from "pinia";
import Swal from "sweetalert2"; // Importar SweetAlert
import EditExpenseModal from "./modal/EditExpenseModal.vue";
import { useCategoryStore } from "@/stores/categoryStore";
import { toast } from "@/utils/swal";

export default {
  components: {
    ScrollText,
    TrendingDown,
    Filter,
    ExpenseCard,
    ViewExpenseModal,
    EditExpenseModal,
  },
  props: {
    expenses: Array,
    categories: Array,
  },
  data() {
    return {
      activeFilter: "all",
      isViewModalOpen: false,
      isEditModalOpen: false,
      selectedExpense: null,

      // Ícone SVG para o Alert
      alertIcon: `
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      `,
    };
  },
  computed: {
    ...mapState(useExpenseStore, []),
    ...mapState(useCategoryStore, ["categories"]),

    enrichedExpenses() {
      return this.expenses.map((expense) => {
        const categoryObj = this.categories.find(
          (c) => c.id == expense.categoryId
        );
        return {
          ...expense,
          category: categoryObj ? categoryObj.label : "Outros",
        };
      });
    },
    filteredExpenses() {
      if (this.activeFilter === "all") return this.enrichedExpenses;
      return this.enrichedExpenses.filter(
        (e) => e.category === this.activeFilter
      );
    },
    hasExpenses() {
      return this.filteredExpenses.length > 0;
    },
    totalAmount() {
      return this.filteredExpenses.reduce(
        (sum, item) => sum + Number(item.amount),
        0
      );
    },
  },
  methods: {
    // Ações das Stores
    ...mapActions(useExpenseStore, ["removeExpense", "updateExpense"]),
    ...mapActions(useLogStore, ["addNewLog"]),
    ...mapActions(useCategoryStore, ["fetchCategories"]),

    setFilter(val) {
      this.activeFilter = val;
    },
    formatCurrency(val) {
      return new Intl.NumberFormat("pt-PT", {
        style: "currency",
        currency: "EUR",
      }).format(val);
    },

    // --- LÓGICA DO MODAL DE VER ---
    handleViewExpense(expense) {
      this.selectedExpense = expense;
      this.isViewModalOpen = true;
    },
    handleEditExpense(expense) {
      console.log("Editar (Futuro):", expense.id);
      this.selectedExpense = expense;
      this.isEditModalOpen = true;
    },

    // --- CONFIGURAÇÃO DO SWAL ---
    getSwalConfig(title, text, showCancel = false) {
      return {
        title: title,
        text: text,
        iconHtml: this.alertIcon,
        buttonsStyling: false,
        showCancelButton: showCancel,
        confirmButtonText: "Sim",
        cancelButtonText: "Cancelar",
        customClass: {
          popup: "stackr-swal-popup",
          title: "stackr-swal-title",
          htmlContainer: "stackr-swal-text",
          icon: "stackr-swal-icon",
          confirmButton: "stackr-swal-confirm",
          cancelButton: "stackr-swal-cancel",
          actions: "stackr-swal-actions",
        },
      };
    },

    // --- LÓGICA DE APAGAR ---
    handleDeleteExpense(id) {
      Swal.fire(
        this.getSwalConfig(
          "Tens a certeza?",
          "Esta ação vai apagar a despesa permanentemente!",
          true
        )
      ).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await this.removeExpense(id);

            await this.addNewLog(getUserId(), "expense", null, "remove", null);
            Swal.fire({
              ...this.getSwalConfig("Sucesso!", "A despesa foi removida."),
              icon: "success",
              iconHtml: undefined, // Remove o ícone customizado para usar o check padrão ou mantém undefined se quiseres sem ícone
            });
          } catch (error) {
            console.error(error);
            Swal.fire({
              ...this.getSwalConfig(
                "Erro",
                "Não foi possível apagar a despesa."
              ),
              icon: "error",
              iconHtml: undefined,
            });
          }
        }
      });
    },
    async handleSaveExpenseEdit(expense) {
      await this.updateExpense(expense);
      this.isEditModalOpen = false;
      toast.fire({
        icon: "success",
        title: `A despesa ${expense.name} foi atualizada!`,
      });
      this.addNewLog(
        getUserId(),
        "expense",
        expense.id,
        "update",
        expense.amount
      );
    },
  },
  async mounted() {
    await this.fetchCategories();
  },
};
</script>

<template>
  <div class="w-full max-w-7xl mx-auto p-0 md:p-6 text-primary-text">
    <div
      class="flex flex-col sm:flex-row justify-between items-center md:items-end mb-6 gap-4 border-b border-border pb-6"
    >
      <div>
        <h1
          class="text-2xl sm:text-3xl md:text-4xl font-ProximaNova font-bold mb-2"
        >
          As tuas Despesas
        </h1>
        <p class="text-secondary-text text-sm md:text-base font-Roboto">
          Gere e visualiza todas as tuas despesas num só lugar.
        </p>
      </div>

      <div
        v-if="expenses.length > 0"
        class="bg-secondary-bg border border-border px-6 py-4 rounded-xl shadow-sm flex items-center gap-4 min-w-[200px]"
      >
        <div class="p-2 bg-red-500/10 rounded-lg">
          <TrendingDown class="w-6 h-6 text-red-500" />
        </div>
        <div>
          <p
            class="text-xs text-secondary-text uppercase font-bold tracking-wider"
          >
            Total {{ activeFilter !== "all" ? "Filtrado" : "Gasto" }}
          </p>
          <p class="text-2xl font-ProximaNova font-bold text-primary-text">
            {{ formatCurrency(totalAmount) }}
          </p>
        </div>
      </div>
    </div>

    <div
      v-if="expenses.length > 0"
      class="flex items-center gap-3 overflow-x-auto pb-4 mb-4 scrollbar-hide"
    >
      <div class="flex items-center text-secondary-text mr-2">
        <Filter class="w-4 h-4" />
      </div>

      <button
        @click="setFilter('all')"
        class="px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap border"
        :class="
          activeFilter === 'all'
            ? 'bg-stackrgreen-500 text-stackrblack border-stackrgreen-500'
            : 'bg-secondary-bg text-secondary-text border-border hover:border-stackrgreen-500'
        "
      >
        Todas
      </button>

      <button
        v-for="cat in categories"
        :key="cat.id"
        @click="setFilter(cat.label)"
        class="px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap border"
        :class="
          activeFilter === cat.label
            ? 'bg-stackrgreen-500 text-stackrblack border-stackrgreen-500'
            : 'bg-secondary-bg text-secondary-text border-border hover:border-stackrgreen-500'
        "
      >
        {{ cat.label }}
      </button>
    </div>

    <div
      v-if="hasExpenses"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <ExpenseCard
        v-for="expense in filteredExpenses"
        :key="expense.id"
        :expense="expense"
        @view="handleViewExpense"
        @edit="handleEditExpense"
        @delete="handleDeleteExpense"
      />
    </div>

    <div
      v-else
      class="flex flex-col items-center justify-center py-20 px-4 text-center bg-secondary-bg rounded-2xl border border-dashed border-border mt-4"
    >
      <div class="bg-main-bg p-4 rounded-full mb-4 shadow-sm">
        <ScrollText class="w-12 h-12 text-secondary-text opacity-50" />
      </div>
      <h3 class="text-xl font-ProximaNova font-bold text-primary-text mb-2">
        {{
          activeFilter !== "all"
            ? `Sem despesas de ${activeFilter}`
            : "Nenhuma despesa encontrada"
        }}
      </h3>
      <button
        v-if="activeFilter !== 'all'"
        @click="setFilter('all')"
        class="mt-4 text-stackrgreen-500 font-bold hover:underline"
      >
        Limpar Filtros
      </button>
    </div>

    <ViewExpenseModal
      :is-open="isViewModalOpen"
      :expense="selectedExpense"
      @close="isViewModalOpen = false"
    />
    <EditExpenseModal
      :expense="selectedExpense"
      :is-open="isEditModalOpen"
      :categories="categories"
      @save="handleSaveExpenseEdit"
      @close="isEditModalOpen = false"
    />
  </div>
</template>

<style>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* --- ESTILOS DO SWEETALERT (Para garantir que funcionam neste ficheiro) --- */
.stackr-swal-popup {
  background-color: var(--secondary-bg) !important;
  border: 1px solid var(--border) !important;
  border-radius: 16px !important;
  padding: 2rem !important;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5) !important;
}
.stackr-swal-title {
  color: var(--primary-text) !important;
  font-family: var(--font-ProximaNova);
  font-size: 1.5rem !important;
  font-weight: 700 !important;
}
.stackr-swal-text {
  color: var(--secondary-text) !important;
  font-size: 1rem !important;
}
.stackr-swal-icon {
  border: none !important;
  margin-bottom: 1rem !important;
}
.stackr-swal-actions {
  gap: 12px;
  width: 100%;
}
.stackr-swal-confirm {
  background-color: var(--color-stackrgreen-500) !important;
  color: #000 !important;
  border: none !important;
  padding: 12px 24px !important;
  border-radius: 8px !important;
  font-weight: 600 !important;
  font-size: 1rem !important;
  cursor: pointer;
  transition: transform 0.1s ease;
}
.stackr-swal-confirm:hover {
  filter: brightness(1.1);
  transform: scale(1.02);
}
.stackr-swal-cancel {
  background-color: transparent !important;
  border: 1px solid var(--border) !important;
  color: var(--secondary-text) !important;
  padding: 12px 24px !important;
  border-radius: 8px !important;
  font-weight: 500 !important;
  font-size: 1rem !important;
  cursor: pointer;
  transition: all 0.2s;
}
.stackr-swal-cancel:hover {
  background-color: var(--main-bg) !important;
  color: var(--primary-text) !important;
}
</style>
