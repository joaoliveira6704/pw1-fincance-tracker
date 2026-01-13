<template>
  <div
    class="flex flex-col h-full transition-[width] duration-300 ease-in-out overflow-hidden shrink-0"
    :class="isOpen ? 'w-42' : 'w-16'"
    style="background-color: var(--navbar-bg)"
  >
    <SidebarHeader :isOpen="isOpen" />
    <SidebarBody :isOpen="isOpen" />
    <SidebarFooter :isOpen="isOpen" />
  </div>

  <button
    :class="{ 'cursor-w-resize': isOpen, 'cursor-e-resize': !isOpen }"
    class="h-full w-1 shrink-0"
    @click="ToggleSidebar"
  ></button>
</template>

<script>
import SidebarBody from "./SidebarBody.vue";
import SidebarHeader from "./SidebarHeader.vue";
import SidebarFooter from "./SidebarFooter.vue";

export default {
  data() {
    return {
      isOpen: true,
      breakpoint: 768,
      lastWidth: window.innerWidth, // Track to prevent unnecessary updates
    };
  },
  components: { SidebarBody, SidebarHeader, SidebarFooter },
  methods: {
    ToggleSidebar() {
      // Allow manual toggle only if above mobile breakpoint
      if (window.innerWidth < this.breakpoint) return;
      this.isOpen = !this.isOpen;
    },
    handleResize() {
      const width = window.innerWidth;
      // Only trigger a state change if we cross the breakpoint
      if (width < this.breakpoint && this.isOpen) {
        this.isOpen = false;
      } else if (
        width >= this.breakpoint &&
        !this.isOpen &&
        this.lastWidth < this.breakpoint
      ) {
        this.isOpen = true;
      }
      this.lastWidth = width;
    },
  },
  mounted() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style scoped>
button {
  background-color: var(--border);
  border: none;
  padding: 0;
  outline: none;
}
button:hover {
  background-color: var(--color-stackrgreen-500);
  opacity: 0.5;
}
</style>
