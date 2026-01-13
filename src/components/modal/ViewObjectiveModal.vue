<script>
import { useUsersStore } from "@/stores/userStore";
import {
  formattedDate,
  formattedIncome,
  getObjectiveData,
} from "@/utils/utils";
import {
  X,
  Calendar,
  Target,
  Users,
  Info,
  TrendingUp,
  User,
} from "lucide-vue-next";
import { mapActions, mapState } from "pinia";
import AddContributorCard from "../cards/AddContributorCard.vue";
import Button from "../Button.vue";

export default {
  name: "ViewObjectiveModal",
  components: {
    X,
    Calendar,
    Target,
    Users,
    Info,
    TrendingUp,
    AddContributorCard,
    Button,
    User,
  },
  methods: {
    ...mapActions(useUsersStore, ["fetchUsers", "fetchUserById"]),
    formattedIncome(value) {
      return formattedIncome(value);
    },
    // 1. Get User Name by ID
    getUserName(userId) {
      const user = this.users.find((u) => u.id === userId);
      return user ? user.firstName + " " + user.lastName : "ID: " + userId;
    },

    // 2. Format Contribution Date
    formatDate(timestamp) {
      if (!timestamp) return "";
      return new Date(timestamp).toLocaleDateString("pt-PT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },

    // Existing helper
    renderCurrency(value) {
      return formattedIncome(value);
    },
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    objective: {
      type: Object,
      default: () => ({}),
    },
    friends: Array,
  },
  emits: ["close"],
  computed: {
    ...mapState(useUsersStore, ["users"]),
    formattedDeadline() {
      if (!this.objective?.deadline) return "Sem prazo definido";
      return new Date(this.objective.deadline).toLocaleDateString("pt-PT", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    },
    activeContributors() {
      // Return empty if no objective or no memberIds exist
      if (!this.objective || !this.objective.memberIds) return [];

      return this.friends.filter((friend) =>
        this.objective.memberIds.includes(friend.id)
      );
    },

    getOwner() {
      return this.users.find((u) => u.id === this.objective.ownerId);
    },

    objectiveData() {
      const data =
        this.objective.targetAmount - getObjectiveData(this.objective).sum;
      return data > 0 ? formattedIncome(data) : "0.00€";
    },
    formattedTarget() {
      return new Intl.NumberFormat("pt-PT", {
        style: "currency",
        currency: "EUR",
      }).format(Number(this.objective?.targetAmount) || 0);
    },
    // Cálculo de progresso
    progress() {
      return getObjectiveData(this.objective).progress;
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
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-all ease"
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
            <h2
              class="text-base sm:text-xl font-ProximaNova font-bold text-primary-text"
            >
              Detalhes do Objetivo
            </h2>
          </div>
          <button
            @click="$emit('close')"
            class="p-2 text-secondary-text hover:text-primary-text hover:bg-secondary-bg rounded-full transition-colors"
          >
            <X class="w-6 h-6" />
          </button>
        </div>

        <div
          v-if="objective"
          class="p-2 md:p-8 space-y-8 overflow-y-scroll max-h-[50vh] transition-all ease-in-out duration-700"
        >
          <div class="text-center">
            <span
              class="text-xs font-bold text-secondary-text uppercase tracking-widest"
              >Meta Final</span
            >
            <div
              class="text-4xl md:text-5xl font-extrabold font-ProximaNova text-stackrgreen-500 my-2"
            >
              {{ formattedTarget }}
            </div>
            <h3 class="text-xl md:text-2xl font-bold text-primary-text">
              {{ objective.name }}
            </h3>
          </div>

          <div
            class="bg-main-bg p-6 rounded-2xl border border-border shadow-sm"
          >
            <div class="flex justify-between items-center mb-3">
              <span
                class="flex items-center gap-2 text-sm font-bold text-primary-text"
              >
                <TrendingUp class="w-4 h-4 text-stackrgreen-500" />
                Progresso Atual
              </span>
              <span class="text-lg font-black text-stackrgreen-500"
                >{{ progress }}%</span
              >
            </div>
            <div
              class="w-full h-4 bg-secondary-bg rounded-full border border-border overflow-hidden"
            >
              <div
                class="h-full bg-stackrgreen-500 transition-all duration-1000 ease-out"
                :style="{ width: progress + '%' }"
              ></div>
            </div>
            <p class="text-[11px] text-secondary-text mt-3 text-center italic">
              Faltam
              {{ objectiveData }}
              para atingir a meta.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              class="bg-main-bg p-4 rounded-xl border border-border flex items-start gap-3"
            >
              <div class="p-2 bg-secondary-bg rounded-lg text-secondary-text">
                <Calendar class="w-5 h-5" />
              </div>
              <div>
                <span
                  class="block text-[10px] text-secondary-text font-black uppercase tracking-wider"
                  >Prazo Final</span
                >
                <span class="text-sm font-bold text-primary-text capitalize">{{
                  formattedDeadline
                }}</span>
              </div>
            </div>

            <div
              class="bg-main-bg p-4 rounded-xl border border-border flex items-start gap-3"
            >
              <div class="p-2 bg-secondary-bg rounded-lg text-secondary-text">
                <Users class="w-5 h-5" />
              </div>
              <div>
                <span
                  class="block text-[10px] text-secondary-text font-black uppercase tracking-wider"
                  >Visibilidade</span
                >
                <span
                  class="text-sm font-bold"
                  :class="
                    objective.memberIds.length > 0
                      ? 'text-blue-500'
                      : 'text-primary-text'
                  "
                >
                  {{
                    objective.memberIds.length > 0
                      ? `Partilhado (${objective.memberIds?.length} membros)`
                      : "Individual"
                  }}
                </span>
              </div>
            </div>
          </div>

          <div class="bg-main-bg p-4 rounded-xl border border-border">
            <div class="flex items-center gap-2 mb-2">
              <User class="w-4 h-4 text-secondary-text" />
              <span
                class="text-[10px] text-secondary-text font-black uppercase tracking-wider"
                >Dono do Objetivo</span
              >
            </div>
            <p class="text-sm text-primary-text leading-relaxed">
              <AddContributorCard
                class="cursor-pointer"
                @click="$router.push(`profile/${getOwner.username}`)"
                :user="getOwner"
              />
            </p>
          </div>

          <div class="bg-main-bg p-4 rounded-xl border border-border">
            <div class="flex items-center gap-2 mb-2">
              <Info class="w-4 h-4 text-secondary-text" />
              <span
                class="text-[10px] text-secondary-text font-black uppercase tracking-wider"
                >Notas do Objetivo</span
              >
            </div>
            <p class="text-sm text-primary-text leading-relaxed">
              {{ objective.description }}
            </p>
          </div>

          <div class="bg-main-bg p-4 rounded-xl border border-border">
            <div class="flex items-center gap-2 mb-4">
              <TrendingUp class="w-4 h-4 text-secondary-text" />
              <span
                class="text-[10px] text-secondary-text font-black uppercase tracking-wider"
              >
                Histórico de Contribuições
              </span>
            </div>

            <div class="max-h-60 overflow-y-auto pr-2 flex flex-col gap-2">
              <template
                v-if="
                  objective.contributions && objective.contributions.length > 0
                "
              >
                <div
                  v-for="contribution in objective.contributions"
                  :key="contribution.timestamp"
                  class="flex items-center justify-between p-3 rounded-lg border border-border bg-secondary-bg/30"
                >
                  <div
                    class="flex flex-col min-[450px]:flex-row items-center gap-3"
                  >
                    <span class="text-sm font-bold text-primary-text">
                      {{ getUserName(contribution.userId) }}
                    </span>
                    <span class="text-[10px] text-secondary-text">
                      {{ formatDate(contribution.timestamp) }}
                    </span>
                  </div>
                  <div class="text-sm font-black text-stackrgreen-500">
                    + {{ renderCurrency(contribution.amount) }}
                  </div>
                </div>
              </template>

              <div v-else class="py-8 text-center">
                <p class="text-xs text-secondary-text italic">
                  Nenhuma contribuição registada ainda.
                </p>
              </div>
            </div>
          </div>
          <div
            v-if="activeContributors.length > 0"
            class="bg-main-bg p-4 rounded-xl border border-border"
          >
            <div class="flex items-center gap-2 mb-2">
              <Info class="w-4 h-4 text-secondary-text" />
              <span
                class="text-[10px] text-secondary-text font-black uppercase tracking-wider"
                >Contribuidores</span
              >
            </div>
            <div class="max-h-50 h-fit overflow-auto px-2 flex flex-col gap-2">
              <AddContributorCard
                v-for="user in activeContributors"
                :key="user.id"
                :user="user"
                :contributors="objective.memberIds"
              />
            </div>
          </div>
        </div>

        <div
          class="p-6 border-t border-border bg-navbar-bg flex justify-between items-center"
        >
          <span class="text-[10px] text-secondary-text font-medium"
            >ID: {{ objective.id }}</span
          >
        </div>
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
    transform: scale(0.9) translateY(20px);
    opacity: 0;
  }
  to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}
.animate-scale-in {
  animation: scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Custom Scrollbar */
div::-webkit-scrollbar {
  width: 4px;
}
div::-webkit-scrollbar-track {
  background: transparent;
}
div::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 10px;
}
</style>
