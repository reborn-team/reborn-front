<template>
  <div id="main">
    <div id="banner">
      <video muted autoplay>
        <source src="@/assets/video/banner.mp4" type="video/mp4" />
      </video>
    </div>
    <div id="mainContent">
      <div id="workoutNav">
        <div class="d-grid gap-2 d-md-flex">
          <button class="btn btn-danger" type="button">등</button>
          <button class="btn btn-danger" type="button">가슴</button>
          <button class="btn btn-danger" type="button">하체</button>
          <button class="btn btn-danger" type="button">코어</button>
        </div>
      </div>
      <hr />
      <div id="MainCard">
        <WorkoutCard />
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
};
</script>
