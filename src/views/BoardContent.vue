<template lang="ko">
  <div id="boardContent">
    <div id="article">
      <h4 class="board-title">제목</h4>
      <div class="board-info">
        <div>작성자</div>
        <span>날짜 | 조회수 | 댓글수 </span>
      </div>
      <hr />
      <div class="content2">
        <img
          src="https://images.unsplash.com/photo-1616803689943-5601631c7fec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt="boardsPic"
          class="boardsPic"
        />
      </div>
      <div class="content1">
        <div class="textareas">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
          officiis facere impedit distinctio hic libero cum ut, facilis pariatur
          dolores expedita reprehenderit laboriosam voluptatibus debitis
          architecto cupiditate dolore provident recusandae.
        </div>
      </div>
    </div>

    <div class="btns">
      <div>
        <button class="btn btn-danger" onclick="location.href=`/board?page=1`">
          목록
        </button>
      </div>
      <div class="edit-btns">
        <button class="btn btn-danger mdifyBtn">수정</button>
        <button class="btn btn-danger">삭제</button>
      </div>
    </div>

    <div class="input-container">
      <textarea class="form-control reply-input"></textarea>
      <button class="btn btn-danger btn-sm enterBtn">등록</button>
    </div>

    <h6 class="reply">댓글</h6>
    <div class="reviewsWrap p-4" v-for="i in 4" :key="i">
      <div class="reviews-members">
        <div class="reviews-members-header">
          <h6 class="mb-0">작성자</h6>
          <p class="text-gray mb-3">작성시간</p>
        </div>
        <div class="reviews-members-body">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique,
            enim exercitationem quisquam quas culpa nostrum ea porro minima
            molestias? Fugit inventore numquam tempore eveniet, minima incidunt
            laborum nobis harum quibusdam!
          </p>
        </div>
        <div class="review-members-btn">
          <button class="btn btn-warning btn-sm mBtn">수정</button>
          <button class="btn btn-secondary btn-sm">삭제</button>
      
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../css/views/BoardContent.css";

export default {
  name: "BoardContent",
  setup() {
    
  },
};
</script>
