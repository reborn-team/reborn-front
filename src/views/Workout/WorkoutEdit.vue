<template lang="ko">
  <div id="workoutEdit">
    <h1 class="title">{{ message }}</h1>
    <div id="edit">
      <div v-for="i in Workout.files" :key="i">
        <img
          id="uploadImg"
          :src="viewUrl(i.uploadFileName)"
          class="card-img-top"
          alt="No Image"
          v-if="files.length==0"
          onerror="this.src='https://place-hold.it/300x300/666/fff/000.gif'"
        />
      </div>
      <img
        src="@/assets/img/noImage.gif"
        alt="Error"
        v-if="Workout.files==0 && files.length==0"
      />
      <div v-for="i in files" :key="i">
        <img
          id="uploadImg"
          :src="viewUrl(i.uploadFileName)"
          class="card-img-top"
          alt="No Image"
        />
      </div>
      <div id="editWrap">
        <div id="editCategory">
          <label
            for="editCategory"
            class="col-sm-2 col-form-label col-form-label-sm"
            >카테고리 :
          </label>
          <select
            class="form-select"
            aria-label="Default select example"
            ref="editCategory"
            v-model="state.editCategory"
            disabled
          >
            <option selected disabled>부위</option>
            <option value="BACK">등</option>
            <option value="CHEST">가슴</option>
            <option value="LOWER_BODY">하체</option>
            <option value="CORE">코어</option>
          </select>
        </div>
        <div id="editName">
          <label
            for="editName"
            class="col-sm-2 col-form-label col-form-label-sm"
            >운동명 :
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control form-control-sm"
              ref="editName"
              v-model="state.editName"
              minlength="1"
              maxlength="20"
            />
          </div>
        </div>
        <div id="editContent">
          <label for="content" class="col-sm-2 col-form-label col-form-label-sm"
            >설명 :
          </label>
          <textarea
            class="form-control"
            aria-label="With textarea"
            rows="8"
            ref="editContent"
            v-model="state.editContent"
            style="resize: none"
            minlength="5"
            maxlength="150"
          ></textarea>
        </div>
      </div>
    </div>
    <div id="editInsert">
      <div id="editFileUpload">
        <div class="filebox">
          <label for="editImgName">업로드</label>
          <input type="file" id="editImgName" @change="selectFile" />
        </div>
        <div class="name">
          <div v-if="files.length==0">{{ originFile }}</div>
          <div v-for="i in files" :key="i">{{ i.originFileName }}</div>
        </div>
      </div>
      <div id="editInsertBtn">
        <button
          type="button"
          class="btn btn-warning btn-sm"
          @click="modifyHandler"
        >
          수정하기
        </button>
        <button type="button" class="btn btn-danger btn-sm" @click="linkList">
          취소하기
        </button>
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
  </div>
</template>

<script>
import "@/css/views/Workout/WorkoutEdit.css";
import router from "@/router/router";
import { reactive, ref } from "@vue/reactivity";
import axios from "axios";
import { useRoute } from "vue-router";
import { onMounted } from "@vue/runtime-core";

export default {
  name: "WorkoutDetail",
  setup() {
    const state = reactive({
      editCategory: "",
      editName: "",
      editContent: "",
      viewURL: "",
      token: sessionStorage.getItem("TOKEN"),
    });
    const route = useRoute();
    const WorkoutID = ref(route.params.workoutID);
    const Workout = ref("");
    const editCategory = ref("");
    const editName = ref("");
    const editContent = ref("");
    let files = ref([]);
    let imageName = ref("");
    let originFile = ref("");

    const modifyHandler = async () => {
      if (state.editName === "") {
        alert("운동명을 입력해주세요");
        editName.value.focus();
        return;
      } else if (state.editContent == "") {
        alert("운동에 대해 간단히 알려주세요");
        editContent.value.focus();
        return false;
      } else if (state.editContent.length < 5) {
        alert("최소 5글자 이상 입력해주세요");
      }

      const url = `/api/v1/workout/${WorkoutID.value}`;
      const headers = {
        "Content-Type": "application/json;",
        Authorization: state.token,
      };
      const body = {
        workoutName: state.editName,
        content: state.editContent,
        files: files.value,
      };
      await axios
        .patch(url, body, { headers })
        .then(function (res) {
          if (res.status === 204) {
            alert("운동이 수정 되었습니다.");
            router.replace("/workout/" + res.data);
          }
        })
        .catch(() => {
        });
    };

    onMounted(() => {
      getEditHandler();
    });

    async function getEditHandler() {
      const url = `/api/v1/workout/${WorkoutID.value}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: state.token,
      };
      await axios.get(url, { headers }).then((res) => {
        if (res.status === 200) {
          Workout.value = res.data;
          state.editCategory = Workout.value.workoutCategory;
          state.editName = Workout.value.workoutName;
          state.editContent = Workout.value.content;
          state.uploadFileName = Workout.value.uploadFileName;
          originFile.value = Workout.value.files[0].originFileName;
        }
      });
    }

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
              document.getElementById("editImgName").value = "";
            }
          }
        })
        .catch();
    };

    const viewUrl = (i) => {
      if (i != undefined) {
        return "/api/v1/file/images?filename=" + i;
      }
    };

    const linkList = () => {
      router.replace("/workout");
    };

    return {
      linkList,
      modifyHandler,
      selectFile,
      deleteImage,
      viewUrl,
      getEditHandler,
      state,
      files,
      imageName,
      Workout,
      WorkoutID,
      editCategory,
      originFile,
      editName,
      editContent,
      message: "수정하기",
    };
  },
};
</script>
