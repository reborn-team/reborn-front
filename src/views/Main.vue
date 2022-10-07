<template lang="ko">
  <div id="main">
    <div id="banner">
      <video muted autoplay>
        <source src="@/assets/video/banner.mp4" type="video/mp4" />
      </video>
    </div>
    <div id="mainContent">
      <h3>인기 운동</h3>
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
      <BoardList :pageList="pageList"/>
    </div>
  </div>
</template>

<script>
import MainCard from "@/components/Card/Card.vue";
import BoardList from "@/components/Board/List.vue";
import "../css/views/Main.css";
import { ref } from '@vue/reactivity';
import axios from 'axios';
import { onMounted } from '@vue/runtime-core';

export default {
  name: "TheHome",
  components: { MainCard, BoardList },
  setup(){
    const pageList = ref([]);
    const page = ref([]);
    const category = ref();

    const changeCategory = async (i) => {
      if(category.value !== i) {
        category.value = i || "";

        const url = `/api/v1/workout/rank?category=${category.value}`;
  
        axios.get(url).then((res) => {
          if (res.status === 200) {
            page.value = res.data.list;
          }
          
        }).catch(() => {});
      }
    }
    changeCategory("");

    onMounted(() => {
      getBoard();
    });

    const getBoard = async () => {
      const url = `/api/v1/articles/rank`;
      axios.get(url).then((res) => {
        pageList.value = res.data.pageList;
      });
    };

    return { 
      page,
      pageList,
      category,
      getBoard,
      changeCategory,
      message:"운동 리스트"
    }
  }
};
</script>