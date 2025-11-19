<script>
import { useObjectiveStore } from "../stores/ostore.js";

export default {
  data() {
    return {
      oStore: useObjectiveStore(),
    };
  },
};
</script>

<template>
  <li v-for="log in oStore.objectives">
    {{ log }}
  </li>
  <!-- <h1>{{ oStore.getObjectiveById(1) }}</h1> -->
  <button @click="oStore.createObjective('teste', 5000, true, 30)">
    teste
  </button>
</template>

<style lang="scss" scoped></style>
