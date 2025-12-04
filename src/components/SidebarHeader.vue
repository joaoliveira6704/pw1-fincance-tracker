<script>
import Logo from "./Logo.vue";
export default {
  components: {
    Logo,
  },
  props: {
    isOpen: Boolean,
  },
};
</script>

<template>
  <div
    class="flex flex-col px-1 py-1 w-full text-center items-center border-t-2"
  >
    <RouterLink
      to="/"
      class="group flex items-center rounded-md px-2 py-2 text-primary transition-all cursor-pointer"
      exact-active-class="bg-stackrgreen-500 text-stackrblack shadow-sm"
    >
      <Logo :isOpen="isOpen" />
    </RouterLink>
  </div>
</template>

<style scoped>
div {
  background-color: var(--navbar-bg-color);
  border-color: var(--border-color);
}
</style>
