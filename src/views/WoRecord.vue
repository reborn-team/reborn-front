<template>
  <h1 class="title">{{ message }}</h1>
  <WoTable />
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
</template>

<script>
import WoTable from "@/components/WoTable.vue";

export default {
  name: "WoRecord",
  components: { WoTable },
  data() {
    return { message: "Record Workout Program" };
  },
};
</script>

<style scoped>
.title {
  text-align: left;
  text-decoration: underline red;
  margin: 50px 40px;
}
.memo {
  text-align: left;
  margin: 50px 40px 10px;
}
hr {
  border: 0;
  height: 2px;
  background: red;
}
table.table {
  margin: 0 auto;
  width: 80vw;
}
input.form-control {
  width: 150px;
}
textarea{
  margin : 15px 120px;
  width: 56rem;
}
button{
  float:right;
  margin-right: 100px;
}
</style>
