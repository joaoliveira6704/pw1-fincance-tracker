<script>
import { useExpenseStore } from "@/stores/expenseStore";
import { ScrollText } from "lucide-vue-next";

export default {
  setup() {
    const expenseStore = useExpenseStore();
    return { expenseStore };
  },
  data() {
    return {};
  },
  components: {
    ScrollText,
  },
  computed: {
    expenses() {
      return this.expenseStore.expenses;
    },
    hasExpenses() {
      return this.expenses && this.expenses.length > 0;
    },
    totalAmount() {
      if (!this.hasExpenses) return 0;
      return this.expenses.reduce((sum, item) => sum + Number(item.amount), 0);
    },
  },
  methods: {
    formatCurrency(value) {
      if (!value) return "0,00 €";
      return new Intl.NumberFormat("pt-PT", {
        style: "currency",
        currency: "EUR",
      }).format(value);
    },
  },
  async created() {
    await this.expenseStore.fetchExpenses();
  },
};
</script>

<template>
  <div class="w-full max-w-5xl mx-auto p-6">
    <div
      class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4"
    >
      <div>
        <h1 class="text-2xl font-bold">Lista de Despesas</h1>
      </div>

      <div v-if="hasExpenses" class="px-4 py-2 rounded-lg border">
        <span class="text-sm">Total:</span>
        <span class="ml-2 font-bold text-lg">{{
          formatCurrency(totalAmount)
        }}</span>
      </div>
    </div>

    <div class="shadow-sm rounded-lg border overflow-hidden">
      <div class="overflow-x-auto">
        <table v-if="hasExpenses" class="w-full text-sm text-left">
          <thead class="text-xs uppercase border-b">
            <tr>
              <th scope="col" class="px-6 py-4 font-semibold">Nome</th>
              <th scope="col" class="px-6 py-4 font-semibold">Descrição</th>
              <th scope="col" class="px-6 py-4 font-semibold text-right">
                Preço
              </th>
            </tr>
          </thead>

          <tbody v-if="hasExpenses">
            <tr
              v-for="expense in expenses"
              :key="expense.id"
              class="border-b last:border-0 transition-colors duration-150"
            >
              <td class="px-6 py-4 font-medium whitespace-nowrap">
                {{ expense.name }}
              </td>

              <td class="px-6 py-4 max-w-xs truncate">
                {{ expense.description }}
              </td>

              <td class="px-6 py-4 text-right font-medium">
                {{ formatCurrency(expense.amount) }}
              </td>
            </tr>
          </tbody>
        </table>
        <div
          v-else
          class="flex flex-col items-center justify-center py-12 px-4 text-center"
        >
          <ScrollText />
          <h3 class="font-medium">Nenhuma despesa encontrada</h3>
          <p class="text-sm mt-1">Adicione uma nova despesa para começar.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
