<template lang="ko">
  <div id="myWorkoutDetail">
    <h1 class="title">{{ message }}</h1>
    <div id="myDetail">
      <div v-for="i in Workout.files" :key="i">
        <img
          :src="viewUrl(i.uploadFileName)"
          class="card-img-top"
          alt="No image"
          v-if="Workout.files != 0"
          onerror="this.src='https://place-hold.it/300x300/666/fff/000.gif'"
        />
      </div>
      <img
        src="@/assets/img/noImage.gif"
        alt="Error"
        v-if="Workout.files == 0"
      />
      <div id="myDetailWrap">
        <div id="myWorkoutCategory">
          <label
            for="category"
            class="col-sm-2 col-form-label col-form-label-sm"
            >운동 부위 :
          </label>
          <div class="myWorkoutItem">
            {{ convertCategoryValue(Workout.workoutCategory) }}
          </div>
        </div>
        <div id="myWokroutName">
          <label
            for="workoutName"
            class="col-sm-2 col-form-label col-form-label-sm"
            >운동명 :
          </label>
          <div class="workoutItem">{{ Workout.workoutName }}</div>
        </div>
        <div id="myExplain">
          <label for="explain" class="col-sm-2 col-form-label col-form-label-sm"
            >설명 :
          </label>
          <div class="workoutExplain">{{ Workout.content }}</div>
        </div>
        <div id="myAuthor">
          <label for="author" class="col-sm-2 col-form-label col-form-label-sm"
            >작성자 :
          </label>
          <div class="author">{{ Workout.memberNickname }}</div>
        </div>
      </div>
    </div>
    <button type="button" class="btn btn-danger btn-sm" @click="linkList">
      목록으로
    </button>
    <button type="button" class="btn btn-secondary btn-sm" @click="deleteList">
      제외하기
    </button>
  </div>
</template>

<script>
import "@/css/views/MyWorkout/WorkoutMyworkoutDetail.css";
import router from "@/router/router";
import { reactive, ref } from "@vue/reactivity";
import axios from "axios";
import { onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";

export default {
  name: "WorkoutMyworkoutDetail",
  setup() {
    const state = reactive({
      category: "",
    });
    const route = useRoute();
    const Token = ref(sessionStorage.getItem("TOKEN"));
    const WorkoutID = ref(route.params.workoutID);
    const Workout = ref("");

    onMounted(() => {
      getWorkoutHandler();
    });

    const viewUrl = (i) => {
      if (i != undefined) {
        return "/api/v1/files/images?filename=" + i;
      }
    };

    async function getWorkoutHandler() {
      const url = `/api/v1/workouts/${WorkoutID.value}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: Token.value,
      };
      await axios.get(url, { headers }).then((res) => {
        if (res.status === 200) {
          Workout.value = res.data;
        }
      });
    }


    const convertCategoryValue = (category) => {
      switch (category) {
        case "BACK":
          return "등";
        case "CHEST":
          return "가슴";
        case "LOWER_BODY":
          return "하체";
        case "CORE":
          return "코어";
      }
    };

    const deleteList = async () => {
      const url = `/api/v1/workouts/me/${WorkoutID.value}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: Token.value,
      };
      await axios.delete(url, { headers }).then((res) => {
        if (res.status == 204) {
          alert("목록이 제외되었습니다.");
          router.replace(`/workout/me`);
        }
      }).catch(()=>{
        alert("목록이 삭제를 실패하였습니다.")
      });
    };

    const linkList = () => {
      router.replace(`/workout/me?category=${route.query.category}`);
    };

    return {
      message: "나의 리스트 정보",
      state,
      Workout,
      WorkoutID,
      getWorkoutHandler,
      convertCategoryValue,
      viewUrl,
      linkList,
      deleteList,
    };
  },
};
</script>
