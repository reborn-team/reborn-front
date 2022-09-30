import { createWebHistory, createRouter } from "vue-router";
import Main from "@/views/Main.vue";
import Login from "@/views/Login.vue";
import Join from "@/views/Join.vue";

import Workout from "@/views/Workout/Workout.vue";
import WorkoutDetail from "@/views/Workout/WorkoutDetail.vue";
import WorkoutCreate from "@/views/Workout/WorkoutCreate.vue";
import WorkoutEdit from "@/views/Workout/WorkoutEdit.vue";

import WorkoutMyworkout from "@/views/MyWorkout/WorkoutMyworkout";
import WorkoutMyworkoutDetail from "@/views/MyWorkout/WorkoutMyworkoutDetail";
import Program from "@/views/Program.vue";

import Board from "@/views/Board/Board.vue";
import BoardWrite from "@/views/Board/BoardWrite.vue";
import BoardContent from "@/views/Board/BoardContent.vue";
import BoardEdit from "@/views/Board/BoardEdit.vue";

import Nearby from "@/views/Nearby.vue";

import MyPageGoal from "@/views/MyPage/MyPageGoal.vue";
import MyPageList from "@/views/MyPage/MyPageList.vue";
import MyPageChange from "@/views/MyPage/MyPageChange.vue";

const routes = [
  {path: "/", name: "main", component: Main},
  {path: "/login", name: "login", component: Login},
  {path: "/join", name: "join", component: Join},

  {path: "/workout", name: "Workout", component: Workout},
  {path: "/workout/create", name: "workoutCreate", component: WorkoutCreate},
  {path: "/workout/:workoutID", name: "workoutDetail", component: WorkoutDetail},
  {path: "/workout/:workoutID/edit", name: "workoutEdit", component: WorkoutEdit},
  
  {path: "/workout/me", name: "workoutMyworkout", component: WorkoutMyworkout},
  {path: "/workout/me/:workoutID", name: "workoutMyworkoutDetail", component: WorkoutMyworkoutDetail},
  {path: "/program", name: "program", component: Program},

  {path: "/board", name: "board", component: Board},
  {path: "/board/write", name: "boardWrite", component: BoardWrite},
  {path: "/board/:articleID", name: "boardContent", component: BoardContent},
  {path: "/board/:articleID/edit", name: "boardEdit", component: BoardEdit},

  {path: "/nearby", name: "nearby", component: Nearby},
  
  {path: "/mypage/goal", name: "myPageGoal", component: MyPageGoal},
  {path: "/mypage/list", name: "myPageList", component: MyPageList},
  {path: "/mypage/change", name: "myPageChange", component: MyPageChange},
]

const router = createRouter({history: createWebHistory(),routes,})

export default router;

