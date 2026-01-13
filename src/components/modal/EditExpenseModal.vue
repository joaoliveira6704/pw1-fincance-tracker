<script>
import { useUsersStore } from "@/stores/userStore";
import { formattedIncome, getObjectiveData } from "@/utils/utils";
import {
  X,
  Calendar,
  Target,
  Users,
  Info,
  TrendingUp,
  Type,
  AlignLeft,
} from "lucide-vue-next";
import { mapActions, mapState } from "pinia";
import Button from "../Button.vue";
import { useCategoryStore } from "@/stores/categoryStore";

export default {
  name: "EditExpenseModal",
  components: {
    X,
    Calendar,
    Target,
    Users,
    Info,
    TrendingUp,
    Type,
    AlignLeft,
    Button,
  },
  props: {
    isOpen: { type: Boolean, required: true },
    expense: { type: Object, default: () => ({}) },
    categories: { type: Array, default: () => [] },
  },
  emits: ["close", "save"],
  data() {
    return {
      // Local state to hold edits
      localExpense: {
        name: "",
        amount: 0,
        categoryId: "",
        description: "",
        date: "",
      },
    };
  },
  watch: {
    // Whenever modal opens, sync the prop to local state
    isOpen(newVal) {
      if (newVal && this.expense) {
        this.localExpense = JSON.parse(JSON.stringify(this.expense));
      }
    },
  },
  computed: {
    ...mapState(useUsersStore, ["users"]),
  },
  methods: {
    ...mapActions(useUsersStore, ["fetchUsers"]),
    getUserName(userId) {
      const user = this.users.find((u) => u.id === userId);
      return user ? `${user.firstName} ${user.lastName}` : "Utilizador";
    },

    formatDate(timestamp) {
      if (!timestamp) return "";
      return new Date(timestamp).toLocaleDateString("pt-PT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },

    toggleContributor(userId) {
      if (!this.localExpense.memberIds) {
        this.localExpense.memberIds = [];
      }

      const index = this.localExpense.memberIds.indexOf(userId);

      if (index === -1) {
        this.localExpense.memberIds.push(userId);
      } else {
        this.localExpense.memberIds.splice(index, 1);
      }
    },

    handleSave() {
      console.log("Saving objective with expense:", this.localExpense);
      this.$emit("save", this.localExpense);
    },
  },
  async mounted() {
    await this.fetchUsers();
  },
};
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      @click.self="$emit('close')"
    >
      <div
        class="relative w-full max-w-lg bg-secondary-bg rounded-3xl shadow-2xl border border-border flex flex-col overflow-hidden animate-scale-in"
      >
        <div
          class="flex justify-between items-center p-6 border-b border-border bg-main-bg"
        >
          <div class="flex items-center gap-2">
            <div class="p-2 bg-stackrgreen-500/10 rounded-lg">
              <Target class="w-5 h-5 text-stackrgreen-500" />
            </div>
            <h2 class="text-xl font-ProximaNova font-bold text-primary-text">
              Editar Despesa
            </h2>
          </div>
          <button
            @click="$emit('close')"
            class="p-2 text-secondary-text hover:text-primary-text rounded-full transition-colors"
          >
            <X class="w-6 h-6" />
          </button>
        </div>

        <div
          v-if="localExpense"
          class="p-2 md:p-8 space-y-6 overflow-y-auto max-h-[70vh]"
        >
          <div class="text-center">
            <span
              class="text-[10px] font-black text-secondary-text uppercase tracking-widest"
              >Valor</span
            >
            <div class="flex items-center justify-center gap-1">
              <input
                v-model="localExpense.amount"
                type="number"
                class="text-5xl w-48 text-center font-extrabold font-ProximaNova text-stackrgreen-500 bg-transparent border-b-2 border-transparent focus:border-stackrgreen-500 outline-none transition-colors"
              />
              <span class="text-5xl font-extrabold text-stackrgreen-500"
                >€</span
              >
            </div>
          </div>

          <div class="relative">
            <span
              class="text-[10px] font-black text-secondary-text uppercase tracking-widest mb-1 block"
              >Nome da Despesa</span
            >
            <div
              class="flex items-center gap-2 bg-main-bg border border-border rounded-xl px-4 py-2 focus-within:border-stackrgreen-500 transition-colors"
            >
              <input
                v-model="localExpense.name"
                type="text"
                class="bg-transparent w-full outline-none text-primary-text font-bold"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-main-bg p-4 rounded-xl border border-border">
              <span
                class="text-[10px] text-secondary-text font-black uppercase tracking-wider mb-2 block"
                >Data</span
              >
              <div class="flex items-center gap-2">
                <Calendar class="w-4 h-4 text-stackrgreen-500" />
                <input
                  v-model="localExpense.date"
                  type="date"
                  class="bg-transparent outline-none text-sm font-bold text-primary-text w-full"
                />
              </div>
            </div>
            <div class="bg-main-bg p-4 rounded-xl border border-border">
              <span
                class="text-[10px] text-secondary-text font-black uppercase tracking-wider mb-2 block"
                >Categoria</span
              >
              <div class="flex items-center gap-2">
                <Calendar class="w-4 h-4 text-stackrgreen-500" />
                <select
                  v-model="localExpense.categoryId"
                  type="select"
                  class="bg-transparent outline-none text-sm font-bold text-primary-text w-full"
                >
                  <option v-for="category in categories" :value="category.id">
                    {{ category.label }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="bg-main-bg p-4 rounded-xl border border-border">
            <div class="flex items-center gap-2 mb-2">
              <AlignLeft class="w-4 h-4 text-secondary-text" />
              <span
                class="text-[10px] text-secondary-text font-black uppercase tracking-wider"
                >Descrição</span
              >
            </div>
            <textarea
              v-model="localExpense.description"
              rows="3"
              class="w-full bg-transparent outline-none text-sm text-primary-text leading-relaxed resize-none"
              placeholder="Adiciona uma descrição..."
            ></textarea>
          </div>
        </div>
        <div
          class="p-6 border-t border-border bg-main-bg flex justify-between items-center"
        >
          <span class="text-[10px] text-secondary-text font-medium"
            >ID: {{ expense.id?.split("-")[0] }}</span
          >
          <div class="flex gap-3">
            <Button @click="$emit('close')" variant="cancel">Cancelar</Button>
            <Button @click="handleSave" variant="fill"
              >Salvar Alterações</Button
            >
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
