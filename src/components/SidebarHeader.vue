<script>
import Logo from "./Logo.vue";
export default {
  components: {
    Logo,
  },
};
</script>

<template>
  <div
    class="flex flex-col px-1 py-1 w-full text-center border-t-2 border-l-2 border-r-2"
  >
    <RouterLink
      to="/"
      class="group flex items-center gap-x-3 w-full rounded-md px-3 py-2 text-primary transition-all cursor-pointer"
      exact-active-class="bg-stackrgreen-500 text-stackrblack shadow-sm"
    >
      <Logo />
    </RouterLink>
  </div>
</template>

<style scoped>
div {
  background-color: var(--navbar-bg-color);
  border-color: var(--border-color);
}
</style>
