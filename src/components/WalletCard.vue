<template>
  <div
    class="flex flex-col"
    @mouseenter="this.isHovering = true"
    @mouseleave="this.isHovering = false"
  >
    <div
      class="flex flex-col justify-between bg-stackrgreen-500 p-5 rounded-md h-30 w-48"
    >
      <h2>{{ title }}</h2>
      <h2>{{ balance }} {{ currency }}</h2>
    </div>
    <div class="flex py-4 mx-auto gap-10 w-fit" v-show="isHovering">
      <i class="pi pi-download" @click="console.log(`teste`)"></i>
      <i class="pi pi-upload"></i>
      <i class="pi pi-trash"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
    title: String,
    balance: Number,
    currency: String,
    color: String,
  },
  data() {
    return {
      isHovering: false,
    };
  },
  methods: {
    openModal() {
      this.$emit("openModal", this.id);
    },
  },
};
</script>

<style lang="scss" scoped></style>
