<script>
import { Search, X } from "lucide-vue-next";

export default {
  name: "SearchInput",
  components: { Search, X },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "Pesquisar...",
    },
  },
  emits: ["update:modelValue"],
};
</script>

<template>
  <div class="relative w-full max-w-md mx-auto mb-6">
    <div
      class="relative flex items-center w-full h-12 rounded-xl focus-within:shadow-lg bg-(--secondary-bg) border border-(--border) overflow-hidden transition-all duration-200 focus-within:border-stackrgreen-500/50"
    >
      <div class="grid place-items-center h-full w-12 text-(--secondary-text)">
        <Search class="w-5 h-5" />
      </div>

      <input
        class="peer h-full w-full outline-none text-sm text-(--primary-text) bg-transparent pr-10 placeholder-(--secondary-text) font-ProximaNova"
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
      />

      <button
        v-if="modelValue"
        @click="$emit('update:modelValue', '')"
        class="absolute right-3 p-1 rounded-full hover:bg-(--main-bg) text-(--secondary-text) transition-colors"
      >
        <X class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>
