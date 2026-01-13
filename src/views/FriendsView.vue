<script>
import { mapActions, mapState } from "pinia";
import { useFriendStore } from "@/stores/friendStore";
import { useUsersStore } from "@/stores/userStore";
import Fuse from "fuse.js";
import { Users, Search } from "lucide-vue-next";

// Components
import SearchInput from "@/components/SearchInput.vue";
import CommunityTab from "@/components/CommunityTab.vue";
import UserCard from "@/components/cards/CommunityCard.vue";
import { toast, confirmAction } from "@/utils/swal";

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
    };
  },
  computed: {
    ...mapState(useFriendStore, ["availableUsers", "followers", "following"]),

    // Returns data formatted correctly for display based on active tab
    filteredDisplayList() {
      let sourceData = [];
      let keys = [];

      // Data Source
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

      // Search Logic
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

    async addFriend(user) {
      try {
        await this.addFollowing(this.currentUser, user);
        await this.updateInfo();
        toast.fire({
          icon: "success",
          title: "Conexão adicionada!",
        });
      } catch (error) {
        toast.fire({
          icon: "error",
          title: "Erro ao adicionar conexão!",
        });
      }
    },

    async removeFriend(id) {
      await confirmAction(
        "Tens a certeza?",
        "Vais deixar de ser amigo deste utilizador!"
      ).then(async (result) => {
        if (result.isConfirmed) {
          await this.removeFriendship(id);
          await this.updateInfo();
          toast.fire({
            icon: "success",
            title: "Conexão removida!",
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
    class="min-h-screen w-full overflow-auto flex flex-col items-center pb-15 md:pb-0 bg-(--main-bg) text-(--primary-text) transition-colors duration-300"
  >
    <div class="mt-12 mb-8 text-center px-4">
      <h1
        class="text-2xl sm:text-4xl md:text-5xl font-ProximaNova font-bold tracking-tight mb-2"
      >
        Comunidade
      </h1>
      <p class="text-(--secondary-text) text-md md:text-lg">
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
          <Users class="w-12 h-12 text-(--secondary-text) mb-3 opacity-50" />
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

<style></style>
