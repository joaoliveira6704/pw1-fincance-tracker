<template>
  <tr>
    <td class="py-4">{{ category }}</td>
    <td class="py-4">
      <font-awesome-icon :icon="icon" />
    </td>
    <td class="py-4">
      <font-awesome-icon
        icon="fa-solid fa-pen"
        class="cursor-pointer"
        @click="initEdit"
      />
    </td>
    <td class="py-4">
      <font-awesome-icon
        icon="fa-solid fa-trash"
        class="cursor-pointer"
        @click="initRemove"
      />
    </td>
  </tr>
</template>

<script>
import { icon } from "@fortawesome/fontawesome-svg-core";
import * as swal from "@/utils/swal.js";

export default {
  data() {
    return {};
  },

  props: {
    id: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },

  methods: {
    editCategory() {
      console.log(this.id);
    },

    initEdit() {
      this.$emit("initEdit", this.id);
    },

    initRemove() {
      if (this.category !== "Outros") {
        swal
          .confirmAction(
            "Remover Categoria",
            "Tem a certeza que pretende apagar esta categoria? (categorias associadas serão transferidas para `Outros`)"
          )
          .then((result) => {
            if (result.isConfirmed) {
              this.$emit("initRemoval", this.id);
            }
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
