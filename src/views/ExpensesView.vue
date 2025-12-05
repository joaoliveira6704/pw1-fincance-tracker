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
  <div class="text-center w-full">
    <ExpenseCard />
    <ExpensesList />
  </div>
</template>

<style lang="scss" scoped></style>
