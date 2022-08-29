<template>
  <div id="boardContent">
    <div id="article">
      <div class="article-subject">
        <h2>제목 :</h2>
        <div class="subject"></div>
      </div>
      <div class="container"></div>
      <div id="contentBtn">
        <button type="button" class="btn btn-danger like"><img src="../assets/img/talk.png" alt=""></button> 
        <a href="#">
          <button type="button" class="btn btn-danger ">Modify</button>  
        </a>
        <a href="#">
          <button type="button" class="btn btn-danger ">Delete</button>
        </a>
      </div>
    </div>
    <div id="enterReply">
      <input type="text" class="form-control" placeholder="댓글을 입력하세요"/>
      <a href="#">
        <button type="button" class="btn btn-danger enter">Enter</button>
      </a>
    </div>
    <hr />
    <Reply/>
  </div>
</template>

<script>
import Reply from "@/components/Reply.vue";
import '../css/views/BoardContent.css'

export default {
  name: "BoardContent",
  components: { Reply },
  data() {},
};
</script>

