<template>
  <div
    class="fixed inset-0 bg-black/50 overflow-y-auto h-full w-full flex justify-center items-center z-50"
  >
    <div
      class="bg-main-bg border-2 border-border rounded-lg shadow-xl p-5 w-full max-w-lg mx-4 relative text-primary-text"
    >
      <button @click="closeModal" class="absolute top-4 right-4">
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

      <h2 class="text-xl font-bold mb-6" @click="changeIcon">
        Editar Categoria
      </h2>

      <form @submit.prevent="submitForm" class="flex flex-col gap-4">
        <div class="flex gap-5">
          <div class="flex flex-col flex-1 gap-1">
            <label for="walletName" class="text-sm font-medium"
              >Nome da Categoria</label
            >
            <input
              id="categoryName"
              :placeholder="this.category.label"
              type="text"
              class="border border-gray-300 rounded-md p-2 w-fill focus:ring-2 focus:ring-inner-circle focus:border-stackr-green outline-none"
              required
            />
          </div>
          <div class="flex flex-col gap-3 items-center">
            <label class="text-sm font-medium">Icon</label>
            <div>
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
          <IconCard
            v-for="item in iconLibrary"
            :icon="item"
            @set-icon="setNewIcon"
          />
        </div>

        <div class="flex justify-end gap-3 mt-4">
          <Button variant="outline"> Cancelar </Button>
          <Button
            variant="fill"
            type="submit"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Salvar alterações
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import IconCard from "../IconCard.vue";
import { library } from "@fortawesome/fontawesome-svg-core";

export default {
  data() {
    return {
      icon: "fa-globe",
      iconQuery: "",
    };
  },

  components: {
    IconCard,
  },

  computed: {
    iconLibrary() {
      let list = [];

      for (const [key] of Object.entries(library.definitions.fas)) {
        list.push(key);
      }

      return [...list];
    },
  },

  methods: {
    setNewIcon(value) {
      this.icon = value;
    },

    testeCycle() {
      for (let item of this.iconList) {
        console.log(item);
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
  },

  watch: {
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
};
</script>

<style lang="scss" scoped></style>
