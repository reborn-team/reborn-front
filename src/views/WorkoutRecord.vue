<template>
  <div id="record">
    <h1 class="title">{{ message }}</h1>
    <div id="listDummy">
      <div class="card" v-for="i in 4" :key="{ i }">
        <WorkoutTable />
      </div>
    </div>
    <h2 class="memo-title">운동 일지 기록</h2>
    <hr />
    <div class="form-floating">
      <textarea
        class="form-control memo-text"
        placeholder="Leave a comment here"
        style="height: 300px"
      ></textarea>
    </div>
    <button type="button" class="btn btn-danger recode">Record</button>
  </div>
</template>

<script>
import WorkoutTable from "@/components/Table.vue";
import "../css/views/WorkoutRecord.css";

export default {
  name: "WorkoutRecord",
  components: { WorkoutTable },
  data() {
    return { message: "Record Workout Program" };
  },
};
</script>
