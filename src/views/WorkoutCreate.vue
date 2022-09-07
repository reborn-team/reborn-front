<template>
  <div id="workoutCreate">
    <h1 class="title">{{ message }}</h1>
    <div id="Create">
      <img src="../assets/img/banner.jpg" class="card-img-top" alt="" />
      <div id="createWrap">
        <div id="category">
          <label
            for="category"
            class="col-sm-2 col-form-label col-form-label-sm"
            >카테고리 :
          </label>
          <div class="col-sm-10">
            <input type="text" class="form-control form-control-sm" />
          </div>
        </div>
        <div id="wokroutName">
          <label
            for="workoutName"
            class="col-sm-2 col-form-label col-form-label-sm"
            >운동명 :
          </label>
          <div class="col-sm-10">
            <input type="text" class="form-control form-control-sm" />
          </div>
        </div>
        <div id="explain">
          <label for="explain" class="col-sm-2 col-form-label col-form-label-sm"
            >설명 :
          </label>
          <textarea
            class="form-control"
            aria-label="With textarea"
            rows="7"
          ></textarea>
        </div>
      </div>
    </div>
    <div id="insert" >
      <input type="file" class="form-control" />
      <div id="insertBtn">
        <button type="button" class="btn btn-danger btn-sm" @click="linkList">등록하기</button>
        <button type="button" class="btn btn-danger btn-sm" @click="linkList">취소하기</button>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router/router';
import "../css/views/WorkoutCreate.css";

export default {
  name: "WorkoutDetail",

  setup() {
    
    const linkList = () => {
      router.push("/workout/list")
    }
    return {
      linkList,
      message: "운동 생성",
    };
  },
};
</script>
