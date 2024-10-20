import { createRouter, createWebHashHistory } from "vue-router";
import Main from "@/pages/Main.vue";
import Home from "../pages/Home.vue";
import User from "../pages/User.vue";
import Login from "../pages/Login.vue";
const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
    redirect: "/home",
    children: [
      { path: "/home", name: "home", component: Home },
      { path: "/user", name: "user", component: User },
    ],
  },
  { path: "/login", name: "login", component: Login },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
