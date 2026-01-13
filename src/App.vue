<script>
import { useThemeStore } from "@/stores/themeStore";
import { RouterView } from "vue-router";
import { mapActions } from "pinia";

export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions(useThemeStore, ["initTheme"]),
  },
  mounted() {
    this.initTheme();
  },
};
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
