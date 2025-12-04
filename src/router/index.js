import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing",
      component: () => import("@/views/LandingView.vue"),
      meta: {
        title: "Stackr - Finances Made Easy",
      },
    },
    {
      path: "/login",
      name: "login",
      meta: { guest: true, title: "Login - Stackr" },
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      meta: { guest: true, title: "Registo - Stackr" },
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
          meta: {
            title: "Dashboard - Stackr",
          },
          component: () => import("@/views/DashboardView.vue"),
        },
        {
          path: "objectives",
          name: "objectives",
          meta: {
            title: "Objetivos - Stackr",
          },
          component: () => import("@/views/ObjectivesView.vue"),
        },
        {
          path: "expenses",
          name: "expenses",
          meta: {
            title: "Despesas - Stackr",
          },
          component: () => import("@/views/ExpensesView.vue"),
        },
        {
          path: "wallets",
          name: "wallets",
          meta: {
            title: "Carteiras - Stackr",
          },
          component: () => import("@/views/WalletsView.vue"),
        },
        {
          path: "profile",
          name: "profile",
          meta: {
            title: "Perfil - Stackr",
          },
          component: () => import("@/views/ProfileView.vue"),
        },
        {
          path: "friends",
          name: "friends",
          meta: {
            title: "Amigos - Stackr",
          },
          component: () => import("@/views/FriendsView.vue"),
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
  document.title = to.meta.title;
  next();
});

export default router;
