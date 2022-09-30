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
        maxlength="300"
        ref="content"
        v-model="state.content"
      ></textarea>
    </div>
    <div class="fileUpload">
      <div class="form-group centerz">
        <input type="file" @change="selectFile" class="form-control" accept="image/*"/>
      </div>
    </div>
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
import { reactive, ref } from '@vue/reactivity';
import axios from 'axios';

export default {
  name: "BoardWrite",
  setup() {

    const state = reactive({
      title: "",
      content: "",
      originFileName: "",
      uploadFileName: "",
      token: sessionStorage.getItem("TOKEN"),
    })
    const title = ref("");
    const content = ref("");
    let files = ref([]);
    let originFileName = ref("");
    let uploadFileName = ref("");

    const registArticle = async() => {
      const url = "/api/v1/articles ";
      const headers = {
        "Content-Type": "application/json",
        Authorization: state.token,
      };
      const body = {
        title: state.title,
        content: state.content,
        originFileName: state.originFileName,
        uploadFileName: state.uploadFileName,
      };
      await axios.post(url, body, {headers}).then((res)=>{
        console.log(state.originFileName)
        console.log(state.uploadFileName)
        console.log(res.data);
        if(res.status==201){
          alert("글이 등록 되었습니다.")
        }
      })

      router.push("/board?page=1");
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
            console.log(originFileName)
            console.log(uploadFileName)
          }
        })
        .catch(() => {
          alert("파일을 업로드 할 수 없습니다");
        });
    };

    return { 
      message: "글쓰기" ,
      state,
      title,
      content,
      registArticle,
      selectFile,
    };
  },
};
</script>
