<template>
  <div id="boardWrite">
    <h1 class="title">{{ message }}</h1>
    <div id="subject">
      <h3>제목 :</h3>
      <input class="form-control form-control sub" type="text" />
    </div>
    <WritingForm />
    <div id="writeBtn">
      <button type="button" class="btn btn-danger recode" @click="registArticle">Regist</button>
      <a href="/board">
        <button type="button" class="btn btn-danger recode">Cancel</button>
      </a>
    </div>
  </div>
</template>

<script>
import router from '@/router/router';
import WritingForm from "../components/WritingForm.vue";
import "../css/views/BoardWrite.css";

export default {
  name: "BoardWrite",
  components: { WritingForm },
  setup(){

    const registArticle = () => {
      alert('등록 되었습니다');
      router.push("/board");
    }


    return { registArticle, message: "글쓰기" };
  }
};
</script>
