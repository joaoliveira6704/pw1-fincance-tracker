<script>
import { useThemeStore } from "@/stores/themeStore";
import { Sun, Moon } from "lucide-vue-next";
import { mapActions, mapState } from "pinia";

export default {
  components: { Sun, Moon },
  props: {
    variant: {
      type: String,
      default: "navbar",
    },
  },
  computed: {
    ...mapState(useThemeStore, ["darkMode"]),
    isLanding() {
      return this.variant === "landing";
    },
  },
  methods: {
    // We only map the action. The store handles the rest.
    ...mapActions(useThemeStore, ["toggleColorMode"]),
  },
};
</script>

<template>
  <button
    v-if="!isLanding && variant === 'navbarOpen'"
    @click="toggleColorMode"
    class="relative notLanding flex h-8 w-16 cursor-pointer items-center rounded-full bg-gray-200 p-1 shadow-inner transition-colors duration-300 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
  >
    <span
      class="absolute left-1.5 flex items-center justify-center text-primary"
    >
      <Sun class="h-4 w-4" />
    </span>
    <span
      class="absolute right-1.5 flex items-center justify-center text-primary"
    >
      <Moon class="h-4 w-4" />
    </span>
    <span
      class="z-10 h-6 w-6 rounded-full shadow-md bg-stackrgreen-500 transition-transform duration-300 ease-in-out"
      :class="darkMode ? 'translate-x-8' : 'translate-x-0'"
    ></span>
  </button>

  <button
    v-if="!isLanding && variant === 'navbarClosed'"
    @click="toggleColorMode"
    class="relative flex cursor-pointer h-8 items-center"
  >
    <span class="flex items-center justify-center text-primary">
      <Moon v-if="darkMode" class="h-5 w-5" />
      <Sun v-else class="h-5 w-5" />
    </span>
  </button>

  <div v-if="isLanding" class="fixed bottom-5 left-5 z-50">
    <button
      @click="toggleColorMode"
      class="flex h-14 w-14 items-center justify-center rounded-full bg-stackrgreen-500 text-white shadow-lg transition-transform duration-300 hover:scale-110 hover:text-black"
    >
      <Moon v-if="darkMode" class="h-8 w-8" />
      <Sun v-else class="h-8 w-8" />
    </button>
  </div>
</template>

<style scoped>
.notLanding {
  background-color: var(--primary-bg-color);
  border: solid 1px var(--border-color);
}
.bg-stackrgreen-500 {
  background-color: #22c55e;
}
</style>
