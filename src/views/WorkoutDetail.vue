<template>
  <div id="workoutDetail">
    <h1 class="title">{{ message }}</h1>
    <div id="detail">
      <img src="../assets/img/banner.jpg" class="card-img-top" alt="" />
      <div id="detailWrap">
        <div id="category">
          <label
            for="category"
            class="col-sm-2 col-form-label col-form-label-sm"
            >카테고리 :
          </label>
          <div class="workoutItem">{{Workout.workoutCategory}}</div>
        </div>
        <div id="wokroutName">
          <label
            for="workoutName"
            class="col-sm-2 col-form-label col-form-label-sm"
            >운동명 :
          </label>
          <div class="workoutItem">{{Workout.workoutName}}</div>
        </div>
        <div id="explain">
          <label for="explain" class="col-sm-2 col-form-label col-form-label-sm"
            >설명 :
          </label>
          <div class="workoutExplain">{{Workout.content}}</div>
        </div>
      </div>
    </div>
    <button type="button" class="btn btn-danger btn-sm" @click="linkList">
      목록으로
    </button>
  </div>
</template>

<script>
import router from "@/router/router";
import "../css/views/WorkoutDetail.css";
import { ref } from "@vue/reactivity";
import axios from "axios";
import { onMounted } from "@vue/runtime-core";
import { useRoute } from 'vue-router';

export default {
  name: "WorkoutDetail",

  setup() {
    const route = useRoute();
    onMounted(() => {
      getWorkoutHandler();
    });

    const Token = ref(sessionStorage.getItem("TOKEN")); 
    const WorkoutID = ref(route.params.workoutID); 
    const Workout = ref("");

    async function getWorkoutHandler() {
      const url = `/api/v1/workout/${WorkoutID.value}`;
      
      const headers = {
        "Content-Type": "application/json",
        Authorization: Token.value,
        token: Token.value,
      };
      await axios.get(url, { headers }).then((res) => {
        console.log(res.data);
        if(res.status === 200) {
          Workout.value = res.data 
        }
      });
    }

    const linkList = () => {
      router.push("/workout/list");
    };

    return {
      Workout,
      WorkoutID,
      linkList, 
      getWorkoutHandler,
      message: "운동 정보",
    };
  },
};
</script> 