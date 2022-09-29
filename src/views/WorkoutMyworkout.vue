<template lang="ko">
  <div id="workoutMyworkout">
    <h1 class="title">{{ message }}</h1>

    <div id="myWorkoutSearch">
      <select class="form-select" v-model="condition" @click="onClick">
        <option value="" disabled>----</option>
        <option value="title">제목</option>
        <option value="nickname">작성자</option>
      </select>
      <input class="form-control" type="text" v-model="input"/>
      <button type="button" class="btn btn-danger recode search" @click="search">찾기</button>
    </div>

    <div id="MyworkoutListNav">
      <button class="btn btn-danger" type="button" @click="changeCategory('')">전체</button>
      <button class="btn btn-danger" type="button" @click="changeCategory('back')">등</button>
      <button class="btn btn-danger" type="button" @click="changeCategory('chest')">가슴</button>
      <button class="btn btn-danger" type="button" @click="changeCategory('lower-body')">하체</button>
      <button class="btn btn-danger" type="button" @click="changeCategory('core')">코어</button>
    </div>
    <hr />
    <div id="MyWorkoutCard">
      <MyWorkoutCard :page ="page" :category="category"/>
    </div>
    <button id="addBtn" class="btn btn-danger" type="button" @click="addCard" v-if="hasNext.valueOf(true)">더보기</button>
  </div>
</template>

<script>
import MyWorkoutCard from "@/components/MyworkoutCard.vue";
import "../css/views/WorkoutMyworkout.css";
import axios from "axios";
import { ref } from "@vue/reactivity";
import router from "@/router/router";
import { useRoute } from "vue-router";

export default {
  name: "WorkoutList",
  components: { MyWorkoutCard },
  setup() {
    const ROUTE = useRoute();
    const page = ref([]);
    const id = ref();
    const category = ref();
    const hasNext = ref(true);
    const Token = ref(sessionStorage.getItem("TOKEN"));

    const condition = ref("");
    const input = ref("");

    const changeCategory = async (i) => {
      if (category.value !== i) {
        category.value = i || "";
        id.value = "";
        const url = `/api/v1/my-workout?id=${id.value}&category=${category.value}`;
        const headers = {
          "Content-Type": "application/json",
          Authorization: Token.value,
        };

        axios
          .get(url, { headers })
          .then((res) => {
            if (res.status === 200) {
              if (res.data.hasNext) {
                res.data.page.pop();
              }
              page.value = res.data.page;
              id.value = res.data.page[res.data.page.length - 1].myWorkoutId;
              hasNext.value = res.data.hasNext;
              console.log(res.data);

              router.replace(`/workout/me?category=${category.value}`);
            }
          })
          .catch(() => {});
      }
    };
    changeCategory(ROUTE.query.category || "");

    const addCard = () => {
      const url = `/api/v1/my-workout?id=${id.value}&category=${category.value}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: Token.value,
      };
      if (hasNext.value) {
        axios
          .get(url, { headers })
          .then((res) => {
            console.log(url);
            if (res.status === 200) {
              if (res.data.hasNext) {
                res.data.page.pop();
              }
              page.value = page.value.concat(res.data.page);
              id.value = res.data.page[res.data.page.length - 1].myWorkoutId;
              hasNext.value = res.data.hasNext;
            }
          })
          .catch(() => {});
      }
    };

    const onClick = (res) => {
      condition.value = res.target.value;
      console.log(condition.value);
    };

    const search = () => {
      const url = `/api/v1/my-workout?category=${category.value}&${condition.value}=${input.value}`;
      const headers = {
        "Content-Type": "application/json",
          Authorization: Token.value,
      }
      axios.get(url,{headers}).then((res) => {
        if (res.status === 200) {
          if (res.data.hasNext) {
            res.data.page.pop();
          }
          page.value = res.data.page;
          hasNext.value = res.data.hasNext;
          if(res.data.page.length!=0){
            id.value = res.data.page[res.data.page.length - 1].workoutId;
          }

          console.log(url)
          console.log(res.data)

          router.replace(`/workout/me?category=${category.value}`);
        }
      });
    };

    return {
      page,
      category,
      hasNext,
      condition,
      input,
      changeCategory,
      addCard,
      onClick,
      search,
      message: "나의 리스트",
    };
  },
};
</script>
