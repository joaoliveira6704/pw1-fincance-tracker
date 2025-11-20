<script>
export default {
  name: "Button",
  props: {
    variant: {
      type: String,
      default: "fill",
    },
  },
  computed: {
    buttonClasses() {
      const base =
        "px-4 py-2 cursor-pointer transition-all duration-200 ease-in-out text-lg font-ProximaNova";

      const variants = {
        fill: "bg-stackrgreen-500 rounded-full text-white hover:bg-stackrgreen-200",
        outline:
          "border border-solid rounded-full border-stackrgreen-500 text-white hover:text-stackrblack hover:bg-stackrgreen-500",
        full: "bg-stackrgreen-500 rounded-2xl text-white w-full max-w-2xl hover:bg-stackrgreen-200 mt-6",
      };

      return `${base} ${variants[this.variant]}`;
    },
  },
};
</script>

<template>
  <button :class="buttonClasses">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped></style>
