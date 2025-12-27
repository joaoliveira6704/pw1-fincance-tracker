<script>
import SidebarBody from "./SidebarBody.vue";
import SidebarHeader from "./SidebarHeader.vue";
import SidebarFooter from "./SidebarFooter.vue";

export default {
  data() {
    return {
      isOpen: true,
    };
  },
  components: {
    SidebarBody,
    SidebarHeader,
    SidebarFooter,
  },
  methods: {
    ToggleSidebar() {
      this.isOpen = !this.isOpen;
      console.log(this.isOpen);
    },
  },
};
</script>

<template>
  <div
    class="flex flex-col h-full max-w-50 transition-all duration-300 ease-in-out overflow-hidden"
    :class="isOpen ? 'w-50' : 'w-15'"
    style="background-color: var(--navbar-bg)"
  >
    <SidebarHeader :isOpen="isOpen" />
    <SidebarBody :isOpen="isOpen" />
    <SidebarFooter :isOpen="isOpen" />
  </div>
  <button
    :class="{ 'cursor-w-resize': isOpen, 'cursor-e-resize': !isOpen }"
    class="h-full w-1"
    @click="ToggleSidebar"
  ></button>
</template>

<style scoped>
button {
  background-color: var(--border);
}
button:hover {
  background-color: var(--color-stackrgreen-500);
  opacity: 0.5;
}
</style>
