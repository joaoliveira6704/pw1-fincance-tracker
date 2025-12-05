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
      alertIcon: `
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 16h.01"/><path d="M12 8v4"/>
          <path d="M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z"/>
        </svg>
      `,
    };
  },
  methods: {
    async updateInfo() {
      try {
        await this.friendStore.fetchFriends();
        await this.friendStore.fetchCommunity();
        this.friends = this.friendStore.friends || [];
        this.discoverUsers = this.friendStore.availableUsers || [];
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
        await this.friendStore.addFriend(user);
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
          await this.friendStore.removeFriend(id);
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
  },
};
</script>

<template>
  <div class="flex flex-col gap-y-15 text-center w-full">
    <h1 class="text-4xl mt-10 font-ProximaNova">Comunidade</h1>
    <div class="p-2 wrapper mx-50">
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
            <button class="action-btn remove" @click="removeFriend(friend.id)">
              Remover
            </button>
          </li>
        </ul>
        <p v-if="friends.length === 0">Ainda não tens amigos.</p>
      </div>

      <div v-if="activeTab === 'discover'">
        <h3>Pessoas novas ({{ discoverUsers.length }})</h3>
        <ul>
          <li v-for="user in discoverUsers" :key="user.id">
            {{ user.name }} ({{ user.username }})
            <button class="action-btn add" @click="addFriend(user)">
              Adicionar
            </button>
          </li>
        </ul>
        <p v-if="discoverUsers.length === 0">Ninguém novo para adicionar.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  background-color: var(--main-bg-color);
}
button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.2s;
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

/* List Action Buttons */
.action-btn {
  font-size: 0.9rem;
  padding: 5px 10px;
}
.action-btn.remove {
  background-color: #fee2e2;
  color: #ef4444;
}
.action-btn.remove:hover {
  background-color: #ef4444;
  color: white;
}
.action-btn.add {
  background-color: #dcfce7;
  color: #16a34a;
}
.action-btn.add:hover {
  background-color: #16a34a;
  color: white;
}

ul {
  list-style: none;
  padding: 0;
}
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
  padding: 10px;
}
</style>

<style>
/* POPUP */
.stackr-swal-popup {
  background-color: light-dark(#ffff, #0000) !important;
  border: 1px solid #333;
  border-radius: 16px !important;
  padding: 2rem !important;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5) !important;
}

/* TITULO */
.stackr-swal-title {
  color: var(--primary-color) !important;
  font-family: var(--font-ProximaNova);
  font-size: 1.5rem !important;
  font-weight: 700 !important;
}

/* TEXTO */
.stackr-swal-text {
  color: var(--primary-color) !important; /* Gray text */
  font-size: 1rem !important;
}

/* ICON */
.stackr-swal-icon {
  border: none !important; /* Removes the default circle border */
  margin-bottom: 1rem !important;
}

/* CONTAINER BTNS */
.stackr-swal-actions {
  gap: 12px;
  width: 100%;
}

/* BTN CONFIRMAR */
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
  border: 1px solid #4b5563 !important;
  color: #d1d5db !important;
  padding: 12px 24px !important;
  border-radius: 8px !important;
  font-weight: 500 !important;
  font-size: 1rem !important;
  cursor: pointer;
  transition: all 0.2s;
}
.stackr-swal-cancel:hover {
  background-color: #374151 !important;
  color: #fff !important;
}
</style>
