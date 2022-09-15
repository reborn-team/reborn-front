<template>
  <div id="workoutList">
    <h1 class="title">{{ message }}</h1>
    <div id="workoutListNav">
      <button class="btn btn-danger" type="button">전체</button>
      <button class="btn btn-danger" type="button">등</button>
      <button class="btn btn-danger" type="button">가슴</button>
      <button class="btn btn-danger" type="button">하체</button>
      <button class="btn btn-danger" type="button">코어</button>
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

export default {
  name: "WorkoutList",
  components: { WorkoutCard },
  setup(){
    return { 
      message:"나의 리스트"
    }
  }
};
</script>
