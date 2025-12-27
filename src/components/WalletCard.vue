<template>
  <div
    class="flex flex-col drop-shadow-md"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <div
      class="flex justify-between items-center p-5 rounded-md border-2 bg-navbar-bg h-32 w-full transition-all duration-200"
      :style="{ borderColor: wallet.color }"
    >
      <div class="flex flex-col justify-between h-full text-primary">
        <h1 class="font-bold text-lg">{{ wallet.name }}</h1>
        <h2>{{ wallet.balance }} {{ wallet.currency }}</h2>
      </div>

      <div
        class="flex flex-col py-4 gap-4 h-fit bg-white/20 p-2 rounded-lg backdrop-blur-sm"
        v-show="isHovering"
      >
        <i
          class="pi pi-download cursor-pointer hover:text-green-300 hover:scale-110 transition"
          title="Adicionar"
          @click="movement('in')"
        ></i>
        <i
          class="pi pi-upload cursor-pointer hover:text-yellow-300 hover:scale-110 transition"
          title="Retirar"
          @click="movement('out')"
        ></i>
        <i
          class="pi pi-trash cursor-pointer hover:text-red-500 hover:scale-110 transition"
          title="Apagar Carteira"
          @click="deleteWallet"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "WalletCard",
  props: {
    wallet: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isHovering: false,
      movementToast: Swal.mixin({
        toast: true,
        position: "bottom",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      }),
      alertIcon: `
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      `,
    };
  },
  methods: {
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
    movement(moveType) {
      const actionText = moveType === "in" ? "depositar" : "levantar";

      Swal.fire({
        title: moveType === "in" ? "Depósito" : "Levantamento",
        text: `Insira quantia a ${actionText}:`,
        input: "number",
        inputAttributes: {
          min: "0",
          step: "0.01",
        },
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      }).then((result) => {
        const value = parseFloat(result.value);

        if (result.isConfirmed && value > 0) {
          this.$emit("movement", [
            this.wallet.id,
            moveType === "in" ? value : -value,
          ]);

          this.movementToast.fire({
            icon: "success",
            title: "Sucesso!",
            text: "A operação foi concluida",
          });
        } else if (result.isDismissed) {
          return;
        }
      });
    },

    deleteWallet() {
      Swal.fire(
        this.getSwalConfig("Tens a certeza?", "Esta ação é irreversível!", true)
      ).then(async (result) => {
        if (result.isConfirmed) {
          this.$emit("deleteWallet", this.wallet.id);
          Swal.fire({
            ...this.getSwalConfig(
              "Sucesso!",
              "A carteira foi removida com sucesso."
            ),
            icon: "success",
            iconHtml: undefined,
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
