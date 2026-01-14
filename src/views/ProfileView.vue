<script>
import Button from "@/components/Button.vue";
import Skeleton from "@/components/skeletons/ProfileSkeleton.vue";
import ProfileCard from "@/components/cards/ProfileCard.vue";
import ProfileFeed from "@/components/ProfileFeed.vue";
import { useAuthStore } from "@/stores/authStore";
import { useUsersStore } from "@/stores/userStore";
import { useLogStore } from "@/stores/logStore";
import { mapActions, mapState } from "pinia";
import Swal from "sweetalert2";
import { getUserId } from "@/utils/session";
import { confirmAction, toast } from "@/utils/swal";
import EditProfileModal from "@/components/modal/EditProfileModal.vue";

export default {
  components: {
    Button,
    Skeleton,
    ProfileCard,
    ProfileFeed,
    EditProfileModal,
  },
  data() {
    return {
      user: {},
      error: null,
      isLoading: false,
      isEditModalOpen: false,
      alertIcon: `
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 16h.01"/><path d="M12 8v4"/>
          <path d="M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z"/>
        </svg>
      `,
    };
  },
  computed: {
    ...mapState(useUsersStore, ["users"]),
    ...mapState(useLogStore, ["logs"]),

    sortedLogs() {
      return [...(this.logs || [])].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    },
  },
  methods: {
    ...mapActions(useLogStore, ["fetchUserLogs", "addNewLog"]),
    ...mapActions(useUsersStore, [
      "fetchUsers",
      "fetchLoggedUser",
      "fetchUserByUsername",
      "updateUser",
    ]),
    ...mapActions(useAuthStore, ["logout"]),

    logoutUser() {
      confirmAction(
        "Tens a certeza?",
        "Vais ter de iniciar sessão novamente!"
      ).then(async (result) => {
        if (result.isConfirmed) {
          this.logout();
        }
      });
    },

    handleEditModal() {
      this.isEditModalOpen = true;
    },

    // --- LÓGICA PELO USERNAME ---
    async loadProfileData() {
      this.isLoading = true;
      this.error = null;
      // Resetar o user para evitar mostrar dados antigos enquanto carrega
      this.user = {};

      try {
        const username = this.$route.params.username;

        if (username) {
          const usersFound = await this.fetchUserByUsername(username);

          if (usersFound && usersFound.length > 0) {
            this.user = usersFound[0];
          } else {
            throw new Error("Utilizador não encontrado");
          }
        } else {
          this.user = await this.fetchLoggedUser();
        }

        // Validação extra antes de buscar logs
        if (this.user && this.user.id) {
          await this.fetchUserLogs(this.user.id);
        } else {
          if (!this.error) this.error = "Erro ao carregar dados do utilizador.";
        }
      } catch (e) {
        this.error = e.message || "Falha ao carregar o perfil.";
        console.error("Erro no loadProfileData:", e);
      } finally {
        this.isLoading = false;
      }
    },

    async handleSaveEdit(user) {
      const newUser = await this.updateUser(user);
      await this.addNewLog(user.id, "user", user.id, "edit", null);
      this.user = newUser;
      this.isEditModalOpen = false;
      toast.fire({
        icon: "success",
        title: "Perfil Atualizado!",
      });
    },
  },
  async created() {
    this.isLoading = true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await this.fetchUsers();
    this.isLoading = false;
  },

  watch: {
    // Observa a mudança do parâmetro 'username'
    "$route.params.username": {
      handler: "loadProfileData",
      immediate: true,
    },
  },
};
</script>

<template>
  <div class="w-full min-h-screen overflow-auto bg-main-bg">
    <div v-if="isLoading">
      <Skeleton />
    </div>

    <div v-else class="flex flex-col items-center">
      <ProfileCard :user="user" @logout="logoutUser" @edit="handleEditModal" />

      <ProfileFeed
        v-if="user.preferences?.private ?? false"
        :logs="sortedLogs"
      />
      <h1 v-else>O perfil deste utilizador é privado.</h1>
    </div>
  </div>
  <EditProfileModal
    :user="user"
    :is-open="isEditModalOpen"
    @close="isEditModalOpen = false"
    @save="handleSaveEdit"
    :users="users"
  />
</template>

<style></style>
