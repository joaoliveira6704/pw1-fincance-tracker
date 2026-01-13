<script>
import { useExpenseStore } from "@/stores/expenseStore";
import { useLogStore } from "@/stores/logStore";
import { getUserId } from "@/utils/session";
import { mapActions } from "pinia";
import { PlusCircle, AlertCircle, X } from "lucide-vue-next";
import RegisterInput from "@/components/RegisterInput.vue";
import Button from "../Button.vue";
import { useObjectivesStore } from "@/stores/objectiveStore";
import { toast } from "@/utils/swal";

export default {
  name: "CreateExpenseModal",
  components: {
    PlusCircle,
    AlertCircle,
    X,
    RegisterInput,
    Button,
  },
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const expenseStore = useExpenseStore();
    return { expenseStore };
  },
  data() {
    return {
      isOpen: false,

      // Dados do formulário
      date: new Date().toISOString().substr(0, 10),
      name: "",
      amount: "",
      description: "",

      error: null,
      isSubmitted: false,
    };
  },
  computed: {
    nameValid() {
      if (!this.isSubmitted && !this.name) return null;
      return this.name.length > 0;
    },
    amountValid() {
      if (!this.isSubmitted && !this.amount) return null;
      return this.amount > 0;
    },
    dateValid() {
      if (!this.isSubmitted && !this.date) return null;
      return !!this.date;
    },
    categoryClass() {
      const base =
        "w-full bg-[#9e9e9e]/50 rounded-xl px-3 py-2 hover:bg-[#C5C4CB]/50 focus:bg-[#C5C4CB]/50 transition-colors outline-1";

      // MUDANÇA 2: Validação verifica categoryId
      if (!this.isSubmitted && !this.categoryId)
        return `${base} outline-gray-500`;
      return this.categoryId
        ? `${base} outline-green-500`
        : `${base} outline-red-500`;
    },
    textareaClass() {
      return "w-full bg-[#9e9e9e]/50 rounded-xl px-3 py-2 hover:bg-[#C5C4CB]/50 focus:bg-[#C5C4CB]/50 transition-colors outline-1 outline-gray-500 focus:outline-1 resize-none placeholder-gray-600";
    },
  },
  methods: {
    ...mapActions(useLogStore, ["addNewLog"]),
    ...mapActions(useObjectivesStore, ["addObjective"]),
    openModal() {
      this.isOpen = true;
      this.error = null;
    },

    closeModal() {
      this.isOpen = false;
      this.resetForm();
    },

    resetForm() {
      this.name = "";
      this.amount = "";
      this.description = "";
      this.date = new Date().toISOString().substr(0, 10);
      this.isSubmitted = false;
      this.error = null;
    },

    async createObjective() {
      this.isSubmitted = true;

      if (!this.name || !this.amount || !this.date) {
        this.error = "Por favor, preencha todos os campos obrigatórios.";
        return;
      }

      this.error = null;

      try {
        await this.addObjective(
          this.name,
          this.amount,
          this.date,
          this.description,
          []
        );

        await this.addNewLog(
          getUserId(),
          "objective",
          null,
          "add",
          this.amount
        );

        this.closeModal();

        toast.fire({
          icon: "success",
          title: "Objetivo Criado!",
        });
      } catch (e) {
        console.error(e);
        this.error = "Ocorreu um erro ao criar objetivo.";
        toast.fire({
          icon: "error",
          title: "Erro a Criar Objetivo!",
        });
      }
    },
  },
};
</script>

<template>
  <div>
    <Button @click="openModal" variant="fill" class="gap-2">
      <PlusCircle class="w-5 h-5" />
      Criar Objetivo
    </Button>

    <Transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        @click.self="closeModal"
      >
        <div
          class="relative w-full max-w-2xl bg-secondary-bg rounded-2xl shadow-2xl border border-border flex flex-col max-h-[90vh] overflow-y-auto"
        >
          <button
            @click="closeModal"
            class="absolute top-4 right-4 p-2 text-secondary-text hover:text-primary-text hover:bg-black/5 rounded-full transition-colors"
          >
            <X class="w-6 h-6" />
          </button>

          <div class="p-8 pb-0 text-center">
            <h2
              class="text-3xl font-extrabold font-ProximaNova text-primary-text"
            >
              Novo Objetivo
            </h2>
            <p class="mt-2 text-sm text-secondary-text font-Roboto">
              Preencha os detalhes abaixo.
            </p>
          </div>

          <form @submit.prevent="createObjective" class="p-8 pt-6 space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <RegisterInput
                labelText="Nome do Objetivo"
                inputType="text"
                v-model="name"
                :isValid="nameValid"
              />

              <RegisterInput
                labelText="Valor (€)"
                inputType="number"
                v-model="amount"
                :isValid="amountValid"
              />

              <RegisterInput
                labelText="Data Limite"
                inputType="date"
                v-model="date"
                :isValid="dateValid"
              />
            </div>

            <div class="flex flex-col gap-y-1 p-2">
              <label class="ml-1">Descrição (Opcional) :</label>
              <textarea
                v-model="description"
                rows="3"
                placeholder="Detalhes adicionais..."
                :class="textareaClass"
              ></textarea>
            </div>

            <div
              v-if="error"
              class="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm font-bold font-ProximaNova mx-2"
            >
              <AlertCircle class="w-4 h-4" />
              <span>{{ error }}</span>
            </div>

            <div class="px-2 pt-2">
              <Button type="submit" variant="fill">
                <span class="flex items-center gap-2">
                  <PlusCircle class="w-5 h-5" />
                  Criar Objetivo
                </span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

:deep(label) {
  font-family: "Roboto", sans-serif;
  color: var(--primary-text);
}
:deep(input) {
  color: #000000;
}
:root[class~="dark"] ::-webkit-calendar-picker-indicator {
  filter: invert(1);
}
</style>
