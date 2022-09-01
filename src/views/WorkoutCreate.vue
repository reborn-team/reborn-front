<template>
  <div id="create">
    <h1 class="title">{{ message }}</h1>
    <div id="collector">
      <select class="form-select" size="7" aria-label="size 7 select example">
        <option disabled>부위</option>
        <option></option>
        <option value="1">등</option>
        <option value="2">가슴</option>
        <option value="3">하체</option>
        <option value="4">코어</option>
      </select>
      <select class="form-select" size="7" aria-label="size 7 select example">
        <option disabled>세부사항</option>
        <option></option>
        <option value="1">렛풀다운</option>
        <option value="2">풀업</option>
        <option value="3">바벨로우</option>
        <option value="4">인버티드 로우</option>
      </select>
      <img src="../assets/img/banner.jpg" class="img" alt="" />
    </div>
    <div id="createBtn">
      <button type="button" class="btn btn-danger">-</button>
      <button type="button" class="btn btn-danger">+</button>
    </div>
    <Table />
    <br />
    <button type="button" class="btn btn-danger recode">Create</button>
  </div>
</template>

<script>
import "../css/views/WorkoutCreate.css";
import Table from "@/components/Table.vue";

export default {
  name: "WorkoutCreate",
  data() {
    return { message: "Create Workout Program" };
  },
  components: { Table },
};
</script>
