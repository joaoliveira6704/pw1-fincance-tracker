<script>
import Button from "../Button.vue";

export default {
  name: "CreateWalletModal",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    Button,
  },
  emits: ["close", "create-wallet"],
  data() {
    return {
      form: {
        name: "",
        initialAmount: 0,
        color: "#4ddf7b",
      },
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    submitForm() {
      if (!this.form.name.trim()) {
        alert("Por favor introduza um nome.");
        return;
      }

      this.$emit("create-wallet", { ...this.form });
      console.log(...this.form);

      this.form.name = "";
      this.form.initialAmount = 0;
      this.form.color = "#4ddf7b";

      this.closeModal();
    },
  },
};
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/50 overflow-y-auto h-full w-full flex justify-center items-center z-50"
    @click.self="closeModal"
  >
    <div
      class="bg-main-bg border-2 border-border rounded-lg shadow-xl p-6 w-full max-w-md mx-4 relative text-primary-text"
    >
      <button @click="closeModal" class="absolute top-4 right-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <h2 class="text-xl font-bold mb-6">Criar Nova Carteira</h2>

      <form @submit.prevent="submitForm" class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <label for="walletName" class="text-sm font-medium"
            >Nome da Carteira</label
          >
          <input
            id="walletName"
            type="text"
            v-model="form.name"
            class="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-inner-circle focus:border-stackr-green outline-none"
            required
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="initialAmount" class="text-sm font-medium"
            >Quantidade Inicial</label
          >
          <input
            id="initialAmount"
            type="number"
            step="0.01"
            min="0"
            v-model.number="form.initialAmount"
            class="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="walletColor" class="text-sm font-medium"
            >Cor da Carteira</label
          >
          <div class="flex items-center gap-3">
            <input
              id="walletColor"
              type="color"
              v-model="form.color"
              class="h-10 w-20 rounded cursor-pointer"
            />
            <span class="text-sm font-mono uppercase">{{ form.color }}</span>
          </div>
        </div>

        <div class="flex justify-end gap-3 mt-4">
          <Button variant="outline" @click="closeModal"> Cancelar </Button>
          <Button
            variant="fill"
            type="submit"
            @click="submitForm"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Criar Carteira
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>
