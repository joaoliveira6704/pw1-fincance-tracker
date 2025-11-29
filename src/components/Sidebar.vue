<script>
import SidebarBody from "./SidebarBody.vue";
import SidebarHeader from "./SidebarHeader.vue";
import SidebarFooter from "./SidebarFooter.vue";

export default {
  components: {
    SidebarBody,
    SidebarHeader,
    SidebarFooter,
  },
};
</script>

<template>
  <div class="flex flex-col h-full">
    <SidebarHeader />
    <SidebarBody />
    <SidebarFooter />
  </div>
</template>

<style scoped></style>
