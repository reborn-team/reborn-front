<template>
  <h1 class="title">{{ message }}</h1>
  <div class="d-grid gap-2 d-md-block WoBtn">
    <button class="btn btn-primary" type="button">등</button>
    <button class="btn btn-primary" type="button">가슴</button>
    <button class="btn btn-primary" type="button">하체</button>
    <button class="btn btn-primary" type="button">코어</button>
  </div>
  <hr />
  <WorkoutCard />
</template>

<script>
import WorkoutCard from "@/components/Card.vue";

export default {
  name: "WoList",
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
