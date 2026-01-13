<script>
import Button from "../Button.vue";
import RegisterInput from "../RegisterInput.vue";
import { X, Wallet, Palette, Coins } from "lucide-vue-next";

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
    RegisterInput,
    X,
    Wallet,
    Palette,
    Coins,
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
      // O v-model agora garante que o name não está vazio
      if (!this.form.name || !this.form.name.trim()) {
        return;
      }

      // Enviamos uma cópia do formulário
      this.$emit("create-wallet", { ...this.form });

      // Reset do formulário
      this.form = {
        name: "",
        initialAmount: 0,
        color: "#4ddf7b",
      };

      this.closeModal();
    },
  },
};
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      @click.self="closeModal"
    >
      <div
        class="relative w-full max-w-md bg-secondary-bg rounded-3xl shadow-2xl border border-border overflow-hidden animate-scale-in"
      >
        <div
          class="flex justify-between items-center p-6 border-b border-border bg-main-bg"
        >
          <div class="flex items-center gap-2">
            <div class="p-2 bg-stackrgreen-500/10 rounded-lg">
              <Wallet class="w-5 h-5 text-stackrgreen-500" />
            </div>
            <h2 class="text-xl font-ProximaNova font-bold text-primary-text">
              Nova Carteira
            </h2>
          </div>
          <button
            @click="closeModal"
            class="p-2 text-secondary-text hover:text-primary-text hover:bg-main-bg rounded-full transition-colors"
          >
            <X class="w-6 h-6" />
          </button>
        </div>

        <form @submit.prevent="submitForm" class="p-8 space-y-6">
          <div class="space-y-4">
            <div class="flex flex-col gap-2">
              <RegisterInput
                label-text="Nome da Carteira"
                input-type="text"
                v-model="form.name"
                placeholder="Ex: Poupanças, Dinheiro Vivo..."
                id="walletName"
                :is-valid="true"
                required
              />
            </div>

            <div class="flex flex-col gap-2">
              <RegisterInput
                label-text="Saldo Inicial"
                input-type="number"
                v-model="form.initialAmount"
                id="initialAmount"
                step="0.01"
                min="0"
                :is-valid="true"
                required
              />
            </div>

            <div class="flex flex-col gap-2">
              <label
                class="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-secondary-text"
              >
                <Palette class="w-3 h-3" /> Cor de Identificação
              </label>
              <div
                class="flex items-center gap-4 bg-main-bg p-3 rounded-xl border border-border"
              >
                <input
                  id="walletColor"
                  type="color"
                  v-model="form.color"
                  class="h-10 w-10 rounded-lg cursor-pointer bg-transparent border-none"
                />
                <span
                  class="text-sm font-mono font-bold text-primary-text uppercase"
                >
                  {{ form.color }}
                </span>
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-3 pt-4 border-t border-border">
            <Button variant="outline" type="button" @click="closeModal">
              Cancelar
            </Button>
            <Button variant="fill" type="submit" :disabled="!form.name">
              Criar Carteira
            </Button>
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes scale-in {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
.animate-scale-in {
  animation: scale-in 0.2s ease-out forwards;
}
</style>
