<template>
  <div id="workoutDetail">
    <h1 class="title">{{ message }}</h1>
    <div id="detail">
      <img
        src="../assets/img/banner.jpg"
        class="card-img-top"
        alt=""
      />
      <div class="detail"></div>
    </div>
  </div>
</template>

<script>
import "../css/views/WorkoutDetail.css";

export default {
  name: "WorkoutDetail",
  data() {
    return { message: "WorkOut Name" };
  },
};
</script>
