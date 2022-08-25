<template>
<div id="record">
  <h1 class="title">{{ message }}</h1>
  <WorkoutTable />
  <h1 class="memo">Memo</h1>
  <hr />
  <div class="form-floating">
    <textarea
      class="form-control"
      placeholder="Leave a comment here"
      id="floatingTextarea2"
      style="height: 300px"
    ></textarea>
    <button type="button" class="btn btn-danger recode">Record</button>
  </div>
</div>
</template>

<script>
import WorkoutTable from "@/components/Table.vue";
import '../css/views/WorkoutRecord.css'

export default {
  name: "WorkoutRecord",
  components: { WorkoutTable },
  data() {
    return { message: "Record Workout Program" };
  },
};
</script>
