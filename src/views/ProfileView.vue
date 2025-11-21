<script>
import { useUsersStore } from "@/stores/users";
export default {
  data() {
    return {
      userStore: useUsersStore(),
      user: {},
    };
  },

  mounted() {
    userStore.fetchUsers();
    this.user = this.userStore.fetchUserById(1);
  },
};
</script>

<template>
  <h1 class="text-red-400">User Profile</h1>
  <p>Username: @{{ user.username }}</p>
  <p>Nome: {{ user.firstName }} {{ user.lastName }}</p>
  <p>Entrou em: {{ user.createdAt }}</p>
  <p>Salário: {{ user.income }}€</p>
  <p v-if="user.friends">Amigos: {{ user.friends.map((friend) => friend) }}</p>
</template>

<style lang="scss" scoped></style>
