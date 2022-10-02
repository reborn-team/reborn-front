<template lang="ko">
  <div id="boardContent">
    <div id="article">
      <h3 class="board-title">{{ArticleContent.title}}</h3>
      <div class="board-info">
        <div>작성자 : {{ArticleContent.memberNickname}}</div>
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
        <button class="btn btn-danger mdifyBtn" @click="linkEdit">수정</button>
        <button class="btn btn-danger" @click="deleteArticle">삭제</button>
      </div>
    </div>

    <div class="input-container">
      <textarea class="form-control reply-input" v-model="state.comment" ref="comment"></textarea>
      <button class="btn btn-danger btn-sm enterBtn" @click="insertComment">등록</button>
    </div>

    <Reply :articleId="articleId" :state="state" />

  </div>
</template>

<script>
import "@/css/views/Board/BoardContent.css";
import Reply from "@/components/Board/reply.vue";
import axios from "axios";
import { onMounted, reactive, ref } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import router from "@/router/router";

export default {
  name: "BoardContent",
  components: { Reply },
  setup() {
    const state = reactive({
      comment: "",
    });

    const ArticleContent = ref("");
    const route = useRoute();
    const articleId = ref(route.params.articleID);
    const comment = ref();
    const Token = ref(sessionStorage.getItem("TOKEN"));

    onMounted(() => {
      getArticle();
    });

    const getArticle = async () => {
      const url = `/api/v1/articles/${articleId.value}`;
      await axios.get(url).then((res) => {
        ArticleContent.value = res.data;
      });
    };

    const deleteArticle = async () => {
      const url = `/api/v1/articles/${articleId.value}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: Token.value,
      };
      await axios.delete(url, { headers }).then((res) => {
        if (res.status == 204) {
          alert("목록이 삭제되었습니다.");
          router.push("/board?page=1");
        }
      });
    };

    const insertComment = async () => {
      const url = `/api/v1/articles/${articleId.value}/comments`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: Token.value,
      };
      const body = {
        content: state.comment,
      };
      await axios.post(url, body, { headers }).then((res) => {
        if (res.status == 201) {
          alert("댓글이 등록되었습니다.");
          comment.value.value = "";
          router.go();
        }
      });
    };

    const viewUrl = (i) => {
      if (i != undefined) {
        return "/api/v1/file/images?filename=" + i;
      }
    };

    const linkEdit = () => {
      router.push(`/board/${articleId.value}/edit`);
    };

    return {
      articleId,
      state,
      comment,
      ArticleContent,
      getArticle,
      insertComment,
      viewUrl,
      linkEdit,
      deleteArticle,
    };
  },
};
</script>
