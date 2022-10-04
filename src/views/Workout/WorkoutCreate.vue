<template lang="ko">
  <div id="workoutCreate">
    <h1 class="title">{{ message }}</h1>
    <div id="Create">
      <div v-for="i in files" :key="i">
        <img
          id="uploadImg"
          :src="viewUrl(i.uploadFileName)"
          class="card-img-top"
          alt="No Image"
        />
      </div>
      <img
        src="@/assets/img/noImage.gif"
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
            rows="8"
            ref="content"
            v-model="state.content"
          ></textarea>
        </div>
      </div>
    </div>
    <div id="insert">
      <div id="fileUpload">
        <div class="filebox">
          <label for="editImgName">업로드</label>
          <input type="file" id="editImgName" @change="selectFile" />
        </div>
      <div class="name">
        <div v-for="i in files" :key="i">{{ i.originFileName }}</div>
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
      class="btn btn-secondary btn-sm"
      @click="deleteImage"
      v-if="files.length != 0"
    >
      삭제하기
    </button>
  </div>
</template>

<script>
import router from "@/router/router";
import "@/css/views/Workout/WorkoutCreate.css";
import { reactive, ref } from "@vue/reactivity";
import axios from "axios";
export default {
  name: "WorkoutDetail",
  setup() {
    const state = reactive({
      workoutCategory: "부위",
      workoutName: "",
      content: "",
      viewURL: "",
      token: sessionStorage.getItem("TOKEN"),
    });
    const workoutCategory = ref("");
    const workoutName = ref("");
    const content = ref("");
    let files = ref([]);
    let imageName;

    const createHandler = async () => {
      if (state.workoutCategory === "") {
        alert("카테고리를 선택해 주세요");
        workoutCategory.value.focus();
        return false;
      } else if (state.workoutName === "") {
        alert("운동 이름을 입력해주세요");
        workoutName.value.focus();
        return;
      } else if (state.content == "") {
        alert("운동에 대해 간단히 알려주세요");
        content.value.focus();
        return false;
      }

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
          console.log(res.data)
          if (res.status === 201) {
            alert("운동이 등록 되었습니다.");
            router.push(
              `/workout/${res.data.saveId}?category=${state.workoutCategory}`
            );
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
            imageName = files.value[0].uploadFileName;
            console.log(imageName);
          }
        })
        .catch(() => {
          alert("파일을 업로드 할 수 없습니다");
        });
    };

    const deleteImage = () => {
      const headers = { "Content-Type": "application/json;" };

      axios
        .delete("/api/v1/file?filename=" + imageName, { headers })
        .then((res) => {
          if (res.status == 200) {
            if (res.data) {
              files.value = "";
              imageName = undefined;
              document.getElementById("imgName").value = "";
            }
          }
        })
        .catch((err) => console.log(err));
    };

    const viewUrl = (i) => {
      return "/api/v1/file/images?filename=" + i;
    };

    const linkList = () => {
      router.push("/workout");
    };

    return {
      linkList,
      createHandler,
      selectFile,
      deleteImage,
      viewUrl,
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
