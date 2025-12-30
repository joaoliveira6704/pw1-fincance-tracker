<template>
  <tr class="border-b dark:border-neutral-600">
    <td class="py-4">{{ firstName }}</td>
    <td class="py-4">{{ lastName }}</td>
    <td class="py-4">{{ username }}</td>
    <td class="py-4">{{ createdAt }}</td>
    <td class="py-4">{{ isAdmin }}</td>
    <td class="py-4"><i class="pi pi-trash" @click="deleteUser"></i></td>
  </tr>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      deleteToast: Swal.mixin({
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
  props: {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    createdAt: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      required: true,
    },

    userId: {
      type: String,
      required: true,
    },
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

    deleteUser() {
      Swal.fire(
        this.getSwalConfig("Tens a certeza?", "Esta ação é irreversível!", true)
      ).then(async (result) => {
        if (result.isConfirmed) {
          this.$emit("deleteUser", this.userId);
          Swal.fire({
            ...this.getSwalConfig(
              "Sucesso",
              "O utilizador foi removido com sucesso"
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
