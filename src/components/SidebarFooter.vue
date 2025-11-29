<script>
import { User } from "lucide-vue-next";
import SidebarLink from "./SidebarLink.vue";
import { useUsersStore } from "@/stores/userStore";

export default {
  data() {
    return {
      User,
      userObj: null,
      userStore: useUsersStore(),
    };
  },
  components: {
    SidebarLink,
    User,
  },
  computed: {
    formattedName() {
      if (!this.userObj || !this.userObj.lastName) {
        return "Perfil";
      }
      return `${this.userObj.firstName} ${this.userObj.lastName.substring(
        0,
        1
      )}.`;
    },
  },
  beforeMount() {
    this.userStore.fetchUsers();
  },
  async mounted() {
    try {
      this.userObj = await this.userStore.fetchLoggedUser();
    } catch (error) {
      console.error("Failed to load user:", error);
    }
  },
};
</script>

<template>
  <div
    class="flex flex-col justify-between px-1 py-1 w-full h-fit text-center border-2"
  >
    <nav class="flex flex-col">
      <SidebarLink
        v-if="userObj"
        page="profile"
        :name="formattedName"
        :icon="User"
      />
    </nav>
  </div>
</template>

<style scoped>
div {
  background-color: var(--navbar-bg-color);
  border-color: var(--border-color);
}
</style>
