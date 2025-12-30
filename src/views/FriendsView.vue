<script>
import { useFriendStore } from "@/stores/friendStore";
import Swal from "sweetalert2";
// Import Fuse.js
import Fuse from "fuse.js";
// Import New Search Component
import SearchInput from "@/components/SearchInput.vue";

import {
  Users,
  Search, // Icon
  UserPlus,
  UserMinus,
  Heart,
  Eye,
  UserCheck,
} from "lucide-vue-next";
import { useUsersStore } from "@/stores/userStore";
import { mapActions, mapState } from "pinia";

export default {
  components: {
    SearchInput, // Register component
    Users,
    Search,
    UserPlus,
    UserMinus,
    Heart,
    Eye,
    UserCheck,
  },
  data() {
    return {
      activeTab: "discover",
      currentUser: null,
      searchQuery: "", // Add search query state

      alertIcon: `
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      `,
    };
  },
  computed: {
    ...mapState(useFriendStore, ["availableUsers", "followers", "following"]),
    filteredDisplayList() {
      let sourceData = [];
      let keys = [];

      // 1. Determine Data Source and Search Keys based on Tab
      if (this.activeTab === "discover") {
        sourceData = this.availableUsers;
        keys = ["firstName", "lastName", "username"];
      } else if (this.activeTab === "following") {
        sourceData = this.following;
        keys = ["friendName", "friendUsername"];
      } else if (this.activeTab === "followers") {
        sourceData = this.followers;
        keys = ["userName", "userUsername"];
      }

      // 2. If no search, return all data
      if (!this.searchQuery.trim()) {
        return sourceData;
      }

      // 3. Configure Fuse
      const fuse = new Fuse(sourceData, {
        keys: keys,
        threshold: 0.3, // 0.0 = perfect match, 1.0 = match anything
        includeScore: false,
      });

      // 4. Return mapped results
      return fuse.search(this.searchQuery).map((result) => result.item);
    },
  },
  methods: {
    ...mapActions(useUsersStore, ["fetchLoggedUser"]),
    ...mapActions(useFriendStore, [
      "fetchCommunity",
      "fetchFollowing",
      "fetchFollowers",
      "addFollowing",
      "removeFriendship",
    ]),

    // Reset search when switching tabs for better UX
    setTab(tabName) {
      this.activeTab = tabName;
      this.searchQuery = "";
    },

    avatarQuery(username) {
      return `https://api.dicebear.com/9.x/identicon/png?seed=${username}&scale=70&backgroundColor=#ffffff`;
    },
    async updateInfo() {
      try {
        await this.fetchFollowing();
        await this.fetchFollowers();
        await this.fetchCommunity();
      } catch (error) {
        console.error("Error fetching data", error);
      }
    },

    getSwalConfig(title, text, showCancel = false) {
      return {
        title: title,
        text: text,
        iconHtml: this.alertIcon,
        buttonsStyling: false,
        showCancelButton: showCancel,
        confirmButtonText: "Sim",
        cancelButtonText: "Cancelar",
        customClass: {
          popup: "stackr-swal-popup",
          title: "stackr-swal-title",
          htmlContainer: "stackr-swal-text",
          icon: "stackr-swal-icon",
          confirmButton: "stackr-swal-confirm",
          cancelButton: "stackr-swal-cancel",
          actions: "stackr-swal-actions",
        },
      };
    },

    async addFriend(user) {
      try {
        await this.addFollowing(this.currentUser, user);
        await this.updateInfo();
        Swal.fire({
          ...this.getSwalConfig("Sucesso", "Amigo adicionado!"),
          icon: "success",
          iconHtml: undefined,
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          ...this.getSwalConfig("Erro", "Erro ao adicionar amigo."),
          icon: "error",
          iconHtml: undefined,
        });
      }
    },

    async removeFriend(id) {
      Swal.fire(
        this.getSwalConfig(
          "Tens a certeza?",
          "Vais deixar de ser amigo deste utilizador!",
          true
        )
      ).then(async (result) => {
        if (result.isConfirmed) {
          await this.removeFriendship(id);
          await this.updateInfo();
          Swal.fire({
            ...this.getSwalConfig("Removido!", "O utilizador foi removido."),
            icon: "success",
            iconHtml: undefined,
          });
        }
      });
    },
  },

  async created() {
    await this.updateInfo();

    try {
      this.currentUser = await this.fetchLoggedUser();
    } catch (e) {
      this.error = "Failed to load profile.";
      console.error(e);
    }
  },
};
</script>

