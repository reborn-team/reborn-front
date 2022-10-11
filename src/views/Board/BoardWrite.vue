<template lang="ko">
  <div id="boardWrite">
    <h1 class="title">{{ message }}</h1>
    <div id="subject">
      <h3>제목 :</h3>
      <input class="form-control form-control sub" type="text" ref="title" v-model="state.title"/>
    </div>
    <div class="content">
      <textarea
        class="form-control"
        aria-label="With textarea"
        rows="15"
        maxlength="256"
        ref="content"
        v-model="state.content"
      ></textarea>
    </div>
    <div id="writeFileBoard">
      <div class="filebox">
        <label for="writeImgName">업로드</label>
        <input type="file" id="writeImgName"  @change="selectFile" />
      </div>
      <div class="name">
        <div v-for="i in files" :key="i">{{ i.originFileName }}</div>
      </div>
    </div>
    <button
      id="writeDeleteImage"
      type="button"
      class="btn btn-secondary btn-sm"
      @click="deleteImage"
      v-if="files.length != 0"
    >
      삭제하기
    </button>
    <div id="writeBtn">
      <button
        type="button"
        class="btn btn-danger recode"
        @click="registArticle"> 등록하기
      </button>
      <button type="button" class="btn btn-danger recode" onclick="location.href='/board?page=1'">취소하기</button>
    </div>
  </div>
</template>

<script>
import router from "@/router/router";
import "@/css/views/Board/BoardWrite.css";
import { reactive, ref } from "@vue/reactivity";
import axios from "axios";

export default {
  name: "BoardWrite",
  setup() {
    const state = reactive({
      title: "",
      content: "",
      token: sessionStorage.getItem("TOKEN"),
    });
    const title = ref("");
    const content = ref("");
    let files = ref([]);
    let imageName;

    const registArticle = async () => {
      if (state.title === "") {
        alert("제목을 입력해 주세요");
        title.value.focus();
        return false;
      } else if (state.content === "") {
        alert("내용을 입력해 주세요");
        content.value.focus();
        return false;
      }
      if (state.content.length > 255) {
        alert("255글자 이하로 작성해주세요");
        content.value.focus();
        return false;
      }

      const url = "/api/v1/articles ";
      const headers = {
        "Content-Type": "application/json",
        Authorization: state.token,
      };
      const body = {
        title: state.title,
        content: state.content,
        files: files.value,
      };
      await axios
        .post(url, body, { headers })
        .then((res) => {
          if (res.status == 201) {
            alert("글이 등록 되었습니다.");
            router.replace(`/board/${res.data}?page=1`);
          }
        })
        .catch(() => {
          alert("글 등록에 실패하였습니다.");
        });
    };

    const selectFile = (event) => {
      const formData = new FormData();
      for (const file of event.target.files) {
        formData.append("file", file);
      }
      axios
        .post("/api/v1/files", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          if (res.status == 200) {
            files.value = res.data;
            imageName = files.value[0].uploadFileName;
          }
        })
        .catch(() => {
          alert("파일을 업로드 할 수 없습니다");
        });
    };

    const deleteImage = () => {
      const headers = { "Content-Type": "application/json;" };
      axios
        .delete("/api/v1/files?filename=" + imageName, { headers })
        .then((res) => {
          if (res.status == 200) {
            if (res.data) {
              files.value = "";
              document.getElementById("editImgName").value = "";
            }
          }
        })
        .catch(() => alert("파일 삭제를 실패했습니다."));
    };

    return {
      message: "글쓰기",
      state,
      title,
      content,
      files,
      registArticle,
      selectFile,
      deleteImage,
    };
  },
};
</script>
