<template lang="ko">
  <div id="boardContent">
    <div id="article">
      <h3 class="board-title">{{ArticleContent.title}}</h3>
      <div class="board-info">
        <div>{{ArticleContent.memberNickname}}</div>
        <span>{{ArticleContent.regDate}}</span>
      </div>
      <hr />
      <div class="content2" v-for="i in ArticleContent.files" :key="i" >
        <img
          :src=viewUrl(i.uploadFileName)
          alt="No Image"
          class="boardsPic"
          v-if="ArticleContent.files[0].uploadFileName != ''"
        />
      </div>
      
      <div class="content1">
        <div class="textareas">
           {{ArticleContent.content}}
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
    <Reply />
  </div>
</template>

<script>
import "../css/views/BoardContent.css";
import Reply from "../components/Board/reply.vue";
import axios from "axios";
import { onMounted, ref } from "@vue/runtime-core";
import { useRoute } from "vue-router";

export default {
  name: "BoardContent",
  components: { Reply },
  setup() {
    const ArticleContent = ref("");
    const route = useRoute();
    const articleId = ref(route.params.articleID);

    onMounted(() => {
      getArticle();
    });

    const getArticle = async () => {
      const url = `/api/v1/articles/${articleId.value}`;
      await axios.get(url).then((res) => {
        ArticleContent.value = res.data;
        console.log(ArticleContent.value);
      });
    };

    const viewUrl = (i) => {
      if (i != undefined) {
        return "/api/v1/file/images?filename=" + i;
      }
    };

    return {
      getArticle,
      articleId,
      ArticleContent,
      viewUrl,
    };
  },
};
</script>
