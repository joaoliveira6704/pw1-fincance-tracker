<script>
import { Sun, Moon } from "lucide-vue-next";

export default {
  components: {
    Sun,
    Moon,
  },
  props: {
    variant: {
      type: String,
      default: "navbar",
    },
  },
  data() {
    return {
      darkMode: true,
    };
  },
  computed: {
    isLanding() {
      return this.variant === "landing";
    },
  },
  mounted() {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      this.darkMode = savedMode === "true";
    } else {
      this.darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    this.applyColorMode();
  },
  methods: {
    toggleColorMode() {
      this.darkMode = !this.darkMode;
      this.applyColorMode();
      localStorage.setItem("darkMode", this.darkMode);
    },
    applyColorMode() {
      const html = document.documentElement;
      html.style.colorScheme = this.darkMode ? "dark" : "light";

      if (this.darkMode) {
        document.documentElement.style.colorScheme = "dark";
      } else {
        document.documentElement.style.colorScheme = "light";
      }
    },
  },
};
</script>

<template>
  <button
    v-if="!isLanding && variant === 'navbarOpen'"
    @click="toggleColorMode"
    class="relative notLanding flex h-8 w-full cursor-pointer items-center rounded-full bg-gray-200 p-1 shadow-inner transition-colors duration-300 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
  >
    <span class="absolute left-2 flex items-center justify-center text-primary">
      <Sun class="h-4 w-4" />
    </span>

    <span
      class="absolute right-2 flex items-center justify-center text-primary"
    >
      <Moon class="h-4 w-4" />
    </span>

    <span
      class="z-10 h-6 w-6 rounded-full ball-landing shadow-md bg-stackrgreen-500 transition-transform duration-300 ease-in-out"
      :class="darkMode ? 'translate-x-0' : 'translate-x-23'"
    ></span>
  </button>

  <button
    v-if="!isLanding && variant === 'navbarClosed'"
    @click="toggleColorMode"
    class="relative flex cursor-pointer h-8"
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
</style>
