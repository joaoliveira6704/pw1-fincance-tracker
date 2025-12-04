<template>
  <div class="fixed bottom-5 left-5 z-20">
    <button
      @click="toggleColorMode"
      class="flex bg-stackrgreen-500 rounded-full text-4xl py-3 px-3 text-center items-center hover:text-black cursor-pointer transition-all"
    >
      <i v-if="darkMode" class="pi pi-moon"></i>
      <i v-else class="pi pi-sun"></i>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      darkMode: true,
    };
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
      if (this.darkMode) {
        document.documentElement.style.colorScheme = "dark";
      } else {
        document.documentElement.style.colorScheme = "light";
      }
    },
  },
};
</script>

<style scoped></style>
