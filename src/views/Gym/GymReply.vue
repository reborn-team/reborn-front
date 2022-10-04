<template lang="ko">
  <div id="gymReply">
    <h6 class="reply">평가</h6>
    <div class="reviewsWrap p-4" v-for="i in 4" :key="i">
      <div class="reviews-members">
        <div class="reviews-members-header">
          <div>
            <h6 class="mb-0">작성자</h6>
            <p class="text-gray mb-3">작성시간</p>
          </div>          
            <div>⭐⭐⭐⭐⭐</div>
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
import "@/css/views/Gym/GymReply.css";

export default{
  
}
</script>
