<script>
import { useFriendStore } from "@/stores/friendStore";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      friendStore: useFriendStore(),
      activeTab: "friends",
      friends: [],
      discoverUsers: [],
    };
  },
  computed: {},
  methods: {
    async updateInfo() {
      await this.friendStore.fetchFriends();
      await this.friendStore.fetchCommunity();
      this.friends = this.friendStore.friends || [];
      this.discoverUsers = this.friendStore.availableUsers || [];
    },

    async addFriend(user) {
      try {
        await this.friendStore.addFriend(user);
      } catch (error) {
        alert("Erro ao adicionar.");
      }
    },

    async removeFriend(id) {
      Swal.fire({
        title: "Tens a certeza?",
        text: "Vais deixar de ser amigo deste utilizador!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.friendStore.removeFriend(id);
        }
      });
    },
  },

  // Carregar os dados automaticamente ao entrar na página
  async created() {
    this.updateInfo();
  },
  async updated() {
    this.updateInfo();
  },
};
</script>

<template>
  <div class="p-2">
    <h1>Comunidade</h1>

    <div class="mb-4">
      <button
        @click="activeTab = 'friends'"
        :class="{ active: activeTab === 'friends' }"
      >
        Amigos
      </button>

      <button
        @click="activeTab = 'discover'"
        :class="{ active: activeTab === 'discover' }"
      >
        Descobrir Pessoas
      </button>
    </div>

    <hr />

    <div v-if="activeTab === 'friends'">
      <h3>A tua lista ({{ friends.length }})</h3>
      <ul>
        <li v-for="friend in friends" :key="friend.id">
          {{ friend.friendUsername }}
          <button @click="removeFriend(friend.id)">Remover</button>
        </li>
      </ul>
      <p v-if="friends.length === 0">Ainda não tens amigos.</p>
    </div>

    <div v-if="activeTab === 'discover'">
      <h3>Pessoas novas ({{ discoverUsers.length }})</h3>
      <ul>
        <li v-for="user in discoverUsers" :key="user.id">
          {{ user.name }} ({{ user.username }})
          <button @click="addFriend(user)">Adicionar</button>
        </li>
      </ul>
      <p v-if="discoverUsers.length === 0">Ninguém novo para adicionar.</p>
    </div>
  </div>
</template>

<style scoped>
div {
  background-color: var(--main-bg-color);
}
button:hover {
  background-color: var(--color-stackrgreen-200);
  color: var(--color-stackrblack);
  cursor: pointer;
}
button.active {
  background-color: var(--color-stackrgreen-500);
  color: var(--color-stackrblack);
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
  padding: 5px;
}
</style>
