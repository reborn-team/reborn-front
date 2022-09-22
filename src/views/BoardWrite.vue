<template>
  <div id="boardWrite">
    <h1 class="title">{{ message }}</h1>
    <div id="subject">
      <h3>제목 :</h3>
      <input class="form-control form-control sub" type="text" />
    </div>
    <div class="content">
      <textarea
        class="form-control"
        aria-label="With textarea"
        rows="15"
        maxlength="300"
      ></textarea>
    </div>
    <div class="fileUpload">
      <div class="form-group centerz">
        <input type="file" @change="selectFile" class="form-control" accept="image/*"/>
      </div>
    </div>
    <div id="writeBtn">
      <button
        type="button"
        class="btn btn-danger recode"
        @click="registArticle"> 등록하기
      </button>
      <a href="/board">
        <button type="button" class="btn btn-danger recode">취소하기</button>
      </a>
    </div>
  </div>
</template>

<script>
import router from "@/router/router";
import "../css/views/BoardWrite.css";

export default {
  name: "BoardWrite",
  setup() {
    const registArticle = () => {
      alert("등록 되었습니다");
      router.push("/board");
    };

    return { registArticle, message: "글쓰기" };
  },
};
</script>
