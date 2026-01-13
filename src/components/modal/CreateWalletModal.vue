<script>
import Button from "../Button.vue";
import RegisterInput from "../RegisterInput.vue";
import { X, Wallet, Palette, PlusCircle, AlertCircle } from "lucide-vue-next";
import { toast } from "@/utils/swal";

export default {
  name: "CreateWalletModal",
  components: {
    Button,
    RegisterInput,
    X,
    Wallet,
    Palette,
    PlusCircle,
    AlertCircle,
  },
  props: {
    isOpen: Boolean,
  },
  emits: ["create-wallet", "close"],
  data() {
    return {
      isSubmitted: false,
      error: null,

      // Dados do formulário centralizados
      form: {
        name: "",
        initialAmount: "",
        color: "#4ddf7b", // Cor stackrgreen padrão
      },
    };
  },
  computed: {
    nameValid() {
      if (!this.isSubmitted && !this.form.name) return null;
      return this.form.name.length > 0;
    },
    amountValid() {
      if (!this.isSubmitted && this.form.initialAmount === "") return null;
      return this.form.initialAmount >= 0;
    },
  },
  methods: {
    openModal() {
      this.isOpen = true;
      this.error = null;
    },

    closeModal() {
      this.isOpen = false;
      this.resetForm();
    },

    resetForm() {
      this.form = {
        name: "",
        initialAmount: "",
        color: "#4ddf7b",
      };
      this.isSubmitted = false;
      this.error = null;
    },

    submitForm() {
      this.isSubmitted = true;

      if (!this.form.name || this.form.initialAmount === "") {
        this.error = "Por favor, preencha os campos obrigatórios.";
        return;
      }

      // Emitir os dados para o componente pai
      this.$emit("create-wallet", { ...this.form });

      toast.fire({
        icon: "success",
        title: "Carteira criada com sucesso!",
      });

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
      @click.self="$emit('close')"
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
            @click="$emit('close')"
            class="p-2 text-secondary-text hover:text-primary-text hover:bg-black/5 rounded-full transition-colors"
          >
            <X class="w-6 h-6" />
          </button>
        </div>

        <form @submit.prevent="submitForm" class="p-8 space-y-6">
          <div class="space-y-4">
            <RegisterInput
              label-text="Nome da Carteira"
              input-type="text"
              v-model="form.name"
              placeholder="Ex: Minha conta, Cofre..."
              id="walletName"
              :is-valid="nameValid"
            />

            <RegisterInput
              label-text="Saldo Inicial (€)"
              input-type="number"
              v-model="form.initialAmount"
              id="initialAmount"
              placeholder="0.00"
              step="0.01"
              :is-valid="amountValid"
            />

            <div class="flex flex-col gap-2">
              <label
                class="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-secondary-text ml-1"
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

          <div
            v-if="error"
            class="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm font-bold font-ProximaNova"
          >
            <AlertCircle class="w-4 h-4" />
            <span>{{ error }}</span>
          </div>

          <div class="flex justify-end gap-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              type="button"
              @click="closeModal"
              class="flex-1"
            >
              Cancelar
            </Button>
            <Button
              variant="fill"
              type="submit"
              class="flex-[2]"
              :disabled="!form.name"
            >
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

/* Garante que o input color não tenha bordas feias em alguns browsers */
input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}
input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: 8px;
}
</style>
