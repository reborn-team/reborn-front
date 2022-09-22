<template>
  <div id="boardContent">
    <div id="article">
      <h4 class="board-title">제목</h4>
      <div class="board-info">
        <div>작성자</div>
        <span>날짜 | 조회수 | 댓글수 </span>
      </div>
      <hr />
      <div class="content2">
        <img src="#" alt="boardsPic" class="boardsPic" />
      </div>
      <div class="content1">
        <div class="textareas">내용</div>
      </div>
    </div>

    <div class="btns">
        <button class="btn" onclick="location.href=`/board/`">
            목록
        </button>
        <div class="edit-btns">
            <button class="btn" >수정</button>
            <button class="btn" >삭제</button>
        </div>
    </div>

    <div class="input-container">
      <textarea
        class="form-control reply-input"
        style="height: 100px; width: 900px"
      ></textarea>
      <button class="btn">등록</button>
    </div>

    

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
