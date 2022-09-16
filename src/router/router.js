import { createWebHistory, createRouter } from "vue-router";
import Main from "@/views/Main.vue";
import Login from "@/views/Login.vue";
import Join from "@/views/Join.vue";
import Program from "@/views/Program.vue";
import Workout from "@/views/Workout.vue";
import WorkoutMyworkout from "@/views/WorkoutMyworkout";
import WorkoutDetail from "@/views/WorkoutDetail.vue";
import WorkoutCreate from "@/views/WorkoutCreate.vue";
import Board from "@/views/Board.vue";
import BoardWrite from "@/views/BoardWrite.vue";
import BoardContent from "@/views/BoardContent.vue";
import Nearby from "@/views/Nearby.vue";
import MyPageGoal from "@/views/MyPageGoal.vue";
import MyPageList from "@/views/MyPageList.vue";
import MyPageChange from "@/views/MyPageChange.vue";
import test from "@/views/TheTest.vue";

const routes = [
  {path: "/test", name: "test", component: test},

  {path: "/", name: "main", component: Main},
  {path: "/login", name: "login", component: Login},
  {path: "/join", name: "join", component: Join},

  {path: "/workout", name: "Workout", component: Workout},
  {path: "/workout/myworkout", name: "WorkoutMyworkout", component: WorkoutMyworkout},
  {path: "/workout/:workoutID", name: "workoutDetail", component: WorkoutDetail},
  {path: "/workout/create", name: "workoutCreate", component: WorkoutCreate},

  {path: "/program", name: "program", component: Program},

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

