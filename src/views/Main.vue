<template>
  <div>
    <img src="../assets/img/banner.jpg" class="img-fluid" alt="" />
    <div class="d-grid gap-2 d-md-block WoBtn">
      <button class="btn btn-primary" type="button">등</button>
      <button class="btn btn-primary" type="button">가슴</button>
      <button class="btn btn-primary" type="button">하체</button>
      <button class="btn btn-primary" type="button">코어</button>
    </div>
    <hr />
    <WorkoutCard />
    <h3>인기 운동일지</h3>
    <BoardList/>
    <hr />
  </div>
</template>

<script>
import WorkoutCard from "@/components/Card.vue";
import BoardList from "@/components/List.vue";

export default {
  name: "TheHome",
  components: { WorkoutCard, BoardList },
  data() {
    return { message: "Home" };
  },
};
</script>

<style scoped>
img {
  width: 100vw;
  height: 35vw;
}
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
  margin: 40px 10px 0 0;
}
h3 {
  text-align: left;
  margin-top: 40px;
}
</style>
