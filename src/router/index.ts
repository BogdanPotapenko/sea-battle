import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/sea-battle/",
    name: "prepare",
    component: () => import("../pages/PrepareBatte.vue"),
  },
  {
    path: "/sea-battle/battle",
    name: "battle",
    component: () => import("../pages/SeaBattle.vue"),
  },
  { path: "/:catchAll(.*)*", redirect: "/sea-battle/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(function (to, from, next) {
  if (from.name !== "prepare" && to.name === "battle") {
    return next("/sea-battle/");
  }

  return next();
});

export default router;
