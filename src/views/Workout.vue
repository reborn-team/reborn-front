<template>
  <div id="workoutList">
    <h1 class="title">{{ message }}</h1>
    <div id="workoutListNav">
      <button class="btn btn-danger" type="button">전체</button>
      <button class="btn btn-danger" type="button">등</button>
      <button class="btn btn-danger" type="button">가슴</button>
      <button class="btn btn-danger" type="button">하체</button>
      <button class="btn btn-danger" type="button">코어</button>
      <button class="btn btn-danger" id="add" @click="addWorkoukList">
        추가
      </button>
    </div>
    <hr />
    <div id="WorkoutCard">
      <WorkoutCard :getListItem="getListItem"/>
    </div>
  </div>
</template>

<script>
import WorkoutCard from "@/components/Card.vue";
import "../css/views/WorkoutList.css";
import router from '@/router/router';
import { onMounted, ref } from '@vue/runtime-core';
import axios from 'axios';

export default {
  name: "WorkoutList",
  components: { WorkoutCard },
  setup(){

    const Token = ref(sessionStorage.getItem("TOKEN"));
    const page = ref([]);
    const id = ref(97);
    const category = ref("BACK");

    onMounted(() => {
      getListItem();
    });

    async function getListItem() {
      const url = `/api/v1/workout?id=${id.value}&category=${category.value}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: Token.value,
      };
      await axios.get(url, { headers }).then((res) => {
        if (res.status === 200) {
          page.value = res.data.page;
          console.log(page.value)
        }
      });
    }

    const addWorkoukList = () => {
      router.push("/workout/create")
    }

    return { 
      addWorkoukList,
      message:"운동 리스트"
    }
  }
};
</script>
