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
  <div class="">
    <h1>Despesas</h1>
    <ExpenseCard />
    <ExpensesList />
  </div>
</template>

<style lang="scss" scoped></style>
