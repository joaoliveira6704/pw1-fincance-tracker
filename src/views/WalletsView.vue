<script>
import { useWalletStore } from "@/stores/walletStore";
import WalletCard from "@/components/WalletCard.vue";
import movementModal from "@/components/movementModal.vue";
import { mapStores } from "pinia";
import { getUserId } from "@/utils/session";

export default {
  components: { WalletCard, movementModal },

  computed: {
    ...mapStores(useWalletStore),
  },

  methods: {
    async fetch() {
      await this.walletsStore.fetchWallets();
      console.log(...this.walletsStore.wallets);
    },

    openMovementModal(id) {
      console.log("open modal of wallet: ", id);
    },

    async deleteWallet(id) {
      await this.walletsStore.removeWallet(id);
    },
  },

  async mounted() {
    const userId = getUserId();
    await this.walletsStore.addWallet("carteira teste", "#ffffff", userId);
    this.fetch();
  },
};
</script>

<template>
  <!-- wrapper -->
  <div class="flex flex-col p-5 gap-5">
    <h1>Carteiras</h1>
    <div class="grid grid-cols-3 grid-rows-2 gap-4">
      <WalletCard
        v-for="wallet in this.walletsStore.wallets"
        :id="wallet.id"
        :title="wallet.name"
        :balance="wallet.balance"
        :currency="wallet.currency"
        @open-modal="(id) => this.openMovementModal(id)"
        @delete-wallet="(id) => deleteWallet(id)"
      />
    </div>
  </div>
  <movementModal />
</template>

<style lang="scss" scoped></style>
