<script>
import Sidebar from "@/components/Sidebar.vue";

export default {
  components: {
    Sidebar,
  },
};
</script>

<template>
  <div id="main-app" class="flex h-screen"><Sidebar /> <RouterView /></div>
</template>

<style>
.main-app {
  background-color: var(--main-bg-color);
}
</style>
