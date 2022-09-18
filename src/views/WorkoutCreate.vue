<template>
  <div id="workoutCreate">
    <h1 class="title">{{ message }}</h1>
    <div id="Create">
      <div v-for="i in files" :key="i">
        <img
          id="uploadImg"
          :src="'/api/v1/file/images?filename=' + i.uploadFileName"
          class="card-img-top"
          alt="No Image"
        />
        <h1 id="imgUrl" hidden>{{i.uploadFileName}}</h1>
      </div>
      <img
        src="https://place-hold.it/300x300/666/fff/000.gif"
        alt="Error"
        v-if="files.length == 0"
      />

      <div id="createWrap">
        <div id="category">
          <label
            for="workoutCategory"
            class="col-sm-2 col-form-label col-form-label-sm"
            >카테고리 :
          </label>
          <select
            class="form-select"
            aria-label="Default select example"
            ref="workoutCategory"
            v-model="state.workoutCategory"
          >
            <option selected disabled>부위</option>
            <option value="BACK">등</option>
            <option value="CHEST">가슴</option>
            <option value="LOWER_BODY">하체</option>
            <option value="CORE">코어</option>
          </select>
        </div>
        <div id="woName">
          <label
            for="workoutName"
            class="col-sm-2 col-form-label col-form-label-sm"
            >운동명 :
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control form-control-sm"
              ref="workoutName"
              v-model="state.workoutName"
            />
          </div>
        </div>
        <div id="woContent">
          <label for="content" class="col-sm-2 col-form-label col-form-label-sm"
            >설명 :
          </label>
          <textarea
            class="form-control"
            aria-label="With textarea"
            rows="7"
            ref="content"
            v-model="state.content"
          ></textarea>
        </div>
      </div>
    </div>
    <div id="insert">
      <div id="fileUpload">
        <div class="form-group centerz">
          <input type="file" @change="selectFile" class="form-control" />
        </div>
      </div>
      <div id="insertBtn">
        <button
          type="button"
          class="btn btn-danger btn-sm"
          @click="createHandler"
        >
          등록하기
        </button>
        <button type="button" class="btn btn-danger btn-sm" @click="linkList">
          취소하기
        </button>
      </div>
    </div>
    <button
      id="deleteImage"
      type="button"
      class="btn btn-danger btn-sm"
      @click="deleteImage"
      v-if="files.length != 0"
    >
      삭제하기
    </button>
  </div>
</template>

<script>
import router from "@/router/router";
import "../css/views/WorkoutCreate.css";
import { reactive, ref } from "@vue/reactivity";
import axios from "axios";

export default {
  name: "WorkoutDetail",
  setup() {
    const state = reactive({
      workoutCategory: "",
      workoutName: "",
      content: "",
      viewURL: "",
      token: sessionStorage.getItem("TOKEN"),
    });
    const workoutCategory = ref("");
    const workoutName = ref("");
    const content = ref("");
    let files = ref([]);

    const createHandler = async () => {
      const url = "/api/v1/workout";
      const headers = {
        "Content-Type": "application/json;",
        Authorization: state.token,
      };
      const body = {
        workoutCategory: state.workoutCategory,
        workoutName: state.workoutName,
        content: state.content,
        files: files.value,
      };
      await axios
        .post(url, body, { headers })
        .then(function (res) {
          if (res.status === 201) {
            alert("운동이 등록 되었습니다.");
            router.push("/workout/" + res.data);
          }
        })
        .catch(() => {
          alert("등록에 실패했습니다");
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
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    };

    const deleteImage = () => {
      const imgUrl = document.getElementById("imgUrl").innerText
      
      const body = { uploadFileName: imgUrl}
      const headers = {"Content-Type": "application/json",};
      console.log(imgUrl)
      axios.delete("/api/v1/file", body, {headers}).then((res)=>{
        if(res.status==200){
          console.log("이미지 삭제")
        }
      })
    }

    const linkList = () => {
      router.push("/workout");
    };

    return {
      linkList,
      createHandler,
      selectFile,
      deleteImage,
      state,
      files,
      workoutCategory,
      workoutName,
      content,
      message: "운동 생성",
    };
  },
};
</script>
