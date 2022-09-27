<template lang="ko">
  <div id="workoutMyworkout">
    <h1 class="title">{{ message }}</h1>
    <div id="MyworkoutListNav">
      <button class="btn btn-danger" type="button" @click="changeCategory('')">전체</button>
      <button class="btn btn-danger" type="button" @click="changeCategory('back')">등</button>
      <button class="btn btn-danger" type="button" @click="changeCategory('chest')">가슴</button>
      <button class="btn btn-danger" type="button" @click="changeCategory('lower-body')">하체</button>
      <button class="btn btn-danger" type="button" @click="changeCategory('core')">코어</button>
    </div>
    <hr />
    <div id="MyWorkoutCard">
      <MyWorkoutCard :page ="page"/>
    </div>
  </div>
</template>

<script>
import MyWorkoutCard from "@/components/MyworkoutCard.vue";
import "../css/views/WorkoutMyworkout.css";
import axios from 'axios';
import { ref } from '@vue/reactivity';
// import router from '@/router/router';

export default {
  name: "WorkoutList",
  components: { MyWorkoutCard },
  setup(){
    const page = ref([]);
    const id = ref("");
    const Token = ref(sessionStorage.getItem("TOKEN"));
    let category = "";

    const changeCategory = async (i) =>{
      category = i;
      const url = `/api/v1/my-workout?id=${id.value}&category=${category}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: Token.value,
      }
      await axios.get(url, {headers}).then(res=>{
        if (res.status === 200) {
          page.value = res.data.page
          console.log(res.data)
          console.log(page.value)
          console.log(Token.value)

          // router.replace(`/workout/myworkout?category=${category}`);
        }
      }).catch(()=>{
      })
    }
    changeCategory("");

    return { 
      page,
      changeCategory,
      message:"나의 리스트"
    }
  }
};
</script>
