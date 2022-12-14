import Auth from "@/utils/auth";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/HomeView.vue"),
    meta: {
      requiresAuth: true,
    },
    // redirect: { name: "Balance" },
    children: [
      {
        path: "/balance",
        name: "Balance",
        // component: LoginView,
        component: () =>
          import(
            /* webpackChunkName: "login" */ "../modules/BalanceModule.vue"
          ),
      },
      {
        path: "/vehicle",
        name: "Vehicle",
        // component: LoginView,
        component: () =>
          import(
            /* webpackChunkName: "login" */ "../modules/VehicleModule.vue"
          ),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !Auth.loggedIn()
  ) {
    next({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  } else if (
    to.matched.some((record) => record.name === "Login") &&
    Auth.loggedIn()
  ) {
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;
