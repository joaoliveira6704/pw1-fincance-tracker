<script>
import { useExpenseStore } from "@/stores/expenseStore";
import { useLogStore } from "@/stores/logStore";
import { getUserId } from "@/utils/session";
import { mapActions } from "pinia";

export default {
  setup() {
    const expenseStore = useExpenseStore();
    return { expenseStore };
  },
  data() {
    return {
      date: "",
      name: "",
      amount: 0,
      description: "",
      error: null,
    };
  },
  methods: {
    ...mapActions(useLogStore, ["addNewLog"]),
    async createExpense() {
      await this.expenseStore.addExpense(
        this.date,
        this.name,
        this.amount,
        this.description
      );
      await this.addNewLog(getUserId(), "expense", null, "add", this.amount);

      // Limpar formulário
      this.name = "";
      this.amount = 0;
      this.description = "";

      alert("Despesa criada");
    },
  },
  async created() {
    await this.expenseStore.fetchExpenses();
  },
};
</script>

<template>
  <div class="text-center px-100">
    <div class="w-full bg-gray-300 h-fit rounded-xl px-5 py-3">
      <form @submit.prevent="createExpense" class="grid grid-cols-2">
        <div>
          <label>Nome da Despesa: </label>
          <input type="text" v-model="name" placeholder="Compras..." required />
        </div>
        <div>
          <label>Data: </label>
          <input type="date" v-model="date" required />
        </div>
        <div>
          <label>Quantia: </label>
          <input type="number" min="0" v-model="amount" required />
        </div>
        <div class="">
          <label>Descrição: </label>
          <textarea v-model="description"></textarea>
        </div>
        <div><button type="submit">Criar</button></div>
      </form>

      <p v-if="error" style="color: red">{{ error }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
