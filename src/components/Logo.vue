<script>
export default {
  props: {
    variant: {
      type: String,
      default: "default",
    },
    isOpen: { type: Boolean, default: true },
  },
  computed: {
    isLanding() {
      return this.variant === "landing";
    },
  },
};
</script>

<template>
  <div class="flex items-center" :class="isLanding ? 'gap-x-4' : 'gap-x-2'">
    <img
      src="/logo-icon.svg"
      alt="Stackr Logo"
      :class="isLanding ? 'w-[50px]' : 'w-8'"
    />

    <p
      v-if="isOpen"
      class="font-ProximaNova font-bold text-primary"
      :class="isLanding ? 'text-5xl' : 'text-2xl'"
    >
      stackr
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
