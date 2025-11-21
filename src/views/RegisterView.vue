<script>
import { useUsersStore } from "@/stores/usersStore";

export default {
  data() {
    return {
      usersStore: useUsersStore(),
    };
  },

  methods: {
    async addNewUser() {
      const formattedDate = new Date().toISOString().slice(0, 10);
      await this.usersStore.addUser({
        username: "maria",
        firstName: "Maria",
        lastName: "Silva",
        createdAt: formattedDate,
        income: 15000,
        objectives: [],
        expenses: [],
      });
    },
  },
};
</script>

<template>
  <h1>Register</h1>
  <button @click="addNewUser()">Add User</button>
</template>

<style lang="scss" scoped></style>
