<script>
import { Plus, Minus, Trash2, Wallet } from "lucide-vue-next";
import { confirmAction, inputAmountAlert, toast } from "@/utils/swal";
import Button from "./Button.vue";

export default {
  name: "WalletCard",
  components: {
    Plus,
    Minus,
    Trash2,
    Wallet,
    Button,
  },
  emits: ["view-wallet"],
  props: {
    wallet: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedBalance() {
      return new Intl.NumberFormat("pt-PT", {
        style: "currency",
        currency: "EUR",
      }).format(this.wallet.balance || 0);
    },
  },
  methods: {
    movement(moveType) {
      const actionMap = {
        contribute: "Contribuir",
        deposit: "Depositar",
        withdraw: "Levantar",
      };

      const actionText = actionMap[moveType];

      inputAmountAlert(moveType, actionText).then((result) => {
        const value = parseFloat(result.value);
        if (result.isConfirmed && value > 0) {
          this.$emit("movement", [
            this.wallet.id,
            moveType === "deposit" ? value : -value,
            moveType,
          ]);
          toast.fire({
            icon: "success",
            title: "Transação efetuada!",
          });
        }
      });
    },

    deleteWallet() {
      confirmAction(
        "Tens a certeza?",
        "Vais apagar esta carteira para sempre!"
      ).then(async (result) => {
        if (result.isConfirmed) {
          this.$emit("deleteWallet", this.wallet.id);
        }
      });
    },
  },
};
</script>

<template>
  <div
    class="group flex flex-col p-5 rounded-2xl bg-secondary-bg border hover:border-stackrgreen-500! cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md h-full"
    :style="{ borderColor: wallet.color }"
    @click="$emit('view-wallet', wallet)"
  >
    <div class="flex justify-between items-start mb-6">
      <div
        class="p-3 rounded-xl bg-main-bg shadow-sm border border-border transition-colors duration-300"
        :style="{ color: wallet.color }"
      >
        <Wallet class="w-6 h-6" />
      </div>
      <div class="text-right">
        <span
          class="block font-ProximaNova font-bold text-xl text-primary-text"
        >
          {{ formattedBalance }}
        </span>
        <span
          class="text-[10px] font-bold text-secondary-text uppercase tracking-widest"
        >
          Saldo Disponível
        </span>
      </div>
    </div>

    <div class="mb-6 flex-grow">
      <h3 class="font-ProximaNova font-bold text-lg text-primary-text truncate">
        {{ wallet.name }}
      </h3>
    </div>

    <div class="mt-auto pt-4 border-t border-border grid grid-cols-3 gap-2">
      <Button
        variant="outline"
        class="!px-0 !py-2 w-full flex items-center justify-center hover:!bg-stackrgreen-500 hover:!border-stackrgreen-500 hover:!text-white"
        title="Depositar"
        @click.stop="movement('deposit')"
      >
        <Plus class="w-4 h-4" />
      </Button>

      <Button
        variant="outline"
        class="!px-0 !py-2 w-full flex items-center justify-center hover:!bg-yellow-500 hover:!border-yellow-500 hover:!text-white"
        title="Levantar"
        @click.stop="movement('withdraw')"
      >
        <Minus class="w-4 h-4" />
      </Button>

      <Button
        variant="outline"
        class="!px-0 !py-2 w-full flex items-center justify-center hover:!bg-red-500 hover:!border-red-500 hover:!text-white"
        title="Eliminar"
        @click.stop="deleteWallet"
      >
        <Trash2 class="w-4 h-4" />
      </Button>
    </div>
  </div>
</template>

<style scoped>
button:hover svg {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}
</style>
