import { createWebHistory, createRouter } from "vue-router";
import Main from "@/views/Main.vue";
import Login from "@/views/Login.vue";
import Join from "@/views/Join.vue";
import WoCreate from "@/views/WoCreate.vue";
import WoRecord from "@/views/WoRecord.vue";

const routes = [
  {path: "/", name: "main", component: Main},
  {path: "/login", name: "login", component: Login},
  {path: "/join", name: "join", component: Join},
  {path: "/workout/create", name: "woCreate", component: WoCreate},
  {path: "/workout/record", name: "woRecord", component: WoRecord},
]

const router = createRouter({history: createWebHistory(),routes,})

export default router;