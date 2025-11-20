<template>
  <div class="text-7xl max-w-5xl text-center font-ProximaNova mt-30">
    <img src="/hero-image.png" class="mx-auto block" width="600"></img>
    <h1 class="mt-10">
      Managing <span class="text-stackrgreen-500">Finances</span><br />
      Made Easy
    </h1>
  </div>
  <div>
    <h3 class="text-stackrgrey-light mt-4">
      Track Your Money. Master Your Habits.
    </h3>
  </div>
  <Button variant="full">Start Now</Button>
</template>

<script>
import Button from "./Button.vue";

export default {
  components: {
    Button,
  },
};
</script>

<style lang="scss" scoped></style>
