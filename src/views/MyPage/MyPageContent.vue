<template lang="ko">
  <div id="boardContent">
    <div id="article">
      <h3 class="board-title">{{ArticleContent.title}}</h3>
      <div class="board-info">
        <div>작성자 : {{ArticleContent.memberNickname}}</div>
        <div>
          <span>조회수 : {{ArticleContent.viewCount}}</span>
          &nbsp&nbsp
          <span>{{ArticleContent.regDate}}</span>
        </div>
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
        <button class="btn btn-danger" @click="link">
          목록
        </button>
      </div>
      <div class="edit-btns" v-if="ArticleContent.author==true">
        <button class="btn btn-danger mdifyBtn" @click="linkEdit" >수정</button>
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
    const page = route.query.page
    const comment = ref();
    const Token = ref(sessionStorage.getItem("TOKEN"));

    onMounted(() => {
      getArticle();
    });

    const getArticle = async () => {
      const url = `/api/v1/articles/${articleId.value}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: Token.value,
      };
      await axios.get(url, { headers }).then((res) => {
        ArticleContent.value = res.data;
      });
    };

    const deleteArticle = async () => {
      const url = `/api/v1/articles/${articleId.value}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: Token.value,
      };
      await axios
        .delete(url, { headers })
        .then((res) => {
          if (res.status == 204) {
            alert("목록이 삭제되었습니다.");
            router.replace(`/mypage/board?page=${page}`);
          }
        })
        .catch(() => {
          alert("목록 삭제를 실패하였습니다.");
        });
    };

    const insertComment = async () => {
      if (state.comment === "") {
        alert("내용을 입력해 주세요");
        comment.value.focus();
        return false;
      }

      const url = `/api/v1/articles/${articleId.value}/comments`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: Token.value,
      };
      const body = {
        content: state.comment,
      };
      await axios
        .post(url, body, { headers })
        .then((res) => {
          if (res.status == 201) {
            alert("댓글이 등록되었습니다.");
            comment.value.value = "";
            router.go();
          }
        })
        .catch(() => {
          alert("댓글 등록에 실패하였습니다.");
        });
    };

    const viewUrl = (i) => {
      if (i != undefined) {
        return "/api/v1/files/images?filename=" + i;
      }
    };

    const linkEdit = () => {
      router.replace(`/mypage/board/${articleId.value}/edit?page=${page}`);
    };

    const link = () =>{
      router.replace(`/mypage/board?page=${page}`)
    }

    return {
      articleId,
      page,
      state,
      comment,
      ArticleContent,
      getArticle,
      insertComment,
      viewUrl,
      linkEdit,
      link,
      deleteArticle,
    };
  },
};
</script>
