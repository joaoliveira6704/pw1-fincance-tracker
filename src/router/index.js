import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing",
      component: () => import("@/views/LandingView.vue"),
    },
    {
      path: "/login",
      name: "login",
      meta: { guest: true },
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      meta: { guest: true },
      component: () => import("@/views/RegisterView.vue"),
    },
    {
      path: "/main",
      name: "Main",
      meta: { requiresAuth: true },
      component: () => import("@/views/MainView.vue"),
      children: [
        {
          path: "",
          name: "dashboard",
          component: () => import("@/views/DashboardView.vue"),
        },
        {
          path: "objectives",
          name: "objectives",
          component: () => import("@/views/ObjectivesView.vue"),
        },
        {
          path: "expenses",
          name: "expenses",
          component: () => import("@/views/ExpensesView.vue"),
        },
        {
          path: "profile",
          name: "profile",
          component: () => import("@/views/ProfileView.vue"),
        },
      ],
    },
    {
      path: "/404",
      name: "notfound",
      component: () => import("@/views/NotFoundView.vue"),
    },
    { path: "/:pathMatch(.*)*", redirect: "/404" },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const token = localStorage.getItem("user-session");

  if (to.meta.requiresAuth) {
    if (!token) {
      return next({ path: "/login" });
    }

    try {
      const isValid = await authStore.validateSession();

      if (!isValid) {
        return next({ path: "/login" });
      }
    } catch (error) {
      return next({ path: "/login" });
    }
  }

  if (to.meta.guest) {
    if (token) {
      const isValid = await authStore.validateSession();
      if (isValid) {
        return next({ path: "/main" });
      }
    }
  }

  next();
});

export default router;
