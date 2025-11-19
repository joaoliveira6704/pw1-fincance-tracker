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
    {{ log.id }} {{ log.name }}
    <button @click="oStore.deleteObjective(log.id)">DELETE</button>
    <!-- <button @click="oStore.logID(log.id)">clog Id>></button>
    <button @click="oStore.deleteObjective(log.id)">||delete</button>
 -->
  </li>
</template>

<style lang="scss" scoped></style>
