<script>
import CreateExpenseModal from "@/components/modal/CreateExpenseModal.vue";
import { useCategoryStore } from "@/stores/categoryStore";
import ExpensesList from "@/components/ExpensesList.vue";
import { mapActions, mapState } from "pinia";
import { useExpenseStore } from "@/stores/expenseStore";
import AmountSlider from "@/components/slider/AmountSlider.vue";
import { useUsersStore } from "@/stores/userStore";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton.vue";
import { toast } from "@/utils/swal";
import ExpensesSkeleton from "@/components/skeletons/ExpensesSkeleton.vue";

export default {
  data() {
    return {
      isLoading: true,
    };
  },
  components: {
    CreateExpenseModal,
    ExpensesList,
    AmountSlider,
    ExpensesSkeleton,
  },
  computed: {
    ...mapState(useCategoryStore, ["categories", "loading"]),
    ...mapState(useExpenseStore, ["expenses", "loading"]),
    ...mapState(useUsersStore, ["currentUser", "loading"]),
  },
  methods: {
    ...mapActions(useCategoryStore, ["fetchCategories"]),
    ...mapActions(useExpenseStore, ["fetchExpenses"]),
    ...mapActions(useUsersStore, ["fetchLoggedUser", "updateUserPreferences"]),

    async handleMonthlyLimit(newVal) {
      try {
        // 1. Verifica se a store e o utilizador existem
        const currentPrefs = this.currentUser?.preferences || {};

        // 2. Tira proveito da nossa action da Store
        await this.updateUserPreferences({
          ...currentPrefs,
          monthlyLimit: newVal,
        });
        toast.fire({
          icon: "success",
          title: "Preferências guardadas!",
        });
      } catch (error) {
        console.error(error);
        toast.fire({
          icon: "error",
          title: "Erro ao guardar",
        });
      }
    },
  },
  async mounted() {
    this.isLoading = true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await this.fetchExpenses();
    await this.fetchCategories();
    await this.fetchLoggedUser();
    this.isLoading = false;
  },
};
</script>

<template>
  <ExpensesSkeleton v-if="isLoading" />
  <div
    v-else
    class="w-full overflow-auto min-h-screen bg-main-bg text-primary-text pb-10 md:pb-0"
  >
    <div class="max-w-7xl mx-auto px-4 flex flex-col gap-y-10 text-center">
      <div class="mt-8">
        <h1 class="text-4xl md:text-5xl font-bold font-ProximaNova mb-4">
          Despesas
        </h1>

        <CreateExpenseModal :categories="categories" />
        <AmountSlider
          :amount="currentUser.preferences.monthlyLimit"
          @save-preferences="handleMonthlyLimit"
        />
      </div>

      <ExpensesList :expenses="expenses" :categories="categories" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
