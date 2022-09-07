import { createWebHistory, createRouter } from "vue-router";
import Main from "@/views/Main.vue";
import Login from "@/views/Login.vue";
import Join from "@/views/Join.vue";
import Workout from "@/views/Workout.vue";
import WorkoutList from "@/views/WorkoutList.vue";
import WorkoutDetail from "@/views/WorkoutDetail.vue";
import WorkoutCreate from "@/views/WorkoutCreate.vue";
import Board from "@/views/Board.vue";
import BoardWrite from "@/views/BoardWrite.vue";
import BoardContent from "@/views/BoardContent.vue";
import Nearby from "@/views/Nearby.vue";
import MyPageGoal from "@/views/MyPageGoal.vue";
import MyPageList from "@/views/MyPageList.vue";
import MyPageChange from "@/views/MyPageChange.vue";

const routes = [
  {path: "/", name: "main", component: Main},
  {path: "/login", name: "login", component: Login},
  {path: "/join", name: "join", component: Join},
  {path: "/workout/", name: "workout", component: Workout},
  {path: "/workout/list", name: "woList", component: WorkoutList},
  {path: "/workout/detail", name: "woDetail", component: WorkoutDetail},
  {path: "/workout/create", name: "woCreate", component: WorkoutCreate},
  {path: "/board", name: "board", component: Board},
  {path: "/board/write", name: "boardWrite", component: BoardWrite},
  {path: "/board/content", name: "boardContent", component: BoardContent},
  {path: "/nearby", name: "nearby", component: Nearby},
  {path: "/mypage/goal", name: "myPageGoal", component: MyPageGoal},
  {path: "/mypage/list", name: "myPageList", component: MyPageList},
  {path: "/mypage/change", name: "myPageChange", component: MyPageChange},
]

const router = createRouter({history: createWebHistory(),routes,})

export default router;