<script>
export default {
  name: "Button",
  props: {
    variant: {
      type: String,
      default: "fill",
    },
    to: {
      type: String,
      default: "",
    },
  },
  computed: {
    buttonClasses() {
      const base =
        "items-center text-center h-fit px-4 py-2 cursor-pointer transition-all duration-200 ease-in-out text-primary-color text-lg font-ProximaNova";

      const variants = {
        fill: "bg-stackrgreen-500 rounded-full  hover:bg-stackrgreen-200",
        outline:
          "flex border border-solid rounded-full border-stackrgreen-500 hover:text-stackrblack hover:bg-stackrgreen-500",
        full: "bg-stackrgreen-500 rounded-2xl w-full max-w-2xl hover:bg-stackrgreen-200 mt-6",
      };

      return `${base} ${variants[this.variant]}`;
    },
  },
};
</script>

<template>
  <RouterLink :to="to" :class="buttonClasses"><slot></slot></RouterLink>
</template>

<style lang="scss" scoped></style>
