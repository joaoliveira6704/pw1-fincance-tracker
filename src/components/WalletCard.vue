<template>
  <div
    class="flex flex-col justify-between bg-stackrgreen-500 p-5 rounded-md h-30 w-48"
  >
    <h2>{{ title }}</h2>
    <h2>{{ balance }} {{ currency }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    balance: Number,
    currency: String,
    color: String,
  },
};
</script>

<style lang="scss" scoped></style>
