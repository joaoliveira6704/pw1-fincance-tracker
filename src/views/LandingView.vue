<script>
import { useObjectiveStore } from "../stores/objectivesStore.js";

export default {
  data() {
    return {
      objectivesStore: useObjectiveStore(),
    };
  },
};
</script>

<template>
  <li v-for="log in objectivesStore.objectives">
    {{ log.id }} {{ log.name }}
    <button @click="objectivesStore.deleteObjective(log.id)">DELETE</button>
    <!-- <button @click="oStore.logID(log.id)">clog Id>></button>
    <button @click="oStore.deleteObjective(log.id)">||delete</button>
 -->
  </li>
  <h1 class="text-red-400">Landing Page</h1>
  <RouterLink to="/main">Main</RouterLink>
  <RouterLink to="/login">Login</RouterLink>
  <RouterLink to="/register">Register</RouterLink>
</template>

<style lang="scss" scoped></style>
