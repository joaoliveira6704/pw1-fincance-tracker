<script>
import {
  Eye,
  Trash2,
  Users,
  Target,
  BanknoteArrowUp,
  Pencil,
} from "lucide-vue-next";
import Button from "../Button.vue";
import { getObjectiveData, processObjectivesData } from "@/utils/utils";
import { getUserId } from "@/utils/session";

export default {
  name: "ObjectiveCard",
  components: {
    Eye,
    Trash2,
    Users,
    Target,
    Button,
    BanknoteArrowUp,
    Pencil,
  },
  props: {
    objective: {
      type: Object,
      required: true,
    },
  },
  emits: ["view", "delete", "edit"],
  computed: {
    formattedDeadline() {
      if (!this.objective.deadline) return "Sem prazo";
      return new Date(this.objective.deadline).toLocaleDateString("pt-PT", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    },

    isShared() {
      // Agora verifica se existem membros no array
      return this.objective.memberIds && this.objective.memberIds.length > 0;
    },

    // Calcula a percentagem de progresso
    progressPercentage() {
      return getObjectiveData(this.objective).progress;
    },

    isOwner() {
      return this.objective.ownerId === getUserId();
    },
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat("pt-PT", {
        style: "currency",
        currency: "EUR",
      }).format(value);
    },
  },
};
</script>

<template>
  <div
    class="group flex flex-col p-6 cursor-pointer rounded-2xl bg-secondary-bg border border-border hover:border-stackrgreen-500 transition-all duration-300 shadow-sm hover:shadow-md h-full relative"
    @click="$emit('view', objective)"
  >
    <div class="flex justify-between items-start mb-6">
      <div>
        <h3
          class="font-ProximaNova font-bold text-xl text-primary-text max-w-[180px]"
          :title="objective.name"
        >
          {{ objective.name }}
        </h3>
        <div class="flex items-center gap-2 mt-1">
          <span
            v-if="objective.isShared"
            class="flex items-center gap-1 text-xs font-bold text-blue-500 uppercase"
          >
            <Users class="w-3 h-3" /> Partilhado
          </span>
          <span v-else class="text-xs font-bold text-secondary-text uppercase">
            Individual
          </span>
        </div>
      </div>

      <div class="text-right">
        <span
          class="block font-ProximaNova font-bold text-2xl text-stackrgreen-500"
        >
          {{ formatCurrency(objective.targetAmount) }}
        </span>
        <span
          class="text-[10px] text-secondary-text font-Roboto font-bold uppercase tracking-wider"
        >
          Objetivo Final
        </span>
      </div>
    </div>

    <div class="mb-6">
      <div class="flex justify-between items-end mb-2">
        <span class="text-xs font-Roboto font-medium text-secondary-text"
          >Progresso</span
        >
        <span class="text-sm font-ProximaNova font-bold text-primary-text"
          >{{ progressPercentage }}%</span
        >
      </div>
      <div
        class="w-full h-2 bg-main-bg rounded-full overflow-hidden border border-border"
      >
        <div
          class="h-full bg-stackrgreen-500 transition-all duration-500"
          :style="{ width: progressPercentage + '%' }"
        ></div>
      </div>
    </div>

    <div class="flex items-center gap-2 mb-6 text-secondary-text">
      <span class="text-xs font-Roboto">
        Prazo:
        <strong class="text-primary-text">{{ formattedDeadline }}</strong>
      </span>
    </div>

    <div
      v-if="isOwner"
      class="mt-auto md:pt-4 border-t border-border grid grid-cols-3 gap-3"
    >
      <Button
        variant="outline-full"
        @click.stop="$emit('contribute', objective)"
      >
        <BanknoteArrowUp class="w-4 h-4" />
      </Button>

      <Button
        variant="outline-full"
        class="flex items-center justify-center hover:!bg-blue-500 hover:!border-blue-500 hover:!text-white"
        @click.stop="$emit('edit', objective)"
      >
        <Pencil class="w-4 h-4" />
      </Button>

      <Button
        variant="outline-full"
        class="hover:bg-red-500! hover:border-red-500! hover:text-white! transition-all"
        @click.stop="$emit('delete', objective)"
      >
        <Trash2 class="w-4 h-4" />
      </Button>
    </div>
    <div v-else class="mt-auto pt-4 border-t border-border">
      <Button
        variant="outline-full"
        @click.stop="$emit('contribute', objective)"
      >
        <BanknoteArrowUp class="w-4 h-4" />
      </Button>
    </div>
  </div>
</template>

<style scoped>
/* Pequena animação no hover para dar feedback visual */
.group:hover .bg-stackrgreen-500 {
  filter: brightness(1.1);
}
</style>
