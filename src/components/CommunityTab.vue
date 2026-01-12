<script>
import { Search, Eye, Heart } from "lucide-vue-next";

export default {
  name: "CommunityTab",
  components: { Search, Eye, Heart },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      tabs: [
        { id: "discover", label: "Descobrir", icon: "Search" },
        { id: "following", label: "A Seguir", icon: "Eye" },
        { id: "followers", label: "Seguidores", icon: "Heart" },
      ],
    };
  },
  methods: {
    selectTab(id) {
      this.$emit("update:modelValue", id);
    },
  },
};
</script>

<template>
  <div
    class="flex flex-wrap items-center justify-center gap-2 mb-6 p-1.5 rounded-xl bg-(--secondary-bg) border border-(--border) shadow-sm"
  >
    <button
      v-for="tab in tabs"
      :key="tab.id"
      @click="selectTab(tab.id)"
      class="flex items-center gap-2 flex-1 justify-center min-w-[110px] py-2.5 px-4 rounded-lg text-sm font-bold transition-all duration-200 ease-out"
      :class="
        modelValue === tab.id
          ? 'bg-stackrgreen-500 text-stackrblack shadow-md transform scale-[1.02]'
          : 'text-(--secondary-text) hover:text-(--primary-text) hover:bg-(--main-bg)'
      "
    >
      <component :is="tab.icon" class="w-4 h-4" />
      {{ tab.label }}
    </button>
  </div>
</template>
