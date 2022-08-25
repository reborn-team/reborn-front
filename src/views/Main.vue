<template>
  <div id="main">
    <div id="banner">
      <img class="img" src="../assets/img/banner.jpg" />
    </div>
    <div id="mainContent">
      <div id="workoutNav">
        <div class="d-grid gap-2 d-md-block WoBtn">
          <button class="btn btn-primary" type="button">등</button>
          <button class="btn btn-primary" type="button">가슴</button>
          <button class="btn btn-primary" type="button">하체</button>
          <button class="btn btn-primary" type="button">코어</button>
        </div>
      </div>
      <hr />
      <div id="cardDummy">
        <div class="card" v-for="i in 3" :key={i}>
          <WorkoutCard />
        </div>
      </div>

      <div id="board">
        <h3>인기 운동일지</h3>
      </div>
      <hr />

      <BoardList />
    </div>
  </div>
</template>

<script>
import WorkoutCard from "@/components/Card.vue";
import BoardList from "@/components/List.vue";
import "../css/views/Main.css";

export default {
  name: "TheHome",
  components: { WorkoutCard, BoardList },
  data() {
    return { message: "Home" };
  },
};
</script>
