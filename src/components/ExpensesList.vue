<script>
import { useExpenseStore } from "@/stores/expenseStore";

export default {
  setup() {
    const expenseStore = useExpenseStore();
    return { expenseStore };
  },
  data() {},
  computed: {
    expenses() {
      return this.expenseStore.expenses;
    },
  },
  async created() {
    await this.expenseStore.fetchExpenses();
  },
};
</script>

<template>
  <div class="w-full h-fit flex flex-col">
    <h1>Lista de Despesas</h1>
    <table class="border-collapse border border-gray-400">
      <thead>
        <tr>
          <th class="border border-gray-300">Nome</th>
          <th class="border border-gray-300">Descrição</th>
          <th class="border border-gray-300">Preço</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="expense in expenses" :key="expense.id">
          <td class="border border-gray-300">{{ expense.name }}</td>
          <td class="border border-gray-300">{{ expense.description }}</td>
          <td class="border border-gray-300">{{ expense.amount }}€</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped></style>
