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

export default {
  name: "WorkoutList",
  components: { WorkoutCard },
  data() {
    return { message: "Workout List" };
  },
};
</script>

<style scoped>
.WoBtn {
  text-align: left;
  border-color: none;
  background-color: none;
}
.btn-primary {
  background-color: white;
  border-color: red;
  color: black;
  --bs-btn-hover-bg: red;
  --bs-btn-hover-border-color: none;
  margin: 0px 20px 0 30px;
}
</style>
