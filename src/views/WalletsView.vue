<script>
import { useWalletStore } from "@/stores/walletStore";
import { mapActions, mapState } from "pinia";
import { getUserId } from "@/utils/session";
import WalletCard from "@/components/WalletCard.vue";
import Button from "@/components/Button.vue";
import Swal from "sweetalert2";
import CreateWalletModal from "@/components/modal/CreateWalletModal.vue";

export default {
  components: {
    WalletCard,
    Button,
    CreateWalletModal,
  },

  data() {
    return {
      showCreateModal: false,
    };
  },

  computed: {
    ...mapState(useWalletStore, ["wallets"]),
  },

  methods: {
    ...mapActions(useWalletStore, [
      "fetchWallets",
      "addWallet",
      "moveBalance",
      "removeWallet",
    ]),

    async fetch() {
      await this.fetchWallets();
    },

    async handleCreateWallet(formData) {
      console.log("Creating wallet:", formData);
      const userId = getUserId();

      await this.addWallet(
        formData.name,
        formData.color,
        userId,
        formData.initialAmount
      );

      this.showCreateModal = false;
    },

    async walletMovement(data) {
      const [id, amount] = data;
      await this.moveBalance(id, amount);
    },

    async deleteWallet(id) {
      await this.removeWallet(id);
    },
  },

  async mounted() {
    await this.fetch();
  },
};
</script>

<template>
  <div class="max-h-screen w-full p-8" style="background-color: var(--main-bg)">
    <header class="flex justify-between items-center mb-8">
      <h1 class="text-xl text-primary-text font-medium">Carteiras</h1>
      <Button @click="showCreateModal = true" variant="outline"
        ><Plus class="text-primary-text" />
        <p class="text-primary-text">Adicionar</p></Button
      >
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <WalletCard
        v-for="wallet in wallets"
        :key="wallet.id"
        :wallet="wallet"
        @movement="walletMovement"
        @delete-wallet="deleteWallet"
      />
    </div>

    <CreateWalletModal
      :isOpen="showCreateModal"
      @close="showCreateModal = false"
      @create-wallet="handleCreateWallet"
    />
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
