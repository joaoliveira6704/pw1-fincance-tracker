<script>
import {
  LayoutDashboard,
  Settings,
  User,
  Goal,
  ScrollText,
  Users,
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
  },
};
</script>

<template>
  <div
    class="flex flex-col justify-between px-1 py-1 w-full h-full text-center border-2"
  >
    <nav class="flex flex-col">
      <SidebarLink page="dashboard" name="Dashboard" :icon="LayoutDashboard" />
      <SidebarLink page="objectives" name="Objetivos" :icon="Goal" />
      <SidebarLink page="expenses" name="Despesas" :icon="ScrollText" />
      <SidebarLink page="friends" name="Amigos" :icon="Users" />
    </nav>

    <LightDarkBtn variant="navbar" />
  </div>
</template>

<style scoped>
div {
  background-color: var(--navbar-bg-color);
  border-color: var(--border-color);
}
</style>