<template>
  <div
    class="min-h-screen w-full flex flex-col items-center pb-20 bg-(--main-bg) text-(--primary-text) transition-colors duration-300"
  >
    <div class="mt-12 mb-8 text-center px-4">
      <h1
        class="text-4xl md:text-5xl font-ProximaNova font-bold tracking-tight mb-2"
      >
        Comunidade
      </h1>
      <p class="text-(--secondary-text) text-lg">
        Gere as tuas conexões e descobre novas pessoas.
      </p>
    </div>

    <div class="w-full max-w-4xl px-4 md:px-6">
      <div
        class="flex flex-wrap items-center justify-center gap-2 mb-6 py-1.5 px-2 rounded-xl bg-(--secondary-bg) border border-(--border) shadow-sm"
      >
        <button
          @click="setTab('discover')"
          class="flex items-center gap-2 flex-1 justify-center min-w-[110px] py-2.5 px-4 rounded-lg text-sm font-bold transition-all duration-200 ease-out"
          :class="
            activeTab === 'discover'
              ? 'bg-stackrgreen-500 text-stackrblack shadow-md transform scale-[1.0]'
              : 'text-(--secondary-text) hover:text-(--primary-text) hover:bg-(--main-bg)'
          "
        >
          <Search class="w-4 h-4" />
          Descobrir
        </button>

        <button
          @click="setTab('following')"
          class="flex items-center gap-2 flex-1 justify-center min-w-[110px] py-2.5 px-4 rounded-lg text-sm font-bold transition-all duration-200 ease-out"
          :class="
            activeTab === 'following'
              ? 'bg-stackrgreen-500 text-stackrblack shadow-md transform scale-[1.0]'
              : 'text-(--secondary-text) hover:text-(--primary-text) hover:bg-(--main-bg)'
          "
        >
          <Eye class="w-4 h-4" />
          A Seguir
        </button>

        <button
          @click="setTab('followers')"
          class="flex items-center gap-2 flex-1 justify-center min-w-[110px] py-2.5 px-4 rounded-lg text-sm font-bold transition-all duration-200 ease-out"
          :class="
            activeTab === 'followers'
              ? 'bg-stackrgreen-500 text-stackrblack shadow-md transform scale-[1.0]'
              : 'text-(--secondary-text) hover:text-(--primary-text) hover:bg-(--main-bg)'
          "
        >
          <Heart class="w-4 h-4" />
          Seguidores
        </button>
      </div>

      <SearchInput
        v-model="searchQuery"
        :placeholder="
          activeTab === 'discover'
            ? 'Procurar novos utilizadores...'
            : 'Pesquisar nas tuas conexões...'
        "
      />

      <div v-if="activeTab === 'discover'" class="space-y-4">
        <div class="flex items-center justify-between mb-4 px-2">
          <h3 class="text-xl font-bold font-ProximaNova">
            Pessoas Novas
            <span class="text-(--secondary-text) text-base font-normal"
              >({{ filteredDisplayList.length }})</span
            >
          </h3>
        </div>

        <div
          v-if="filteredDisplayList.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div
            v-for="user in filteredDisplayList"
            :key="user.id"
            class="flex items-center justify-between p-4 rounded-xl bg-(--secondary-bg) border border-(--border) hover:border-stackrgreen-500/50 transition-colors"
          >
            <div class="flex items-center gap-3">
              <img
                class="w-10 h-10 rounded-full border-border border-2"
                :src="avatarQuery(user.username)"
                :alt="user.username"
              />
              <div class="flex flex-col">
                <span class="font-semibold text-(--primary-text)">{{
                  user.firstName + " " + user.lastName
                }}</span>
                <span class="text-xs text-(--secondary-text)"
                  >@{{ user.username }}</span
                >
              </div>
            </div>
            <button
              class="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg text-green-600 bg-green-500/10 hover:bg-green-600 hover:text-white transition-colors"
              @click="addFriend(user)"
            >
              <UserPlus class="w-4 h-4" />
              Adicionar
            </button>
          </div>
        </div>

        <div
          v-else
          class="flex flex-col items-center justify-center py-12 bg-(--secondary-bg) rounded-xl border border-(--border) border-dashed"
        >
          <Search class="w-12 h-12 text-(--secondary-text) mb-3 opacity-50" />
          <p class="text-(--secondary-text)">
            {{
              searchQuery
                ? "Nenhum utilizador encontrado."
                : "Não há ninguém novo por agora."
            }}
          </p>
        </div>
      </div>

      <div v-if="activeTab === 'following'" class="space-y-4">
        <div class="flex items-center justify-between mb-4 px-2">
          <h3 class="text-xl font-bold font-ProximaNova">
            A Seguir
            <span class="text-(--secondary-text) text-base font-normal"
              >({{ filteredDisplayList.length }})</span
            >
          </h3>
        </div>
        <div
          v-if="filteredDisplayList.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div
            v-for="user in filteredDisplayList"
            :key="user.id"
            class="flex items-center justify-between p-4 rounded-xl bg-(--secondary-bg) border border-(--border) hover:border-stackrgreen-500/50 transition-colors group"
          >
            <div class="flex items-center gap-3">
              <img
                class="w-10 h-10 rounded-full border-border border-2"
                :src="avatarQuery(user.friendUsername)"
                :alt="user.friendUsername"
              />
              <div class="flex flex-col">
                <span class="font-semibold text-(--primary-text)">{{
                  user.friendName
                }}</span>
                <span class="text-xs text-(--secondary-text)"
                  >@{{ user.friendUsername }}</span
                >
              </div>
            </div>
            <button
              class="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg text-red-500 bg-red-500/10 hover:bg-red-500 hover:text-white transition-colors"
              @click="removeFriend(user.id)"
            >
              <UserMinus class="w-4 h-4" />
              Remover
            </button>
          </div>
        </div>

        <div
          v-else
          class="flex flex-col items-center justify-center py-12 bg-(--secondary-bg) rounded-xl border border-(--border) border-dashed"
        >
          <Users class="w-12 h-12 text-(--secondary-text) mb-3 opacity-50" />
          <p class="text-(--secondary-text)">
            {{
              searchQuery
                ? "Nenhum amigo encontrado."
                : "Ainda não segues ninguém."
            }}
          </p>
        </div>
      </div>

      <div v-if="activeTab === 'followers'" class="space-y-4">
        <div class="flex items-center justify-between mb-4 px-2">
          <h3 class="text-xl font-bold font-ProximaNova">
            Seguidores
            <span class="text-(--secondary-text) text-base font-normal"
              >({{ filteredDisplayList.length }})</span
            >
          </h3>
        </div>
        <div
          v-if="filteredDisplayList.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div
            v-for="user in filteredDisplayList"
            :key="user.id"
            class="flex items-center justify-between p-4 rounded-xl bg-(--secondary-bg) border border-(--border) hover:border-stackrgreen-500/50 transition-colors group"
          >
            <div class="flex items-center gap-3">
              <img
                class="w-10 h-10 rounded-full border-border border-2"
                :src="avatarQuery(user.userName)"
                :alt="user.userName"
              />
              <div class="flex flex-col">
                <span class="font-semibold text-(--primary-text)">{{
                  user.userName
                }}</span>
                <span class="text-xs text-secondary-text)"
                  >@{{ user.userUsername }}</span
                >
              </div>
            </div>
            <button
              class="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg text-red-500 bg-red-500/10 hover:bg-red-500 hover:text-white transition-colors"
              @click="removeFriend(user.id)"
            >
              <UserMinus class="w-4 h-4" />
              Remover
            </button>
          </div>
        </div>

        <div
          v-else
          class="flex flex-col items-center justify-center py-12 bg-(--secondary-bg) rounded-xl border border-(--border) border-dashed"
        >
          <Users class="w-12 h-12 text-(--secondary-text) mb-3 opacity-50" />
          <p class="text-(--secondary-text)">
            {{
              searchQuery
                ? "Nenhum seguidor encontrado."
                : "Ainda não tens seguidores."
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* ... SweetAlert CSS remains exactly the same ... */
.stackr-swal-popup {
  background-color: var(--main-bg) !important;
  border: 1px solid var(--border) !important;
  border-radius: 16px !important;
  padding: 2rem !important;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5) !important;
}
.stackr-swal-title {
  color: var(--primary-text) !important;
  font-family: var(--font-ProximaNova);
  font-size: 1.5rem !important;
  font-weight: 700 !important;
}
.stackr-swal-text {
  color: var(--secondary-text) !important;
  font-size: 1rem !important;
}
.stackr-swal-icon {
  border: none !important;
  margin-bottom: 1rem !important;
}
.stackr-swal-actions {
  gap: 12px;
  width: 100%;
}
.stackr-swal-confirm {
  background-color: var(--color-stackrgreen-500) !important;
  color: #000 !important;
  border: none !important;
  padding: 12px 24px !important;
  border-radius: 8px !important;
  font-weight: 600 !important;
  font-size: 1rem !important;
  cursor: pointer;
  transition: transform 0.1s ease;
}
.stackr-swal-confirm:hover {
  filter: brightness(1.1);
  transform: scale(1.02);
}
.stackr-swal-cancel {
  background-color: transparent !important;
  border: 1px solid var(--border) !important;
  color: var(--secondary-text) !important;
  padding: 12px 24px !important;
  border-radius: 8px !important;
  font-weight: 500 !important;
  font-size: 1rem !important;
  cursor: pointer;
  transition: all 0.2s;
}
.stackr-swal-cancel:hover {
  background-color: var(--secondary-bg) !important;
  color: var(--primary-text) !important;
}
</style>
