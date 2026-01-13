<script>
import {
  LayoutDashboard,
  Settings,
  User,
  Goal,
  ScrollText,
  Users,
  Wallet,
} from "lucide-vue-next";
import SidebarLink from "./SidebarLink.vue";
import LightDarkBtn from "./LightDarkBtn.vue";

export default {
  data() {
    return {
      LayoutDashboard,
      User,
      Goal,
      ScrollText,
      Users,
      Wallet,
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
  },
  props: {
    isOpen: Boolean,
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
      <SidebarLink page="admin" name="Admin" :isOpen="isOpen" :icon="Users" />
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
