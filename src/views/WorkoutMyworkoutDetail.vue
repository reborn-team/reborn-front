<template lang="ko">
  <div id="workoutDetail">
    <h1 class="title">{{ message }}</h1>
    <div id="detail">
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
        src="../assets/img/noImage.gif"
        alt="Error"
        v-if="Workout.files == 0"
      />
      <div id="detailWrap">
        <div id="workoutCategory">
          <label
            for="category"
            class="col-sm-2 col-form-label col-form-label-sm"
            >운동 부위 :
          </label>
          <div class="workoutItem">
            {{ convertCategoryValue(Workout.workoutCategory) }}
          </div>
        </div>
        <div id="wokroutName">
          <label
            for="workoutName"
            class="col-sm-2 col-form-label col-form-label-sm"
            >운동명 :
          </label>
          <div class="workoutItem">{{ Workout.workoutName }}</div>
        </div>
        <div id="explain">
          <label for="explain" class="col-sm-2 col-form-label col-form-label-sm"
            >설명 :
          </label>
          <div class="workoutExplain">{{ Workout.content }}</div>
        </div>
        <div id="author">
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
    <button type="button" class="btn btn-danger btn-sm" @click="linkMyworkout">
      삭제하기
    </button>
  </div>
</template>

<script>
import router from "@/router/router";
import "../css/views/WorkoutDetail.css";
import { reactive, ref } from "@vue/reactivity";
import axios from "axios";
import { onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";

export default {
  name: "WorkoutDetail",
  setup() {
    onMounted(() => {
      getWorkoutHandler();
    });

    const route = useRoute();
    const Token = ref(sessionStorage.getItem("TOKEN"));
    const WorkoutID = ref(route.params.workoutID);
    const Workout = ref("");

    const viewUrl = (i) => {
      if (i != undefined) {
        return "/api/v1/file/images?filename=" + i;
      }
    };

    async function getWorkoutHandler() {
      const url = `/api/v1/workout/${WorkoutID.value}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: Token.value,
      };
      await axios.get(url, { headers }).then((res) => {
        if (res.status === 200) {
          Workout.value = res.data;
          console.log(res.data);
          console.log(Workout.value);
        }
      });
    }

    const state = reactive({
      category: "",
    });

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

    const linkDeleteWorkout = async () => {
      const url = `/api/v1/workout/${WorkoutID.value}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: Token.value,
      };
      await axios.delete(url, { headers }).then((res) => {
        if (res.status == 204) {
          alert("목록이 삭제되었습니다.");
          router.push(`/workout`);
        }
      });
    };

    const linkList = () => {
      router.push(`/workout/myworkout?category=${route.query.category}`);
      console.log(Workout.value.workoutCategory);
    };

    return {
      message: "운동 정보",
      state,
      Workout,
      WorkoutID,
      getWorkoutHandler,
      convertCategoryValue,
      viewUrl,
      linkList,
      linkDeleteWorkout,
    };
  },
};
</script>
