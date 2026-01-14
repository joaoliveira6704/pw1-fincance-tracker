<script>
import { useCategoryStore } from "@/stores/categoryStore";
import ObjectivesList from "@/components/ObjectivesList.vue";
import { mapActions, mapState } from "pinia";
import { useExpenseStore } from "@/stores/expenseStore";
import CreateObjectiveModal from "@/components/modal/CreateObjectiveModal.vue";
import { useFriendStore } from "@/stores/friendStore";
import { getUserId } from "@/utils/session";
import { useUsersStore } from "@/stores/userStore";
import ObjectivesSkeleton from "@/components/skeletons/ObjectivesSkeleton.vue";

export default {
  data() {
    return {
      friends: [],
      isLoading: false,
    };
  },
  components: {
    CreateObjectiveModal,
    ObjectivesList,
    ObjectivesSkeleton,
  },
  computed: {
    ...mapState(useCategoryStore, ["categories"]),
    ...mapState(useExpenseStore, ["expenses"]),
    ...mapState(useFriendStore, ["getFriends"]),
    ...mapState(useUsersStore, ["users"]),
  },
  methods: {
    ...mapActions(useFriendStore, ["fetchFollowers", "fetchFollowing"]),
    ...mapActions(useCategoryStore, ["fetchCategories"]),
    ...mapActions(useExpenseStore, ["fetchExpenses"]),
    ...mapActions(useUsersStore, ["fetchUsers"]),
  },
  async mounted() {
    this.isLoading = true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await this.fetchCategories();
    await this.fetchExpenses();
    await this.fetchFollowers();
    await this.fetchFollowing();
    await this.fetchUsers();
    this.isLoading = false;
  },
};
</script>

<template>
  <ObjectivesSkeleton v-if="isLoading" />
  <div
    v-else
    class="w-full min-h-screen overflow-auto bg-main-bg text-primary-text pb-10 md:pb-0"
  >
    <div class="max-w-7xl mx-auto px-4 flex flex-col gap-y-10 text-center">
      <div class="mt-8">
        <h1 class="text-4xl md:text-5xl font-bold font-ProximaNova mb-4">
          Objetivos
        </h1>

        <CreateObjectiveModal />
      </div>

      <ObjectivesList @contribute="handleContribute" :friends="getFriends" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
