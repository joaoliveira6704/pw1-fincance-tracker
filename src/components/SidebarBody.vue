<script>
import {
  LayoutDashboard,
  Settings,
  User,
  Goal,
  ScrollText,
  Users,
  Wallet,
  Shield,
} from "lucide-vue-next";
import SidebarLink from "./SidebarLink.vue";
import LightDarkBtn from "./LightDarkBtn.vue";
import { useUsersStore } from "@/stores/userStore";
import { mapActions } from "pinia";
import { getUserId } from "@/utils/session";

export default {
  data() {
    return {
      isAdmin: false,
      LayoutDashboard,
      User,
      Goal,
      ScrollText,
      Users,
      Wallet,
      Shield,
    };
  },
  components: {
    LayoutDashboard,
    SidebarLink,
    Settings,
    User,
    Goal,
    ScrollText,
    Users,
    LightDarkBtn,
    Wallet,
    Shield,
  },
  props: {
    isOpen: Boolean,
  },

  methods: {
    ...mapActions(useUsersStore, ["fetchUserById"]),
  },

  async mounted() {
    this.userId = await getUserId();
    const user = await this.fetchUserById(this.userId);
    this.isAdmin = user.isAdmin ? true : false;
    console.log(this.isAdmin, user);
  },
};
</script>

<template>
  <div
    class="flex flex-col justify-between px-2 py-3 w-full h-full text-center border-b-2 border-t-2"
    :class="isOpen ? 'items-left' : 'items-center'"
  >
    <nav class="flex flex-col">
      <SidebarLink
        page="dashboard"
        name="Dashboard"
        :isOpen="isOpen"
        :icon="LayoutDashboard"
      />
      <SidebarLink
        page="objectives"
        name="Objetivos"
        :isOpen="isOpen"
        :icon="Goal"
      />
      <SidebarLink
        page="expenses"
        name="Despesas"
        :isOpen="isOpen"
        :icon="ScrollText"
      />
      <SidebarLink
        page="wallets"
        name="Carteiras"
        :isOpen="isOpen"
        :icon="Wallet"
      />
      <SidebarLink
        page="friends"
        name="Amigos"
        :isOpen="isOpen"
        :icon="Users"
      />
      <SidebarLink
        v-if="isAdmin"
        page="admin"
        name="Admin"
        :isOpen="isOpen"
        :icon="Shield"
      />
    </nav>

    <LightDarkBtn :variant="isOpen ? 'navbarOpen' : 'navbarClosed'" />
  </div>
</template>

<style scoped>
div {
  background-color: var(--navbar-bg-color);
  border-color: var(--border);
}
</style>
