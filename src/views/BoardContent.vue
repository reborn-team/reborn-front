<template>
  <div id="boardContent">
    <div id="article">
      <div class="article-subject">
        <h2>제목 :</h2>
        <div class="subject"></div>
      </div>
      <div class="container"></div>
      <div id="contentBtn">
        <button type="button" class="btn btn-warning">수정</button>
        <button type="button" class="btn btn-secondary">삭제</button>
      </div>
    </div>
    <div id="enterReply">
      <input type="text" class="form-control" placeholder="댓글을 입력하세요" />
      <button type="button" class="btn btn-danger enter">등록</button>
      <button type="button" class="btn btn-danger like">
        <img src="../assets/img/talk.png" alt="" />
      </button>
    </div>
    <hr />
    <Reply />
  </div>
</template>

<script>
import Reply from "@/components/Reply.vue";
import "../css/views/BoardContent.css";

export default {
  name: "BoardContent",
  components: { Reply },
  setup() {},
};
</script>
