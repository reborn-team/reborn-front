<template>
  <div class="article">
    <div class="article-subject">
      <h2>제목 :</h2>
      <div class="container subject" max-width="xl"></div>
    </div>
    <div class="container content"></div>
    <button type="button" class="btn btn-danger ">Modify</button>  
    <button type="button" class="btn btn-danger ">Delete</button>
  </div>
  <input type="text" class="form-control" />
  <button type="button" class="btn btn-danger enter">Enter</button>
  <hr />
  <Reply/>
</template>

<script>
import Reply from "@/components/Reply.vue";

export default {
  name: "BoardContent",
  components: { Reply },
  data() {},
};
</script>

