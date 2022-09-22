<template>
  <div id="workoutMyworkout">
    <h1 class="title">{{ message }}</h1>
    <div id="workoutListNav">
      <button class="btn btn-danger" type="button" @click="changeCategory('')">전체</button>
      <button class="btn btn-danger" type="button" @click="changeCategory('back')">등</button>
      <button class="btn btn-danger" type="button" @click="changeCategory('chest')">가슴</button>
      <button class="btn btn-danger" type="button" @click="changeCategory('lower-body')">하체</button>
      <button class="btn btn-danger" type="button" @click="changeCategory('core')">코어</button>
    </div>
    <hr />
    <div id="WorkoutCard">
      <WorkoutCard :page ="page"/>
    </div>
  </div>
</template>

<script>
import WorkoutCard from "@/components/Card.vue";
import "../css/views/WorkoutMyworkout.css";
import axios from 'axios';
import { ref } from '@vue/reactivity';
import router from '@/router/router';

export default {
  name: "WorkoutList",
  components: { WorkoutCard },
  setup(){
    const page = ref([]);
    const id = ref("");
    let category = "";

    const changeCategory = async (i) =>{
      category = i;
      const url = `/api/v1/workout?id=${id.value}&category=${category}`;
  
      axios.get(url).then(res=>{
        if (res.status === 200) {
          page.value = res.data.page
        }
      }).catch(()=>{
      })
    }
    changeCategory("");

    const addWorkoukList = () => {
      router.push("/workout/create")
    }

    return { 
      page,
      changeCategory,
      addWorkoukList,
      message:"나의 리스트"
    }
  }
};
</script>
