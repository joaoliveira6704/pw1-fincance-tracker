<script>
import Button from "@/components/Button.vue";
import { useExpenseStore } from "@/stores/expenseStore";

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
  computed: {
    expenses() {
      return this.expenseStore.expenses;
    },
  },
  methods: {
    async createExpense() {
      try {
        this.error = null;
        await this.expenseStore.addExpense(
          this.date,
          this.name,
          this.amount,
          this.description
        );

        // Limpar formulário
        this.name = "";
        this.amount = 0;
        this.description = "";

        alert("Despesa criada");
      } catch (err) {
        this.error = "Erro ao criar despesa.";
      }
    },
  },
  async created() {
    await this.expenseStore.fetchExpenses();
  },
  components: {
    Button,
  },
};
</script>

<template>
  <h1>Despesas</h1>

  <form @submit.prevent="createExpense">
    <div>
      <label>Nome da Despesa: </label>
      <input type="text" v-model="name" placeholder="Compras..." required />
    </div>
    <br />
    <div>
      <label>Data: </label>
      <input type="date" v-model="date" required />
    </div>
    <br />
    <div>
      <label>Quantia: </label>
      <input type="number" min="0" v-model="amount" required />
    </div>
    <br />
    <div>
      <label>Descrição: </label>
      <textarea v-model="description"></textarea>
    </div>
    <br />
    <Button type="submit" variant="full" @click="createExpense">Criar</Button>
  </form>

  <p v-if="error" class="text-red-500">{{ error }}</p>
  <br />
  <hr />
  <h3>Lista de Despesas</h3>
  <ul>
    <li v-for="expense in expenses" :key="expense.id">
      {{ expense.name }} - {{ expense.amount }}€ - {{ expense.description }}
    </li>
  </ul>
</template>

<style lang="scss" scoped></style>
