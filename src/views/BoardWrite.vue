<template>
  <div id="boardWrite">
    <h1 class="title">{{ message }}</h1>
    <div id="subject">
      <h3>제목 :</h3>
      <input class="form-control form-control sub" type="text" />
    </div>
    <WritingForm />
    <div id="writeBtn">
      <button type="button" class="btn btn-danger recode">Regist</button>
      <button type="button" class="btn btn-danger recode">Cancel</button>
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
