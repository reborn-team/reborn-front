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
          <div class="workoutItem"></div>
        </div>
        <div id="wokroutName">
          <label
            for="workoutName"
            class="col-sm-2 col-form-label col-form-label-sm"
            >운동명 :
          </label>
          <div class="workoutItem"></div>
        </div>
        <div id="explain">
          <label for="explain" class="col-sm-2 col-form-label col-form-label-sm"
            >설명 :
          </label>
          <div class="workoutExplain"></div>
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

export default {
  name: "WorkoutDetail",
  setup() {
    const linkList = () => {
      router.push("/workout/list");
    };

    return {
      linkList,
      message: "운동 정보",
    };
  },
};
</script>
