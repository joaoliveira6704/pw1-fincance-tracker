<template>
  <div
    class="fixed inset-0 bg-black/50 overflow-y-auto h-full w-full flex justify-center items-center z-50"
  >
    <div
      class="bg-main-bg border-2 border-border rounded-lg shadow-xl p-5 w-full max-w-lg mx-4 relative text-primary-text"
    >
      <button @click="closeModal" class="absolute top-4 right-4 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <h2 class="text-xl font-bold mb-6">Editar Categoria</h2>

      <form @submit.prevent="submitForm" class="flex flex-col gap-4">
        <div class="flex gap-5">
          <div class="flex flex-col flex-1 gap-1">
            <label for="walletName" class="text-sm font-medium"
              >Nome da Categoria</label
            >
            <input
              id="categoryName"
              :placeholder="this.category.label"
              v-model="label"
              @focus="this.errorClass = ``"
              type="text"
              class="border border-gray-300 rounded-md p-2 w-fill focus:ring-2 focus:ring-inner-circle focus:border-white-500 outline-none"
              :class="errorClass"
            />
          </div>
          <div class="flex flex-col gap-3 items-center">
            <label class="text-sm font-medium">Icon</label>
            <div>
              <font-awesome-icon
                v-if="this.icon !== this.defaultIcon"
                icon="fa-solid fa-rotate-left"
                class="fa-xs absolute text-red-500 right-2 cursor-pointer"
                @click="resetIcon"
              />
              <font-awesome-icon :icon="icon" class="fa-2xl" />
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-1">
          <label for="initialAmount" class="text-sm font-medium"
            >Procurar Icons</label
          >
          <input
            id="icon"
            type="text"
            v-model="iconQuery"
            class="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div
          class="grid grid-cols-3 rounded-md border h-36 overflow-auto gap-2 p-2"
        >
          <div
            v-if="this.isEmpty"
            class="col-span-3 row-span-2 flex flex-col justify-center items-center gap-2"
          >
            <font-awesome-icon
              icon="fa-solid fa-triangle-exclamation"
              class="fa-2xl"
            />
            <h1>Não foram encontrados icons</h1>
          </div>
          <IconCard
            v-for="item in filteredIconList"
            :icon="item"
            :is-active="activeIcon === item"
            @set-icon="setNewIcon"
            @set-default="setDefaultIcon"
          />
        </div>

        <div class="flex justify-end gap-3 mt-4">
          <Button variant="outline" @click="closeModal"> Cancelar </Button>
          <button
            type="submit"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Salvar alterações
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import * as swal from "@/utils/swal.js";
import Fuse from "fuse.js";

import IconCard from "../IconCard.vue";
import { useCategoryStore } from "@/stores/categoryStore";
import { mapActions } from "pinia";

export default {
  data() {
    return {
      defaultIcon: this.category.icon,
      icon: "fa-globe",
      label: "",
      iconQuery: "",
      isEmpty: false,
      activeIcon: null,
      errorClass: "",
    };
  },

  components: {
    IconCard,
  },

  methods: {
    ...mapActions(useCategoryStore, ["checkDuplicate"]),

    resetIcon() {
      this.activeIcon = this.defaultIcon;
      this.icon = this.defaultIcon;
    },

    setNewIcon(value) {
      this.icon = value;
      this.activeIcon = value;
    },

    setDefaultIcon() {
      (this.activeIcon = null), (this.icon = this.category.icon);
      console.log("setDefaultIcon");
    },

    submitForm() {
      if (this.checkDuplicate(this.label)) {
        this.errorClass = "border-red-500";
      } else {
        swal
          .confirmAction(
            "Editar Categoria",
            "Tem a certeza que pretende salvar mudanças?"
          )
          .then((result) => {
            if (result.isConfirmed) {
              if (this.label == "") this.label = this.category.label;
              this.$emit("submitData", {
                id: this.category.id,
                icon: `fa-solid fa-${this.icon}`,
                label: this.label,
              });
              this.closeModal();
            }
          });
      }
    },

    closeModal() {
      this.$emit("closeModal");
    },
  },

  props: {
    isOpen: {
      type: String,
      required: true,
    },

    category: {
      type: Object,
      required: true,
    },

    iconsLibrary: {
      type: Array,
      required: true,
    },
  },

  watch: {
    iconQuery() {
      if (this.iconQuery == "") this.isEmpty = false;
      console.log(this.filteredIconList);
    },

    category: {
      handler(category) {
        if (category) {
          this.icon = this.category.icon;
        }
      },
      immediate: true,
      deep: true,
    },
  },

  computed: {
    filteredIconList() {
      const fuse = new Fuse(this.iconsLibrary, {
        threshold: 0.3,
      });
      const result = fuse.search(this.iconQuery).map((icon) => icon.item);
      if (!this.iconQuery.length) {
        return this.iconsLibrary;
      }

      if (!result.length) {
        this.isEmpty = true;
        return [];
      }

      if (result.length) {
        this.isEmpty = false;
        return result;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
