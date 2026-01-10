<template>
  <div
    @click="setIcon"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
    class="flex w-fill h-15 py-2 px-3 items-center justify-center gap-4 rounded-md border cursor-pointer"
    :class="{ [activeClass]: isActive, [disableClass]: !isActive }"
  >
    <font-awesome-icon v-if="!isHovering" :icon="icon" class="fa-lg" />
    <label v-if="!isHovering" class="pb-2 truncate cursor-pointer">{{
      iconLabel
    }}</label>
    <label
      v-else
      class="text-center text-sm pb-2 whitespace-normal cursor-pointer"
      >{{ iconLabel }}</label
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHovering: false,
      isActive: false,
      activeClass: "border-green-500",
      disableClass: "border-gray-500",
    };
  },
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
  methods: {
    setIcon() {
      this.isActive = true;
      this.$emit("setIcon", this.icon);
    },
  },

  computed: {
    iconLabel() {
      return this.icon.replaceAll("-", " ");
    },
  },
};
</script>

<style lang="scss" scoped></style>
