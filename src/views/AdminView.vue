<template>
  <div
    class="min-h-screen w-full flex flex-col items-center pb-20 bg-(--main-bg) text-(--primary-text) transition-colors duration-300"
  >
    <div class="mt-12 mb-8 text-center px-4">
      <h1
        class="text-4xl md:text-5xl font-ProximaNova font-bold tracking-tight mb-2"
      >
        Administração
      </h1>
      <p class="text-(--secondary-text) text-lg">Gerir utilizadores</p>
    </div>

    <div class="w-full max-w-4xl px-4 md:px-6">
      <div
        class="flex flex-wrap items-center justify-center gap-2 mb-6 py-1.5 px-2 rounded-xl bg-(--secondary-bg) border border-(--border) shadow-sm"
      >
        <button
          @click="setTab('users')"
          class="flex items-center gap-2 flex-1 justify-center min-w-[110px] py-2.5 px-4 rounded-lg text-sm font-bold transition-all duration-200 ease-out"
          :class="
            activeTab === 'users'
              ? 'bg-green-500 text-stackrblack shadow-md transform scale-[1.0]'
              : 'text-(--secondary-text) hover:text-(--primary-text) hover:bg-(--main-bg)'
          "
        >
          <Search class="w-4 h-4" />
          Utilizadores
        </button>

        <button
          @click="setTab('category')"
          class="flex items-center gap-2 flex-1 justify-center min-w-[110px] py-2.5 px-4 rounded-lg text-sm font-bold transition-all duration-200 ease-out"
          :class="
            activeTab === 'category'
              ? 'bg-green-500 text-stackrblack shadow-md transform scale-[1.0]'
              : 'text-(--secondary-text) hover:text-(--primary-text) hover:bg-(--main-bg)'
          "
        >
          <Eye class="w-4 h-4" />
          Categorias
        </button>
      </div>
      <SearchInput
        v-if="activeTab == `users`"
        v-model="searchQuery"
        placeholder="Pesquisar utilizadores"
      />
      <div
        v-if="activeTab == `users`"
        class="h-fit w-full bg-(--secondary-bg) rounded-xl border border-(--border) text-(--primary-text) transition-colors duration-300"
      >
        <!-- Table -->
        <table class="w-full text-center text-sm whitespace-nowrap">
          <thead class="uppercase border-b-2 dark:border-neutral-600">
            <tr>
              <th class="px-6 py-4" @click="sortList">
                First Name <i class="pi pi-sort-down-fill mx-1 mt-1"></i>
              </th>
              <th class="">Last Name</th>
              <th class="px-6 py-4">Username</th>
              <th class="px-6 py-4">Created at</th>
              <th class="px-6 py-4">Admin</th>
              <th class="px-6 py-4">Delete</th>
            </tr>
          </thead>

          <tbody>
            <AdminTableRow
              v-for="user in users"
              :first-name="user.firstName"
              :last-name="user.lastName"
              :username="user.username"
              :created-at="user.createdAt"
              :is-admin="user.isAdmin"
              :user-id="user.id"
              @remove-user="handleRemoveUser"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserId } from "@/utils/session";
import * as api from "@/api/api.js";
import { useUsersStore } from "@/stores/userStore";
import { mapActions, mapState } from "pinia";
import AdminTableRow from "@/components/AdminTableRow.vue";
import SearchInput from "@/components/SearchInput.vue";

import {
  Users,
  Search,
  UserPlus,
  UserMinus,
  Heart,
  Eye,
  UserCheck,
} from "lucide-vue-next";

const BASE_URL = "http://localhost:3000";

export default {
  data() {
    return {
      activeTab: "users",
      searchQuery: "",
    };
  },

  components: {
    AdminTableRow,
    SearchInput,
  },

  computed: {
    ...mapState(useUsersStore, ["users"]),
  },
  methods: {
    ...mapActions(useUsersStore, ["fetchUsers", "removeUser"]),

    async fetch() {
      await this.fetchUsers();
    },

    async handleRemoveUser(userId) {
      console.log(userId);
      await this.removeUser(userId);
    },

    setTab(tabName) {
      this.activeTab = tabName;
      this.searchQuery = "";
      console.log(this.activeTab);
    },
  },

  async mounted() {
    await this.fetch();
  },
};
</script>

<style lang="scss" scoped></style>
