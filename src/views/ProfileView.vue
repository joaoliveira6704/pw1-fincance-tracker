<script>
import Button from "@/components/Button.vue";
import Skeleton from "@/components/skeletons/ProfileSkeleton.vue";
import ProfileCard from "@/components/cards/ProfileCard.vue";
import { useAuthStore } from "@/stores/authStore";
import { useUsersStore } from "@/stores/userStore";
import { mapStores } from "pinia";

export default {
  components: {
    Button,
    Skeleton,
    ProfileCard,
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
  <div class="w-full min-h-screen">
    <div v-if="usersStore.loading">
      <Skeleton />
    </div>

    <div
      v-else-if="error"
      class="w-full max-w-3xl mx-auto p-4 rounded-lg bg-red-100 border border-red-300 text-red-700 text-center"
    >
      <i class="pi pi-exclamation-triangle mr-2"></i>
      {{ error }}
    </div>

    <div v-else class="flex justify-center">
      <ProfileCard :user="user" />
    </div>
  </div>
</template>
