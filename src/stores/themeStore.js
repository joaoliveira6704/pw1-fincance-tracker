import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    darkMode: false,
  }),
  actions: {
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

    toggleColorMode() {
      this.darkMode = !this.darkMode;
      localStorage.setItem("darkMode", this.darkMode);
      this.applyColorMode();
    },

    applyColorMode() {
      const html = document.documentElement;

      if (this.darkMode) {
        html.setAttribute("data-theme", "dark");
      } else {
        html.setAttribute("data-theme", "light");
      }
    },
  },
});
