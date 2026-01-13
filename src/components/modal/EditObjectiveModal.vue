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
import AddContributorCard from "../cards/AddContributorCard.vue";
import Button from "../Button.vue";

export default {
  name: "EditObjectiveModal",
  components: {
    X,
    Calendar,
    Target,
    Users,
    Info,
    TrendingUp,
    Type,
    AlignLeft,
    AddContributorCard,
    Button,
  },
  props: {
    isOpen: { type: Boolean, required: true },
    objective: { type: Object, default: () => ({}) },
    friends: Array,
  },
  emits: ["close", "save"],
  data() {
    return {
      // Local state to hold edits
      localObjective: {
        name: "",
        targetAmount: 0,
        deadline: "",
        description: "",
        memberIds: [],
      },
    };
  },
  watch: {
    // Whenever modal opens, sync the prop to local state
    isOpen(newVal) {
      if (newVal && this.objective) {
        this.localObjective = JSON.parse(JSON.stringify(this.objective));
      }
    },
  },
  computed: {
    ...mapState(useUsersStore, ["users"]),

    // Calculate progress based on local edited amount
    progress() {
      if (!this.localObjective) return 0;
      const sum = getObjectiveData(this.objective).sum; // Total already saved
      const target = Number(this.localObjective.targetAmount) || 1;
      const calc = Math.round((sum / target) * 100);
      return Math.min(calc, 100);
    },

    remainingAmount() {
      const sum = getObjectiveData(this.objective).sum;
      const remaining = this.localObjective.targetAmount - sum;
      return remaining > 0 ? formattedIncome(remaining) : "0,00€";
    },
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
      if (!this.localObjective.memberIds) {
        this.localObjective.memberIds = [];
      }

      const index = this.localObjective.memberIds.indexOf(userId);

      if (index === -1) {
        this.localObjective.memberIds.push(userId);
      } else {
        this.localObjective.memberIds.splice(index, 1);
      }
    },

    handleSave() {
      console.log("Saving objective with members:", this.localObjective);
      this.$emit("save", this.localObjective);
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
      class="fixed inset-0 z-0 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      @click.self="$emit('close')"
    >
      <div
        class="relative w-full max-w-lg bg-secondary-bg rounded-3xl shadow-2xl border border-border flex flex-col overflow-hidden animate-scale-in"
      >
        <div
          class="flex justify-between items-center p-6 border-b border-border bg-navbar-bg"
        >
          <div class="flex items-center gap-2">
            <div class="p-2 bg-stackrgreen-500/10 rounded-lg">
              <Target class="w-5 h-5 text-stackrgreen-500" />
            </div>
            <h2 class="text-xl font-ProximaNova font-bold text-primary-text">
              Editar Objetivo
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
          v-if="localObjective"
          class="p-2 md:p-8 transition-all duration-700 ease-in-out space-y-6 overflow-y-auto max-h-[70vh]"
        >
          <div class="text-center">
            <span
              class="text-[10px] font-black text-secondary-text uppercase tracking-widest"
              >Meta Final</span
            >
            <div class="flex items-center justify-center gap-1">
              <input
                v-model="localObjective.targetAmount"
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
              >Nome do Objetivo</span
            >
            <div
              class="flex items-center gap-2 bg-main-bg border border-border rounded-xl px-4 py-2 focus-within:border-stackrgreen-500 transition-colors"
            >
              <input
                v-model="localObjective.name"
                type="text"
                class="bg-transparent w-full outline-none text-primary-text font-bold"
              />
            </div>
          </div>

          <div class="bg-main-bg p-5 rounded-2xl border border-border">
            <div class="flex justify-between items-center mb-3">
              <span
                class="flex items-center gap-2 text-sm font-bold text-primary-text"
              >
                <TrendingUp class="w-4 h-4 text-stackrgreen-500" /> Progresso
              </span>
              <span class="text-lg font-black text-stackrgreen-500"
                >{{ progress }}%</span
              >
            </div>
            <div
              class="w-full h-3 bg-secondary-bg rounded-full border border-border overflow-hidden"
            >
              <div
                class="h-full bg-stackrgreen-500 transition-all duration-500"
                :style="{ width: progress + '%' }"
              ></div>
            </div>
            <p class="text-[11px] text-secondary-text mt-3 text-center italic">
              Faltam {{ remainingAmount }} para a meta.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-main-bg p-4 rounded-xl border border-border">
              <span
                class="text-[10px] text-secondary-text font-black uppercase tracking-wider mb-2 block"
                >Prazo Final</span
              >
              <div class="flex items-center gap-2">
                <Calendar class="w-4 h-4 text-stackrgreen-500" />
                <input
                  v-model="localObjective.deadline"
                  type="date"
                  class="bg-transparent outline-none text-sm font-bold text-primary-text w-full"
                />
              </div>
            </div>

            <div class="bg-main-bg p-4 rounded-xl border border-border">
              <span
                class="text-[10px] text-secondary-text font-black uppercase tracking-wider mb-2 block"
                >Visibilidade</span
              >
              <div class="flex items-center gap-2">
                <Users class="w-4 h-4 text-blue-500" />
                <span class="text-sm font-bold text-primary-text">
                  {{
                    localObjective.memberIds?.length > 0
                      ? "Partilhado"
                      : "Individual"
                  }}
                </span>
              </div>
            </div>
          </div>

          <div class="bg-main-bg p-4 rounded-xl border border-border">
            <div class="flex items-center gap-2 mb-2">
              <AlignLeft class="w-4 h-4 text-secondary-text" />
              <span
                class="text-[10px] text-secondary-text font-black uppercase tracking-wider"
                >Notas</span
              >
            </div>
            <textarea
              v-model="localObjective.description"
              rows="3"
              class="w-full bg-transparent outline-none text-sm text-primary-text leading-relaxed resize-none"
              placeholder="Adiciona uma descrição..."
            ></textarea>
          </div>

          <div class="bg-main-bg p-4 rounded-xl border border-border">
            <span
              class="text-[10px] text-secondary-text font-black uppercase tracking-wider block mb-3"
              >Gerir Contribuidores</span
            >
            <div class="max-h-40 overflow-y-auto flex flex-col gap-2 pr-1">
              <AddContributorCard
                v-for="user in friends"
                :key="user.id"
                :user="user"
                :contributors="localObjective.memberIds"
                :is-edit="true"
                @toggle="toggleContributor"
              />
            </div>
          </div>
        </div>

        <div
          class="p-6 border-t border-border bg-navbar-bg flex justify-between items-center"
        >
          <span class="text-[10px] text-secondary-text font-medium"
            >ID: {{ objective.id?.split("-")[0] }}</span
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
