<script>
import Button from "@/components/Button.vue";
import Skeleton from "@/components/Skeleton.vue";
import { useAuthStore } from "@/stores/authStore";
import { useUsersStore } from "@/stores/userStore";
import { mapStores } from "pinia";

export default {
  components: {
    Button,
    Skeleton,
  },
  data() {
    return {
      user: {},
      error: null,
    };
  },
  computed: {
    ...mapStores(useUsersStore, useAuthStore),
  },
  async created() {
    try {
      this.user = await this.usersStore.fetchLoggedUser();
    } catch (e) {
      this.error = "Failed to load profile.";
      console.error(e);
    }
  },
};
</script>

<template>
  <div v-if="usersStore.loading">
    <Skeleton />
  </div>

  <div v-else-if="error" class="text-red-500 p-4">
    {{ error }}
  </div>

  <div v-else class="w-full shadow-md rounded-lg">
    <h1 class="text-xl font-bold text-red-400 mb-4">User Profile</h1>

    <div class="space-y-2 mb-6">
      <p><strong>Username:</strong> @{{ user.username }}</p>
      <p><strong>Nome:</strong> {{ user.firstName }} {{ user.lastName }}</p>
      <p><strong>Entrou em:</strong> {{ user.createdAt }}</p>
      <p><strong>Salário:</strong> {{ user.income }}€</p>

      <div v-if="user.friends && user.friends.length">
        <strong>Amigos:</strong>
        <ul class="list-disc list-inside ml-2">
          <li v-for="friend in user.friends" :key="friend">
            {{ friend }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
