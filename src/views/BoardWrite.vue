<template>
  <div id="boardWrite">
    <h1 class="title">{{ message }}</h1>
    <div id="subject">
      <h3>제목 :</h3>
      <input class="form-control form-control sub" type="text" />
    </div>
    <br />
    <WritingForm />
    <div id="writeBtn">
      <button type="button" class="btn btn-danger recode">Cancel</button>
      <button type="button" class="btn btn-danger recode">Regist</button>
    </div>
  </div>
</template>

<script>
import WritingForm from "../components/WritingForm.vue";
import '../css/views/BoardWrite.css'

export default {
  name: "BoardWrite",
  components: { WritingForm },
  data() {
    return { message: "Writing" };
  },
};
</script>

<style scoped>
.subject {
  display: flex;
  margin-left: 250px;
}
h3 {
  display: inline-block;
}
.sub {
  display: inline-block;
  width: 20%;
  margin-left: 20px;
}
.btn {
  position: relative;
  left: 100px;
}
</style>
