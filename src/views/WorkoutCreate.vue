<template>
  <div id="create">
    <h1 class="title">{{ message }}</h1>
    <div id="collector">
      <select class="form-select" size="7" aria-label="size 7 select example">
        <option selected>부위</option>
        <option value="1">등</option>
        <option value="2">가슴</option>
        <option value="3">하체</option>
        <option value="4">코어</option>
      </select>
      <select class="form-select" size="7" aria-label="size 7 select example">
        <option value="1">렛풀다운</option>
        <option value="2">풀업</option>
        <option value="3">바벨로우</option>
        <option value="4">인버티드 로우</option>
      </select>
      <div>
        <button type="button" class="btn btn-danger">+</button><br />
        <button type="button" class="btn btn-danger">-</button>
      </div>
      <select
        class="form-select"
        size="8"
        aria-label="size 8 select example"
      ></select>
    </div>
    <div id="explain">
      <img
        src="../assets/img/banner.jpg"
        class="img"
        alt=""
      />
      <div class="text"></div>
    </div>
    <br />
    <a href="/workout/record">
      <button type="button" class="btn btn-danger recode" >Create</button>
    </a>
  </div>
</template>

<script>
import "../css/views/WorkoutCreate.css";

export default {
  name: "WorkoutCreate",
  data() {
    return { message: "Create Workout Program" };
  },
};
</script>
