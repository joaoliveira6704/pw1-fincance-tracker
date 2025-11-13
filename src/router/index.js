import LandingView from "@/views/LandingView.vue";
import ProfileView from "@/views/ProfileView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: LandingView },
    { path: "/profile", component: ProfileView },
  ],
});

export default router;
