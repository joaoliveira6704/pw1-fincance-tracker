<script>
import { useWalletStore } from "@/stores/walletStore";
import { mapActions, mapState } from "pinia";
import { getUserId } from "@/utils/session";
import WalletCard from "@/components/WalletCard.vue";
import Button from "@/components/Button.vue";
import CreateWalletModal from "@/components/modal/CreateWalletModal.vue";
import { PlusCircle, Wallet } from "lucide-vue-next";
import { useLogStore } from "@/stores/logStore";
import { formattedDate, formattedIncome } from "@/utils/utils";
import { toast } from "@/utils/swal";
import ViewWalletModal from "../modal/ViewWalletModal.vue";

export default {
  components: {
    WalletCard,
    Button,
    CreateWalletModal,
    PlusCircle,
    Wallet,
    ViewWalletModal,
  },

  data() {
    return {
      showCreateModal: false,
      selectedWallet: null,
      isOpen: false,
    };
  },

  computed: {
    ...mapState(useWalletStore, ["wallets"]),
    totalWalletAmount() {
      return formattedIncome(
        this.wallets.reduce((sum, item) => sum + (Number(item.balance) || 0), 0)
      );
    },
  },

  methods: {
    ...mapActions(useWalletStore, [
      "fetchWallets",
      "addWallet",
      "moveBalance",
      "removeWallet",
    ]),
    ...mapActions(useLogStore, ["addNewLog", "fetchUserLogs"]),

    async handleCreateWallet(formData) {
      const userId = getUserId();

      await this.addWallet(
        formData.name,
        formData.color,
        userId,
        formData.initialAmount
      );

      await this.addNewLog(
        userId,
        "wallet",
        null,
        "create",
        formData.initialAmount
      );

      this.showCreateModal = false;
      toast.fire({
        icon: "success",
        title: "Carteira Criada!",
      });
    },

    handleViewWallet(wallet) {
      this.selectedWallet = wallet;
      this.isOpen = true;
    },

    async walletMovement(data) {
      const [id, amount, type] = data;
      await this.moveBalance(id, amount);
      console.log(type);

      let label = type === "withdraw" ? "Levantaste" : "Depositaste";
      toast.fire({
        icon: "success",
        title: `${label} ${formattedIncome(Math.abs(amount))}!`,
      });

      await this.addNewLog(getUserId(), "wallet", id, type, Math.abs(amount));
    },

    async deleteWallet(id) {
      await this.removeWallet(id);

      await this.addNewLog(getUserId(), "wallet", id, "remove", null);
      toast.fire({
        icon: "success",
        title: "Carteira Removida!",
      });
    },
  },

  async mounted() {
    await this.fetchWallets();
    await this.fetchUserLogs(getUserId());
  },
};
</script>

<template>
  <div class="w-full max-w-7xl mx-auto p-0 md:p-6 text-primary-text">
    <div
      class="flex flex-col sm:flex-row justify-between items-center md:items-end mb-6 gap-4 border-b border-border pb-6"
    >
      <div>
        <h1
          class="text-2xl sm:text-3xl md:text-4xl font-ProximaNova font-bold mb-2"
        >
          As tuas Carteiras
        </h1>
        <p class="text-secondary-text text-sm md:text-base font-Roboto">
          Gere e visualiza todos as tuas carteiras num só lugar.
        </p>
      </div>

      <div
        v-if="wallets.length > 0"
        class="bg-secondary-bg border border-border px-6 py-4 rounded-xl shadow-sm flex items-center gap-4 min-w-[200px]"
      >
        <div class="p-2 bg-stackrgreen-500/10 rounded-full">
          <Wallet class="w-6 h-6 text-stackrgreen-500" />
        </div>
        <div>
          <p
            class="text-xs text-secondary-text uppercase font-bold tracking-wider"
          >
            Total
          </p>
          <p class="text-2xl font-ProximaNova font-bold text-primary-text">
            {{ totalWalletAmount }}
          </p>
        </div>
      </div>
    </div>

    <div
      v-if="wallets.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6"
    >
      <WalletCard
        v-for="wallet in wallets"
        :key="wallet.id"
        :wallet="wallet"
        @movement="walletMovement"
        @delete-wallet="deleteWallet"
        @view-wallet="handleViewWallet"
      />
    </div>

    <div
      v-else
      class="flex flex-col items-center justify-center py-20 px-4 text-center bg-secondary-bg rounded-2xl border border-dashed border-border mt-4"
    >
      <div class="bg-main-bg p-4 rounded-full mb-4 shadow-sm">
        <Wallet class="w-12 h-12 text-secondary-text opacity-50" />
      </div>
      <h3 class="text-xl font-ProximaNova font-bold text-primary-text mb-2">
        Nenhuma carteira
      </h3>
    </div>

    <ViewWalletModal
      :is-open="isOpen"
      :logs="logs"
      :wallet="selectedWallet"
      @close="isOpen = false"
    />
  </div>
</template>

<style></style>
