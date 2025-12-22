<script>
import { useWalletStore } from "@/stores/walletStore";
import WalletCard from "@/components/WalletCard.vue";
import { mapStores } from "pinia";

export default {
  components: { WalletCard },

  computed: {
    ...mapStores(useWalletStore),
  },

  methods: {
    async teste() {
      console.log(this.walletStore);
    },

    async fetch() {
      await this.walletsStore.fetchWallets();
      console.log(...this.walletsStore.wallets);
    },
  },

  mounted() {
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
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
