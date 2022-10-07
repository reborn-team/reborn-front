<template lang="ko">
  <div id="boardEdit">
    <h1 class="title">{{ message }}</h1>
    <div class="subject">
      <h3>제목 :</h3>
      <input class="form-control form-control sub" type="text" ref="title" v-model="state.title"/>
    </div>
    <div class="content">
      <textarea
        class="form-control"
        aria-label="With textarea"
        rows="15"
        maxlength="301"
        ref="content"
        v-model="state.content"
      ></textarea>
    </div>
    <div id="editFileBoard">
      <div class="filebox">
        <label for="editImgName">업로드</label>
        <input type="file" id="editImgName"  @change="selectFile" />
      </div>
      <div class="name">
        <div v-if="files.length==0">{{ originFile }}</div>
        <div v-for="i in files" :key="i">{{ i.originFileName }}</div>
      </div>
    </div>
    <button
      id="editDeleteImage"
      type="button"
      class="btn btn-secondary btn-sm"
      @click="deleteImage"
      v-if="files.length != 0"
    >
      삭제하기
    </button>
    <div class="editBtn">
      <button
        type="button"
        class="btn btn-danger recode"
        @click="editArticle"> 수정하기
      </button>
      <button type="button" class="btn btn-danger recode" onclick="location.href='/mypage/board?page=1'">취소하기</button>
    </div>
  </div>
</template>

<script>
import router from "@/router/router";
import "@/css/views/Board/BoardEdit.css";
import { reactive, ref } from "@vue/reactivity";
import axios from "axios";
import { onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";

export default {
  name: "BoardEdit",
  setup() {
    const state = reactive({
      title: "",
      content: "",
      originFileName: "",
      uploadFileName: "",
      token: sessionStorage.getItem("TOKEN"),
    });
    const title = ref("");
    const content = ref("");
    let files = ref([]);
    let originFile = ref("");

    const route = useRoute();
    const articleId = ref(route.params.articleID);
    const ArticleContent = ref("");

    onMounted(() => {
      getArticle();
    });

    const getArticle = async () => {
      const url = `/api/v1/articles/${articleId.value}`;
      await axios.get(url).then((res) => {
        ArticleContent.value = res.data;
        state.title = ArticleContent.value.title;
        state.content = ArticleContent.value.content;
        originFile.value = ArticleContent.value.files[0].originFileName;
      });
    };

    const editArticle = async () => {
      if (state.title === "") {
        alert("제목을 입력해 주세요");
        title.value.focus();
        return false;
      } 
      else if (state.content === "") {
        alert("내용을 입력해 주세요");
        content.value.focus();
        return false;
      } 
      if (state.content.length > 300 ) {
        alert("300글자 이하로 작성해주세요");
        content.value.focus();
        return false;
      } 

      const url = `/api/v1/articles/${articleId.value}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: state.token,
      };
      const body = {
        title: state.title,
        content: state.content,
        originFileName: state.originFileName,
        uploadFileName: state.uploadFileName,
        files: files.value
      };
      await axios.patch(url, body, { headers }).then((res) => {
        if (res.status == 204) {
          alert("글이 수정 되었습니다.");
          router.replace(`/mypage/board/${articleId.value}`);
        }
      }).catch(()=>{
        alert("글 수정에 실패하였습니다.");
      });
    };

    const selectFile = (event) => {
      const formData = new FormData();
      for (const file of event.target.files) {
        formData.append("file", file);
      }
      axios
        .post("/api/v1/file", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          if (res.status == 200) {
            files.value = res.data;
            state.originFileName = files.value[0].originFileName;
            state.uploadFileName = files.value[0].uploadFileName;
          }
        })
        .catch(() => {
          alert("파일 업로드에 실패했습니다.")
        });
    };

    const deleteImage = () => {
      const headers = { "Content-Type": "application/json;" };
      axios
        .delete("/api/v1/file?filename=" + state.uploadFileName, { headers })
        .then((res) => {
          if (res.status == 200) {
            if (res.data) {
              files.value = "";
              document.getElementById("editImgName").value = "";
            }
          }
        })
        .catch(() => 
          alert("파일 삭제를 실패했습니다.")
        );
    };

    return {
      message: "글 수정",
      state,
      title,
      content,
      files,
      originFile,
      editArticle,
      selectFile,
      deleteImage,
    };
  },
};
</script>
