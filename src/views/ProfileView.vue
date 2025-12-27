<script>
import Button from "@/components/Button.vue";
import Skeleton from "@/components/skeletons/ProfileSkeleton.vue";
import ProfileCard from "@/components/cards/ProfileCard.vue";
import { useAuthStore } from "@/stores/authStore";
import { useUsersStore } from "@/stores/userStore";
import { mapActions, mapState, mapStores } from "pinia";
import Swal from "sweetalert2";

export default {
  components: {
    Button,
    Skeleton,
    ProfileCard,
  },
  data() {
    return {
      user: {},
      error: null,
      alertIcon: `
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 16h.01"/><path d="M12 8v4"/>
          <path d="M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z"/>
        </svg>
      `,
    };
  },
  computed: {
    ...mapState(useUsersStore, ["loading"]),
  },
  methods: {
    ...mapActions(useUsersStore, ["fetchLoggedUser"]),
    ...mapActions(useAuthStore, ["logout"]),
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
    logoutUser() {
      Swal.fire(
        this.getSwalConfig(
          "Tens a certeza?",
          "Vais ter de iniciar sessão novamente!",
          true
        )
      ).then(async (result) => {
        if (result.isConfirmed) {
          this.logout();
        }
      });
    },
  },
  async created() {
    try {
      this.user = await this.fetchLoggedUser();
    } catch (e) {
      this.error = "Failed to load profile.";
      console.error(e);
    }
  },
};
</script>

<template>
  <div class="w-full min-h-screen">
    <div v-if="loading">
      <Skeleton />
    </div>

    <div
      v-else-if="error"
      class="w-full max-w-3xl mx-auto p-4 rounded-lg bg-red-100 border border-red-300 text-red-700 text-center"
    >
      <i class="pi pi-exclamation-triangle mr-2"></i>
      {{ error }}
    </div>

    <div v-else class="flex justify-center">
      <ProfileCard :user="user" @logout="logoutUser" />
    </div>
  </div>
</template>

<style>
/* POPUP */
.stackr-swal-popup {
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
