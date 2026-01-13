<script>
import Button from "../Button.vue";

export default {
  name: "MonthlyLimitInput",
  props: {
    amount: {
      type: Number,
      default: 0,
    },
  },
  components: {
    Button,
  },
  data() {
    return {
      // Cópia local para não mutar a prop diretamente
      localAmount: this.amount,
    };
  },
  watch: {
    // Se o valor mudar no pai, atualiza aqui dentro
    amount(newVal) {
      this.localAmount = newVal;
    },
    // Sincronização em tempo real (opcional, útil para v-model)
    localAmount(newVal) {
      this.$emit("update:amount", Number(newVal));
    },
  },
  methods: {
    handleSaveClick() {
      // Dispara o evento que o teu componente pai está à espera
      this.$emit("save-preferences", this.localAmount);
    },
  },
};
</script>

<template>
  <div
    class="mt-[50px] flex flex-col mx-auto items-center text-center justify-center gap-3 rounded-2xl border-2 border-border transition-all duration-300 hover:border-stackrgreen-500 bg-navbar-bg py-5 px-8 max-w-3xl"
  >
    <p class="text-xl font-medium text-primary-text">Definir Limite Mensal</p>

    <div class="flex items-center gap-2">
      <input
        type="number"
        v-model.number="localAmount"
        min="0"
        max="20000"
        class="bg-transparent border-none text-2xl font-bold text-stackrgreen-500 focus:ring-0 w-32 text-center"
      />
      <span class="text-2xl font-bold text-stackrgreen-500">€</span>
    </div>

    <div class="flex items-center justify-center w-full max-w-lg gap-3">
      <p class="text-xs text-secondary-text">0€</p>
      <input
        type="range"
        min="0"
        max="20000"
        v-model.number="localAmount"
        class="w-full text-stackrgreen-500 accent-stackrgreen-500 cursor-pointer"
      />
      <p class="text-xs text-secondary-text">20.000€</p>
    </div>

    <Button variant="outline" class="mt-4" @click="handleSaveClick">
      Salvar Preferências
    </Button>
  </div>
</template>
