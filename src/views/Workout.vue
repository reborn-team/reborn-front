<template lang="ko">
  <div id="workout">
    <h1 class="title">{{ message }}</h1>

    <div id="workoutSearch">
      <select class="form-select">
        <option value="1">제목</option>
        <option value="2">작성자</option>
      </select>
      <input class="form-control" type="text" />
      <button type="button" class="btn btn-danger recode search">찾기</button>
    </div>

    <div id="workoutListNav">
      <button class="btn btn-danger" type="button" @click="changeCategory('')">전체</button>
      <button class="btn btn-danger" type="button" @click="changeCategory('back')">등</button>
      <button class="btn btn-danger" type="button" @click="changeCategory('chest')">가슴</button>
      <button class="btn btn-danger" type="button" @click="changeCategory('lower-body')">하체</button>
      <button class="btn btn-danger" type="button" @click="changeCategory('core')">코어</button>
      <button class="btn btn-danger" id="add" @click="addWorkoukList">추가</button>
    </div>
    <hr />
    <div id="WorkoutCard">
      <WorkoutCard :page="page" :category="category" />
    </div>
    <button id="addBtn" class="btn btn-danger" type="button" @click="addCard" v-if="hasNext.valueOf(true)">더보기</button>
  </div>
</template>

<script>
import WorkoutCard from "@/components/Card.vue";
import "../css/views/Workout.css";
import router from "@/router/router";
import { ref } from "@vue/runtime-core";
import axios from "axios";
import { useRoute } from "vue-router";

export default {
  name: "TheWorkout",
  components: { WorkoutCard },
  setup() {
    const ROUTE = useRoute();
    const page = ref([]);
    const id = ref();
    const category = ref();
    const hasNext = ref(true);

    const changeCategory = async (i) => {
      if (category.value !== i) {
        category.value = i || "";
        id.value = "";
        const url = `/api/v1/workout?id=${id.value}&category=${category.value}`;

        axios
          .get(url)
          .then((res) => {
            if (res.status === 200) {
              if (res.data.hasNext) {
                res.data.page.pop();
              }
              page.value = res.data.page;
              id.value = res.data.page[res.data.page.length - 1].workoutId;
              hasNext.value = res.data.hasNext;

              router.replace(`/workout?category=${category.value}`);
            }
          })
          .catch(() => {});
      }
    };
    changeCategory(ROUTE.query.category || "");

    const addCard = () => {
      const url = `/api/v1/workout?id=${id.value}&category=${category.value}`;
      if (hasNext.value) {
        axios
          .get(url)
          .then((res) => {
            if (res.status === 200) {
              if (res.data.hasNext) {
                res.data.page.pop();
              }
              page.value = page.value.concat(res.data.page);
              id.value = res.data.page[res.data.page.length - 1].workoutId;
              hasNext.value = res.data.hasNext;
            }
          })
          .catch(() => {});
      }
    };

    const addWorkoukList = () => {
      router.push("/workout/create");
    };

    return {
      page,
      category,
      hasNext,
      changeCategory,
      addWorkoukList,
      addCard,
      message: "운동 리스트",
    };
  },
};
</script>
