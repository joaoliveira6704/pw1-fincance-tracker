<template>
  <tr>
    <td class="py-4">{{ firstName }}</td>
    <td class="py-4">{{ lastName }}</td>
    <td class="py-4">{{ username }}</td>
    <td class="py-4">{{ createdAt }}</td>
    <td class="py-4">
      <select
        :value="isAdmin"
        class="text-center p-1"
        @change="onRoleChange($event)"
      >
        <option :value="true">Administrador</option>
        <option :value="false">Comum</option>
      </select>
    </td>
    <td class="py-4 text-center">
      <font-awesome-icon
        icon="fa-solid fa-trash"
        @click="removeUser"
        class="cursor-pointer hover:text-red-500 transition-all duration-300"
      />
    </td>
  </tr>
</template>

<script>
import { confirmAction, toast } from "@/utils/swal";

export default {
  props: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    createdAt: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
    userId: { type: String, required: true },
  },
  methods: {
    onRoleChange(event) {
      const newValue = event.target.value === "true";
      console.log(this.userId, newValue);

      this.$emit("change-role", { id: this.userId, isAdmin: newValue });
    },

    async removeUser() {
      const result = await confirmAction(
        "Tens a certeza?",
        "Esta ação é irreversível!"
      );

      if (result.isConfirmed) {
        this.$emit("removeUser", this.userId);
        toast.fire({
          title: "O utilizador foi removido com sucesso",
          icon: "success",
        });
      }
    },
  },
};
</script>
