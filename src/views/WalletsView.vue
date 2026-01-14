<script>
import { useWalletStore } from "@/stores/walletStore";
import { mapActions, mapState } from "pinia";
import { getUserId } from "@/utils/session";
import WalletCard from "@/components/WalletCard.vue";
import Button from "@/components/Button.vue";
import CreateWalletModal from "@/components/modal/CreateWalletModal.vue";
import { PlusCircle } from "lucide-vue-next";
import { useLogStore } from "@/stores/logStore";
import { formattedDate, formattedIncome } from "@/utils/utils";
import { toast } from "@/utils/swal";
import WalletList from "@/components/lists/WalletList.vue";
import WalletsSkeleton from "@/components/skeletons/WalletsSkeleton.vue";

export default {
  components: {
    WalletCard,
    Button,
    CreateWalletModal,
    PlusCircle,
    WalletList,
    WalletsSkeleton,
  },

  data() {
    return {
      showCreateModal: false,
      isLoading: false,
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
    ...mapActions(useLogStore, ["addNewLog"]),

    async handleCreateWallet(formData) {
      const userId = getUserId();

      const newWallet = await this.addWallet(
        formData.name,
        formData.color,
        userId,
        formData.initialAmount
      );

      await this.addNewLog(
        userId,
        "wallet",
        newWallet.id,
        "create",
        formData.initialAmount
      );

      this.showCreateModal = false;
      toast.fire({
        icon: "success",
        title: "Carteira Criada!",
      });
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
    this.isLoading = true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await this.fetchWallets();
    this.isLoading = false;
  },
};
</script>

<template>
  <WalletsSkeleton v-if="isLoading" />
  <div
    v-else
    class="w-full min-h-screen overflow-auto bg-main-bg text-primary-text pb-10 md:pb-0"
  >
    <div class="max-w-7xl mx-auto px-4 flex flex-col gap-y-10 text-center">
      <div class="mt-8">
        <h1 class="text-4xl md:text-5xl font-bold font-ProximaNova mb-4">
          Carteiras
        </h1>
        <Button @click="showCreateModal = true" variant="fill" class="gap-2">
          <PlusCircle class="w-5 h-5" />
          Adicionar Carteira
        </Button>
      </div>
      <WalletList />
    </div>
  </div>
  <CreateWalletModal
    :isOpen="showCreateModal"
    @close="showCreateModal = false"
    @create-wallet="handleCreateWallet"
  />
</template>

<style></style>
