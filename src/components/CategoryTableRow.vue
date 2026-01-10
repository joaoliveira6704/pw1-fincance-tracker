<template>
  <tr>
    <td class="py-4">{{ category }}</td>
    <td class="py-4">
      <font-awesome-icon :icon="`fa-solid ` + icon" />
    </td>
    <td class="py-4">
      <font-awesome-icon
        icon="fa-solid fa-pen"
        class="cursor-pointer"
        @click="initEdit"
      />
    </td>
    <td class="py-4">
      <font-awesome-icon icon="fa-solid fa-trash" class="cursor-pointer" />
    </td>
  </tr>
</template>

<script>
import { icon } from "@fortawesome/fontawesome-svg-core";
import EditCategoryModal from "./modal/EditCategoryModal.vue";
import * as api from "@/api/api.js";

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
  },
};
</script>

<style lang="scss" scoped></style>
