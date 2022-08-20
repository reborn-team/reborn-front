<template>
  <h1 class="title">{{ message }}</h1>
  <div class="subject">
    <h3>제목 :</h3>
    <input class="form-control form-control sub" type="text" />
  </div><br>
  <WritingForm />
  <button type="button" class="btn btn-danger recode">Cancel</button>
  <button type="button" class="btn btn-danger recode">Regist</button>
</template>

<script>
import WritingForm from "../components/WritingForm.vue";

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