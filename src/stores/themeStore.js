import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    darkMode: false, // Default to false until initTheme runs
  }),
  actions: {
    // 1. Initialize: Run this in App.vue or main.js to set initial state
    initTheme() {
      const savedMode = localStorage.getItem("darkMode");
      if (savedMode !== null) {
        this.darkMode = savedMode === "true";
      } else {
        this.darkMode = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
      }
      this.applyColorMode();
    },

    // 2. Toggle: Flip the state and save
    toggleColorMode() {
      this.darkMode = !this.darkMode;
      localStorage.setItem("darkMode", this.darkMode);
      this.applyColorMode();
    },

    // 3. Apply: The logic to update the DOM happens here now
    applyColorMode() {
      const html = document.documentElement;

      if (this.darkMode) {
        html.classList.add("dark");
        html.setAttribute("data-theme", "dark");
      } else {
        html.classList.remove("dark");
        html.setAttribute("data-theme", "light");
      }
    },
  },
});
