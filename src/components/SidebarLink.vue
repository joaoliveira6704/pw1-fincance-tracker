<script>
export default {
  props: {
    page: String,
    name: String,
    icon: [Object, Function, String],
    isOpen: Boolean,
  },
};
</script>

<template>
  <RouterLink
    :to="{ name: page }"
    class="group flex items-center gap-x-3 w-full rounded-md px-3 py-2 text-primary transition-all cursor-pointer hover:bg-bordergray hover:text-white"
    exact-active-class="bg-stackrgreen-500 text-stackrblack hover:text-white shadow-sm"
  >
    <component :is="icon" :size="20" />
    <span v-if="isOpen" class="text-sm font-medium">{{ name }}</span>
  </RouterLink>
</template>

<style scoped></style>
