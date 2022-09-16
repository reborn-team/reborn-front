<template>
  <div id="workoutList">
    <h1 class="title">{{ message }}</h1>
    <div id="workoutListNav">
      <button class="btn btn-danger" type="button" @click="changeCategory('BACK')">등</button>
      <button class="btn btn-danger" type="button" @click="changeCategory('CHEST')">가슴</button>
      <button class="btn btn-danger" type="button" @click="changeCategory('LOWER_BODY')">하체</button>
      <button class="btn btn-danger" type="button" @click="changeCategory('CORE')">코어</button>
      <button class="btn btn-danger" id="add" @click="addWorkoukList">
        추가
      </button>
    </div>
    <hr />
    <div id="WorkoutCard">
      <WorkoutCard :page ="page"/>
    </div>
  </div>
</template>

<script>
import WorkoutCard from "@/components/Card.vue";
import "../css/views/WorkoutList.css";
import router from '@/router/router';
import { ref } from '@vue/runtime-core';
import axios from 'axios';

export default {
  name: "WorkoutList",
  components: { WorkoutCard },
  setup(){

    const page = ref([]);
    const id = ref(97);
    let category = "";
    const Token = ref(sessionStorage.getItem("TOKEN"));

    const changeCategory = async (i) =>{
      category = i;
      console.log(category)
      const url = `/api/v1/workout?id=${id}&category=${category}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: Token.value,
      };
      axios.get(url, { headers }).then(res=>{
        if (res.status === 200) {
        page.value = res.data.page
        console.log(res.data)
        }
      });
   
      
    }

    const madeBox = async () => {
      const url = `/api/v1/workout?id=${id}&category=${category}`;
      const response = await axios.get(url);
      if (response.status === 200) {
        page.value = response.data.page
        console.log(response.data)
        
      } 
    };
    

    const addWorkoukList = () => {
      router.push("/workout/create")
    }

    return { 
      page,
      changeCategory,
      madeBox,
      addWorkoukList,
      message:"운동 리스트"
    }
  }
};
</script>
