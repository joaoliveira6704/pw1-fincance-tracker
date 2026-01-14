<script>
import { getUserId } from "@/utils/session";
import * as api from "@/api/api.js";
import { useUsersStore } from "@/stores/userStore";
import { useCategoryStore } from "@/stores/categoryStore";
import { mapActions, mapState } from "pinia";
import UserTableRow from "@/components/UserTableRow.vue";
import CategoryTableRow from "@/components/CategoryTableRow.vue";
import SearchInput from "@/components/SearchInput.vue";
import EditCategoryModal from "@/components/modal/EditCategoryModal.vue";
import CreateCategoryModal from "@/components/modal/CreateCategoryModal.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { toast } from "@/utils/swal";
import Button from "@/components/Button.vue";
import AdminSkeleton from "@/components/skeletons/AdminSkeleton.vue";

const BASE_URL = "http://localhost:3000";

export default {
  data() {
    return {
      activeTab: "category",
      searchQuery: "",
      sortDir: "asc",
      sortKey: "firstName",
      isOpen: false,
      isCreateOpen: false,
      catObj: {},
      isLoading: false,
    };
  },

  components: {
    UserTableRow,
    CategoryTableRow,
    SearchInput,
    EditCategoryModal,
    CreateCategoryModal,
    Button,
    AdminSkeleton,
  },

  computed: {
    ...mapState(useUsersStore, ["users"]),

    filteredUsers() {
      if (!this.searchQuery) {
        return this.users;
      }

      const query = new RegExp(`^${this.searchQuery}`, "i");

      return this.users.filter((user) => {
        return query.test(user.firstName);
      });
    },
    sortedUsers() {
      const key = this.sortKey;

      if (this.sortKey !== "createdAt" && this.sortKey !== "isAdmin") {
        return [...this.filteredUsers].sort((a, b) => {
          const av = a[key];
          const bv = b[key];
          const comp = av.localeCompare(bv);
          return this.sortDir === "asc" ? comp : -comp;
        });
      } else if (this.sortKey === "isAdmin") {
        return [...this.filteredUsers].sort((a, b) => {
          const av = a[key];
          const bv = b[key];
          const comp = av === bv ? 0 : av ? -1 : 1;
          return this.sortDir === "asc" ? comp : -comp;
        });
      } else {
        return [...this.filteredUsers].sort((a, b) => {
          const av = Date.parse(a[key]);
          const bv = Date.parse(b[key]);

          const comp = av - bv;
          return this.sortDir === "asc" ? comp : -comp;
        });
      }
    },

    headerClass() {
      return "sticky top-0 px-6 py-4 border-b-2 border-green-500";
    },

    ...mapState(useCategoryStore, ["categories", "getCategoryById"]),

    iconList() {
      let list = [];

      for (const [key, value] of Object.entries(library.definitions.fas)) {
        list.push(key);
      }
      const listLength = list.length / 2;

      const trimmedList = list.splice(0, listLength);
      return [...trimmedList];
    },
  },
  methods: {
    ...mapActions(useUsersStore, ["fetchUsers", "removeUser", "updateUser"]),
    ...mapActions(useCategoryStore, [
      "fetchCategories",
      "createCategory",
      "removeCategory",
    ]),

    initCreate() {
      this.isCreateOpen = true;
    },

    async defineEditObj(id) {
      this.catObj = await this.getCategoryById(id);
      this.isOpen = true;
      console.log(this.iconList);
    },

    async submitEdit(data) {
      console.log(data);
      await api.patch(BASE_URL, `categories/${data.id}`, data);
      await this.fetchCategories();
    },

    async submitCreate(data) {
      console.log("submitCreate");
      this.createCategory(data);
    },

    async callRemove(id) {
      console.log("removeCategory");
      await this.removeCategory(id);
    },

    toggleSort(key) {
      if (this.sortKey === key) {
        this.sortDir = this.sortDir === "asc" ? "desc" : "asc";
      } else {
        this.sortKey = key;
        this.sortDir = "asc";
      }
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

    async handleEditRole(newData) {
      await this.updateUser(newData);
      toast.fire({
        title: "Utilizador alterado com sucesso",
        icon: "success",
      });
    },
  },

  async mounted() {
    this.isLoading = true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await this.fetchUsers();
    await this.fetchCategories();
    this.isLoading = false;
  },
};
</script>

<template>
  <AdminSkeleton v-if="isLoading" />
  <div
    v-else
    class="min-h-screen w-full flex flex-col items-center pb-20 bg-main-bg text-primary-text transition-colors duration-300"
  >
    <div class="mt-12 mb-8 text-center px-4">
      <h1
        class="text-4xl md:text-5xl font-ProximaNova font-bold tracking-tight mb-2"
      >
        Administração
      </h1>
      <p v-if="activeTab === `users`" class="text-secondary-text text-lg">
        Gerir utilizadores
      </p>
      <p v-else class="text-secondary-text text-lg">Gerir Categorias</p>
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
              ? 'bg-stackrgreen-500 text-stackrblack shadow-md transform scale-[1.0]'
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
              ? 'bg-stackrgreen-500 text-stackrblack shadow-md transform scale-[1.0]'
              : 'text-(--secondary-text) hover:text-(--primary-text) hover:bg-(--main-bg)'
          "
        >
          Categorias
        </button>
      </div>
      <SearchInput
        v-if="activeTab == `users`"
        v-model="searchQuery"
        placeholder="Pesquisar utilizadores"
      />
      <!-- Users table -->
      <div
        v-if="activeTab == `users`"
        class="h-fit w-full bg-(--secondary-bg) rounded-xl border border-(--border) text-(--primary-text) transition-colors duration-300"
      >
        <!-- Table -->
        <div class="h-75 rounded-t-xl overflow-auto">
          <table
            class="w-full text-center text-sm whitespace-nowrap border-separate border-spacing-0"
          >
            <!-- head -->
            <thead class="sticky top-0 uppercase bg-(--secondary-bg)">
              <tr class="">
                <th :class="headerClass">
                  <span class="cursor-pointer" @click="toggleSort(`firstName`)"
                    >Primeiro nome</span
                  >
                </th>
                <th :class="headerClass">
                  <span class="cursor-pointer" @click="toggleSort(`lastName`)"
                    >Ultimo nome</span
                  >
                </th>
                <th :class="headerClass">
                  <span class="cursor-pointer" @click="toggleSort(`username`)"
                    >username</span
                  >
                </th>
                <th :class="headerClass">
                  <span class="cursor-pointer" @click="toggleSort(`createdAt`)"
                    >Data</span
                  >
                </th>
                <th :class="headerClass">
                  <span class="cursor-pointer" @click="toggleSort(`isAdmin`)"
                    >Tipo</span
                  >
                </th>
                <th :class="headerClass">Delete</th>
              </tr>
            </thead>
            <tbody class="divide-y">
              <UserTableRow
                v-for="user in sortedUsers"
                :key="user.id"
                :first-name="user.firstName"
                :last-name="user.lastName"
                :username="user.username"
                :created-at="user.createdAt"
                :is-admin="user.isAdmin"
                :user-id="user.id"
                @remove-user="handleRemoveUser"
                @change-role="handleEditRole"
              />
            </tbody>
          </table>
        </div>
      </div>

      <!-- Category table -->
      <div
        v-if="activeTab == `category`"
        class="h-fit w-full bg-(--secondary-bg) rounded-xl border border-(--border) text-(--primary-text) transition-colors duration-300"
      >
        <!-- Table -->
        <div class="h-75 rounded-t-xl overflow-auto">
          <table
            class="w-full text-center text-sm whitespace-nowrap border-separate border-spacing-0"
          >
            <!-- head -->
            <thead class="sticky top-0 uppercase bg-(--secondary-bg)">
              <tr class="">
                <th :class="headerClass">
                  <span class="cursor-pointer">Categoria</span>
                </th>
                <th :class="headerClass">
                  <span class="cursor-pointer">Icon</span>
                </th>
                <th :class="headerClass">
                  <span class="cursor-pointer">Editar</span>
                </th>
                <th :class="headerClass">
                  <span class="cursor-pointer">Apagar</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y">
              <CategoryTableRow
                v-for="category in categories"
                :key="category.id"
                :id="category.id"
                :category="category.label"
                :icon="category.icon"
                @init-edit="defineEditObj"
                @init-removal="callRemove"
              />
            </tbody>
          </table>
        </div>
        <EditCategoryModal
          v-if="isOpen"
          @close-modal="this.isOpen = false"
          @submit-data="submitEdit"
          :category="catObj"
          :iconsLibrary="iconList"
        />
        <CreateCategoryModal
          v-if="isCreateOpen"
          @close-modal="this.isCreateOpen = false"
          :iconsLibrary="iconList"
          @submit-create="submitCreate"
        />
      </div>
      <div class="w-full h-fit p-2 flex justify-end">
        <Button @click="initCreate" variant="outline"> Criar categoria </Button>
      </div>
    </div>
  </div>
</template>
