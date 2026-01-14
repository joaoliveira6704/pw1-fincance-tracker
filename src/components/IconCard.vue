<script>
export default {
  data() {
    return {
      defaultIcon: this.icon,
      isHovering: false,
      activeClass: "border-green-500",
      disableClass: "border-gray-500",
    };
  },
  props: {
    icon: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
    },
  },
  methods: {
    setIcon() {
      if (!this.isActive) {
        this.$emit("setIcon", this.icon);
      } else {
        this.$emit("setDefault");
      }
    },
  },

  computed: {
    iconLabel() {
      return this.icon.replaceAll("-", " ");
    },
  },
};
</script>

<template>
  <div
    @click="setIcon"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
    class="flex w-fill h-15 py-2 px-3 items-center justify-center gap-4 rounded-md border cursor-pointer"
    :class="{ [activeClass]: isActive }"
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
