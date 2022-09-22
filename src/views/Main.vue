<template>
  <div id="main">
    <div id="banner">
      <video muted autoplay>
        <source src="@/assets/video/banner.mp4" type="video/mp4" />
      </video>
    </div>
    <div id="mainContent">
      <div id="workoutNav">
        <div class="gap-3 d-md-flex">
          <button class="btn btn-danger" type="button" @click="changeCategory('')">전체</button>
          <button class="btn btn-danger" type="button" @click="changeCategory('back')">등</button>
          <button class="btn btn-danger" type="button" @click="changeCategory('chest')">가슴</button>
          <button class="btn btn-danger" type="button" @click="changeCategory('lower-body')">하체</button>
          <button class="btn btn-danger" type="button" @click="changeCategory('core')">코어</button>
        </div>
      </div>
      <hr />
      <div id="MainCard">
        <MainCard :page ="page"/>
      </div>
        <h3>인기 운동일지</h3>
      <hr />
      <BoardList />
    </div>
  </div>
</template>

<script>
import MainCard from "@/components/Card.vue";
import BoardList from "@/components/List.vue";
import "../css/views/Main.css";
import { ref } from '@vue/reactivity';
import axios from 'axios';

export default {
  name: "TheHome",
  components: { MainCard, BoardList },
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

    return { 
      page,
      changeCategory,
      message:"운동 리스트"
    }
  }
};
</script>
