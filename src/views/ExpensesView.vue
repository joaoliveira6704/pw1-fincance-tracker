<script>
import ExpenseCard from "@/components/ExpenseCard.vue";
import ExpensesList from "@/components/ExpensesList.vue";

export default {
  components: {
    ExpenseCard,
    ExpensesList,
  },
  async created() {
    await this.expenseStore.fetchExpenses();
  },
};
</script>

<template>
  <div class="flex flex-col gap-y-15 text-center w-full">
    <h1 class="text-4xl font-ProximaNova mt-5">Despesas</h1>
    <ExpenseCard />
    <ExpensesList />
  </div>
</template>

<style lang="scss" scoped></style>
