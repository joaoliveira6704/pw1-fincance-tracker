<script>
import { ScrollText, Target, Filter, Plus, Goal } from "lucide-vue-next";
import ObjectiveCard from "@/components/cards/ObjectiveCard.vue";
import ViewObjectiveModal from "@/components/modal/ViewObjectiveModal.vue";
import { useObjectivesStore } from "@/stores/objectiveStore";
import { useLogStore } from "@/stores/logStore";
import { getUserId } from "@/utils/session";
import { mapState, mapActions } from "pinia";
import { confirmAction, inputAmountAlert, toast } from "@/utils/swal";
import Button from "./Button.vue";
import EditObjectiveModal from "./modal/EditObjectiveModal.vue";

export default {
  name: "ObjectivesList",
  components: {
    ScrollText,
    Target,
    Filter,
    Plus,
    ObjectiveCard,
    ViewObjectiveModal,
    Button,
    EditObjectiveModal,
    Goal,
  },
  data() {
    return {
      isViewModalOpen: false,
      isEditModalOpen: false,
      selectedObjective: null,
    };
  },
  props: {
    friends: Array,
  },
  computed: {
    ...mapState(useObjectivesStore, ["objectives", "loading"]),

    hasObjectives() {
      return this.objectives && this.objectives.length > 0;
    },

    passedObjectives() {
      const today = new Date();
      return this.objectives.filter((obj) => {
        if (!obj.deadline) return false;
        return new Date(obj.deadline) < today;
      });
    },

    // Objetivos ativos (não passados) e PARTILHADOS
    sharedObjectives() {
      const today = new Date();
      const userId = getUserId();

      return this.objectives.filter((obj) => {
        const isExpired = obj.deadline && new Date(obj.deadline) < today;
        const isShared =
          (obj.memberIds && obj.memberIds.length > 0) ||
          (obj.memberIds && obj.memberIds.includes(userId));
        return !isExpired && isShared;
      });
    },

    // Objetivos ativos (não passados) e INDIVIDUAIS
    personalObjectives() {
      const today = new Date();
      return this.objectives.filter((obj) => {
        const isExpired = obj.deadline && new Date(obj.deadline) < today;
        const isShared = obj.memberIds && obj.memberIds.length > 0;
        return !isExpired && !isShared;
      });
    },

    // Soma o valor total de todos os objetivos traçados
    totalTargetAmount() {
      return this.objectives.reduce(
        (sum, item) => sum + (Number(item.targetAmount) || 0),
        0
      );
    },
  },
  methods: {
    ...mapActions(useObjectivesStore, [
      "fetchObjectives",
      "addObjectiveContribution",
      "deleteObjective",
      "updateObjective",
    ]),
    ...mapActions(useLogStore, ["addNewLog"]),

    formatCurrency(val) {
      return new Intl.NumberFormat("pt-PT", {
        style: "currency",
        currency: "EUR",
      }).format(val);
    },

    // --- LÓGICA DO MODAL ---
    handleViewObjective(objective) {
      this.selectedObjective = objective;
      this.isViewModalOpen = true;
    },

    // --- LÓGICA DO MODAL ---
    handleEditObjective(objective) {
      this.selectedObjective = objective;
      this.isEditModalOpen = true;
    },

    async saveEditObjective(objective) {
      await this.updateObjective(objective);

      this.isEditModalOpen = false;
      toast.fire({
        icon: "success",
        title: `O Objetivo ${objective.name} foi atualizado!`,
      });
      this.addNewLog(getUserId(), "objective", objective.id, "update", null);
    },

    // --- LÓGICA DE APAGAR ---
    handleDeleteObjective(objective) {
      confirmAction(
        "Eliminar Objetivo?",
        "Esta ação é permanente e removerá todo o progresso associado."
      ).then(async (result) => {
        if (result.isConfirmed) {
          try {
            // 1. Apagar da Store/API
            await this.deleteObjective(objective.id);

            // 2. Registar no Log
            await this.addNewLog(
              getUserId(),
              "objective",
              objective.id,
              "remove",
              null
            );

            toast.fire({
              icon: "success",
              title: `O Objetivo ${objective.name} foi apagado!`,
            });
          } catch (error) {
            console.error(error);
            toast.fire({
              icon: "error",
              title: "Erro ao apagar objetivo.",
            });
          }
        }
      });
    },

    handleContribution(objective) {
      inputAmountAlert("contribute", "contribuir").then(async (result) => {
        const value = parseFloat(result.value);
        if (result.isConfirmed && value > 0) {
          await this.addObjectiveContribution(objective, value);
          await this.addNewLog(
            getUserId(),
            "objective",
            objective.id,
            "contribute",
            value
          );
          toast.fire({
            icon: "success",
            title: `Adicionaste ${value}€ ao objetivo ${objective.name}.`,
          });
        } else if (result.isDismissed) {
          return;
        }
      });
    },
  },
  async mounted() {
    await this.fetchObjectives();
  },
};
</script>

