<script>
import LandingView from "@/views/LandingView.vue";
import { RouterView } from "vue-router";

export default {
  data() {
    return {};
  },
};
</script>

<template>
  <RouterView />
</template>

<style scoped>
div:where(.swal2-container) div:where(.swal2-popup) {
  display: none;
  position: relative;
  box-sizing: border-box;
  grid-template-columns: minmax(0, 100%);
  width: var(--swal2-width);
  max-width: 100%;
  padding: var(--swal2-padding);
  border: var(--swal2-border);
  border-radius: var(--swal2-border-radius);
  background: var(--primary-bg-color);
  color: var(--primary-color);
  font-family: inherit;
  font-size: 1rem;
  container-name: swal2-popup;
}
</style>
