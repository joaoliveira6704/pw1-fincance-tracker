<script>
import { mapActions, mapState } from "pinia";
import { useFriendStore } from "@/stores/friendStore";
import { useUsersStore } from "@/stores/userStore";
import Swal from "sweetalert2";
import Fuse from "fuse.js";
import { Users, Search } from "lucide-vue-next";

// Components
import SearchInput from "@/components/SearchInput.vue";
import CommunityTab from "@/components/CommunityTab.vue";
import UserCard from "@/components/cards/CommunityCard.vue";

export default {
  components: {
    SearchInput,
    CommunityTab,
    UserCard,
    Users,
    Search,
  },
  data() {
    return {
      activeTab: "discover",
      currentUser: null,
      searchQuery: "",
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

    // Returns data formatted correctly for display based on active tab
    filteredDisplayList() {
      let sourceData = [];
      let keys = [];

      // 1. Determine Data Source
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

      // 2. Search Logic
      let results = sourceData;
      if (this.searchQuery.trim()) {
        const fuse = new Fuse(sourceData, {
          keys: keys,
          threshold: 0.3,
          includeScore: false,
        });
        results = fuse.search(this.searchQuery).map((result) => result.item);
      }

      return results;
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

    setTab(tabName) {
      this.activeTab = tabName;
      this.searchQuery = "";
    },

    avatarQuery(username) {
      return `https://api.dicebear.com/9.x/identicon/png?seed=${username}&scale=70&backgroundColor=#ffffff`;
    },

    // Helper to normalize data for the UserCard component
    getUserProps(user) {
      if (this.activeTab === "discover") {
        return {
          name: `${user.firstName} ${user.lastName}`,
          username: user.username,
          id: user.id,
        };
      } else if (this.activeTab === "following") {
        return {
          name: user.friendName,
          username: user.friendUsername,
          id: user.id,
        };
      } else {
        // followers
        return {
          name: user.userName,
          username: user.userUsername,
          id: user.id,
        };
      }
    },

    async updateInfo() {
      try {
        await Promise.all([
          this.fetchFollowing(),
          this.fetchFollowers(),
          this.fetchCommunity(),
        ]);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    },

    // SweetAlert Logic
    getSwalConfig(title, text, showCancel = false) {
      return {
        title,
        text,
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
      <CommunityTab :model-value="activeTab" @update:model-value="setTab" />

      <SearchInput
        v-model="searchQuery"
        :placeholder="
          activeTab === 'discover'
            ? 'Procurar novos utilizadores...'
            : 'Pesquisar nas tuas conexões...'
        "
      />

      <div class="space-y-4 mt-6">
        <div class="flex items-center justify-between mb-4 px-2">
          <h3 class="text-xl font-bold font-ProximaNova">
            {{
              activeTab === "discover"
                ? "Pessoas Novas"
                : activeTab === "following"
                ? "A Seguir"
                : "Seguidores"
            }}
            <span class="text-(--secondary-text) text-base font-normal"
              >({{ filteredDisplayList.length }})</span
            >
          </h3>
        </div>

        <div
          v-if="filteredDisplayList.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <UserCard
            v-for="user in filteredDisplayList"
            :key="user.id"
            :name="getUserProps(user).name"
            :username="getUserProps(user).username"
            :avatar-url="avatarQuery(getUserProps(user).username)"
            :action-type="activeTab === 'discover' ? 'add' : 'remove'"
            @action="
              activeTab === 'discover' ? addFriend(user) : removeFriend(user.id)
            "
          />
        </div>

        <div
          v-else
          class="flex flex-col items-center justify-center py-12 bg-(--secondary-bg) rounded-xl border border-(--border) border-dashed"
        >
          <component
            :is="activeTab === 'discover' ? 'Search' : 'Users'"
            class="w-12 h-12 text-(--secondary-text) mb-3 opacity-50"
          />
          <p class="text-(--secondary-text)">
            <span v-if="searchQuery">Nenhum resultado encontrado.</span>
            <span v-else-if="activeTab === 'discover'"
              >Não há ninguém novo por agora.</span
            >
            <span v-else-if="activeTab === 'following'"
              >Ainda não segues ninguém.</span
            >
            <span v-else>Ainda não tens seguidores.</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* ... SweetAlert CSS remains exactly the same as provided ... */
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