<template>
  <div class="w-full max-w-7xl mx-auto p-0 md:p-6 text-primary-text">
    <div
      class="flex flex-col sm:flex-row justify-between items-center md:items-end mb-6 gap-4 border-b border-border pb-6"
    >
      <div>
        <h1
          class="text-2xl sm:text-3xl md:text-4xl font-ProximaNova font-bold mb-2"
        >
          Os teus Objetivos
        </h1>
        <p class="text-secondary-text text-sm md:text-base font-Roboto">
          Gere e visualiza todos os teus objetivos num só lugar.
        </p>
      </div>

      <div class="flex items-center gap-4">
        <div
          v-if="hasObjectives"
          class="bg-secondary-bg border border-border px-6 py-3 rounded-xl shadow-sm flex items-center gap-4"
        >
          <div class="p-2 bg-stackrgreen-500/10 rounded-lg">
            <Target class="w-6 h-6 text-stackrgreen-500" />
          </div>
          <div>
            <p
              class="text-xs text-secondary-text font-bold uppercase tracking-wider"
            >
              Total em Metas
            </p>
            <p class="text-2xl font-ProximaNova font-bold text-primary-text">
              {{ formatCurrency(totalTargetAmount) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div v-if="personalObjectives.length > 0" class="mb-12">
        <h2 class="text-xl font-bold mb-6 flex items-center gap-2">
          <Target class="w-5 h-5 text-stackrgreen-500" /> Objetivos Pessoais
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <ObjectiveCard
            v-for="objective in personalObjectives"
            :key="objective.id"
            :objective="objective"
            @view="handleViewObjective"
            @edit="handleEditObjective"
            @delete="handleDeleteObjective"
            @contribute="handleContribution"
          />
        </div>
      </div>

      <div v-if="sharedObjectives.length > 0" class="mb-12">
        <h2 class="text-xl font-bold mb-6 flex items-center gap-2">
          <Users class="w-5 h-5 text-blue-500" /> Objetivos Partilhados
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <ObjectiveCard
            v-for="objective in sharedObjectives"
            :key="objective.id"
            :objective="objective"
            @view="handleViewObjective"
            @edit="handleEditObjective"
            @delete="handleDeleteObjective"
            @contribute="handleContribution"
          />
        </div>
      </div>

      <div
        v-if="passedObjectives.length > 0"
        class="opacity-75 grayscale-[0.5]"
      >
        <h2
          class="text-xl font-bold mb-6 flex items-center gap-2 text-secondary-text"
        >
          <ScrollText class="w-5 h-5" /> Prazo Ultrapassado
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <ObjectiveCard
            v-for="objective in passedObjectives"
            :key="objective.id"
            :objective="objective"
            @view="handleViewObjective"
            @edit="handleEditObjective"
            @delete="handleDeleteObjective"
            @contribute="handleContribution"
          />
        </div>
      </div>
      <div
        v-if="!hasObjectives"
        class="flex flex-col items-center justify-center py-20 px-4 text-center bg-secondary-bg rounded-2xl border border-dashed border-border mt-4"
      >
        <div class="bg-main-bg p-4 rounded-full mb-4 shadow-sm">
          <Goal class="w-12 h-12 text-secondary-text opacity-50" />
        </div>
        <h3 class="text-xl font-ProximaNova font-bold text-primary-text mb-2">
          Nenhum Objetivo Encontrado.
        </h3>
      </div>
    </div>
  </div>
  <ViewObjectiveModal
    :friends="friends"
    :is-open="isViewModalOpen"
    :objective="selectedObjective"
    @close="isViewModalOpen = false"
  />
  <EditObjectiveModal
    :friends="friends"
    :is-open="isEditModalOpen"
    :objective="selectedObjective"
    @close="isEditModalOpen = false"
    @save="saveEditObjective"
  />
</template>

<style scoped>
/* Estilos herdados e limpos */
.grid {
  perspective: 1000px;
}
</style>
