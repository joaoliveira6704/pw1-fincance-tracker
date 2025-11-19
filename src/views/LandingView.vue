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
    {{ log.id }}
  </li>
  <h1>{{ oStore.getObjectiveById(1) }}</h1>
</template>

<style lang="scss" scoped></style>
