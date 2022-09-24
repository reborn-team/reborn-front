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
        <MainCard :page ="page" :category="category"/>
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
// import router from "@/router/router";
import { ref } from '@vue/reactivity';
import axios from 'axios';

export default {
  name: "TheHome",
  components: { MainCard, BoardList },
  setup(){
    const page = ref([]);
    const id = ref("");
    const category = ref();
    const hasNext = ref(true);

    const changeCategory = async (i) => {
      console.log(category.value !== i)
      if(category.value !== i) {
        category.value = i || "";
        id.value = "";
        const url = `/api/v1/workout?id=${id.value}&category=${category.value}`;
  
        axios.get(url).then((res) => {
          if (res.status === 200) {
            if (res.data.hasNext){
              res.data.page.pop()   
            }
            page.value = res.data.page;
            id.value = res.data.page[res.data.page.length - 1].workoutId;
            hasNext.value = res.data.hasNext;
          }
          
        }).catch(() => {});
      }
    }
    changeCategory("");

    return { 
      page,
      category,
      changeCategory,
      message:"운동 리스트"
    }
  }
};
</script>
