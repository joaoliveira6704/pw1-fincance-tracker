<script>
import Button from "@/components/Button.vue";
import { useAuthStore } from "@/stores/authStore";
import { useUsersStore } from "@/stores/userStore";
export default {
  data() {
    return {
      userStore: useUsersStore(),
      authStore: useAuthStore(),
      user: {},
    };
  },
  beforeMount() {
    this.userStore.fetchUsers();
  },
  async mounted() {
    this.user = await this.userStore.fetchLoggedUser();
  },
  components: {
    Button,
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

  <Button variant="full" @click="authStore.logout()">Logout</Button>
</template>

<style lang="scss" scoped></style>
