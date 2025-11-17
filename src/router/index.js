import DashboardView from "@/views/DashboardView.vue";
import ExpensesView from "@/views/ExpensesView.vue";
import LandingView from "@/views/LandingView.vue";
import MainView from "@/views/MainView.vue";
import ObjectivesView from "@/views/ObjectivesView.vue";
import ProfileView from "@/views/ProfileView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: LandingView },
    {
      path: "/main",
      component: MainView,
      children: [
        { path: "", name: "dashboard", component: DashboardView },
        {
          path: "objectives",
          name: "objectives",
          component: ObjectivesView,
        },
        { path: "expenses", name: "expenses", component: ExpensesView },
        { path: "profile", name: "profile", component: ProfileView },
      ],
    },
  ],
});

export default router;
