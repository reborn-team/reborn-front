import { createWebHistory, createRouter } from "vue-router";
import Main from "@/views/Main.vue";
import Login from "@/views/Login.vue";
import Join from "@/views/Join.vue";
import Workout from "@/views/Workout.vue";
import RoutineList from "@/views/RoutineList.vue";
import RoutinePrivate from "@/views/RoutinePrivate.vue";
import RoutineDetail from "@/views/RoutineDetail.vue";
import RoutineCreate from "@/views/RoutineCreate.vue";
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

  {path: "/routine/list", name: "routineList", component: RoutineList},
  {path: "/routine/private", name: "routinePrivate", component: RoutinePrivate},
  {path: "/routine/:workoutID", name: "routineDetail", component: RoutineDetail},
  {path: "/routine/create", name: "routineCreate", component: RoutineCreate},

  {path: "/workout/", name: "workout", component: Workout},

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

