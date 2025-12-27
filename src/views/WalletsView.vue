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

    async walletMovement(data) {
      const [id, amount] = data;
      console.log(id, amount);
      await this.walletsStore.moveBalance(id, amount);
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
        :balance="Number(wallet.balance)"
        :currency="wallet.currency"
        @movement="(data) => this.walletMovement(data)"
        @delete-wallet="(id) => deleteWallet(id)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
