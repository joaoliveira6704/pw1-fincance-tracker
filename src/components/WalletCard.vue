<template>
  <div
    class="flex flex-col"
    @mouseenter="this.isHovering = true"
    @mouseleave="this.isHovering = false"
  >
    <div
      class="flex justify-between items-center bg-stackrgreen-500 p-5 rounded-md h-30 w-60"
    >
      <div class="flex flex-col justify-between h-full">
        <h1>{{ title }}</h1>
        <h2>{{ balance }} {{ currency }}</h2>
      </div>
      <div class="flex flex-col py-4 gap-4 h-fit" v-show="isHovering">
        <i class="pi pi-download" @click="movement(`in`)"></i>
        <i class="pi pi-upload" @click="movement(`out`)"></i>
        <i class="pi pi-trash" @click="deleteWallet"></i>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  props: {
    id: String,
    title: String,
    balance: Number,
    currency: String,
    color: String,
  },
  data() {
    return {
      isHovering: false,

      movementToast: Swal.mixin({
        toast: true,
        position: "bottom",
        customClass: {
          popup: "mb-50",
        },
        showConfirmButton: false,
        timer: 2000,
      }),
    };
  },
  methods: {
    movement(moveType) {
      Swal.fire({
        theme: "auto",
        inputLabel: `Insira quantia a ser ${
          moveType === "in" ? "depositada" : "levantada"
        }:`,
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed && result.value > 0) {
          this.$emit("movement", [
            this.id,
            moveType == "in" ? +Number(result.value) : -Number(result.value),
          ]);
          this.movementToast.fire({
            icon: "success",
            text: "A operação foi concluida",
          });
        }
        if (result.isDenied || result.isDismissed) {
          this.movementToast.fire({
            icon: "warning",
            text: "A operação foi cancelada",
          });
        }
      });
    },

    deleteWallet() {
      this.$emit("deleteWallet", this.id);
    },
  },
};
</script>

<style lang="scss" scoped></style>
