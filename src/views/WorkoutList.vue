<template>
  <div id="workoutList">
    <h1 class="title">{{ message }}</h1>
    <div id="workoutListNav">
      <button class="btn btn-danger" type="button">등</button>
      <button class="btn btn-danger" type="button">가슴</button>
      <button class="btn btn-danger" type="button">하체</button>
      <button class="btn btn-danger" type="button">코어</button>
      <button class="btn btn-danger" id="add" @click="addWorkoukList">
        추가
      </button>
    </div>
    <hr />
    <div id="WorkoutCard">
      <WorkoutCard />
    </div>
  </div>
</template>

<script>
import WorkoutCard from "@/components/Card.vue";
import "../css/views/WorkoutList.css";
import router from '@/router/router';

export default {
  name: "WorkoutList",
  components: { WorkoutCard },
  setup(){
    const addWorkoukList = () => {
      router.push("/workout/create")
    }

    return { 
      addWorkoukList,
      message:"운동 목록"
    }
  }
};
</script>
