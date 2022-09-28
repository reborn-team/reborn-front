<template lang="ko">
  <div id="board">
    <div id="boardList">
      <h1 class="title">{{ message }}</h1>
      <BoardList :pageList="pageList" />
      <a href="/board/write">
        <button type="button" class="btn btn-danger recode write">Write</button>
      </a>
    </div>

    <!-- 서치 옵션 -->
    <div id="searchBar">
      <select class="form-select">
        <option value="1">제목</option>
        <option value="2">작성자</option>
      </select>
      <input class="form-control" type="text" />
      <button type="button" class="btn btn-danger recode search">Search</button>
    </div>
    
    <Pagination
      :page="page"
      :prev="prev"
      :next="next"
      :start="start"
      :end="end"
      :pageNumberList="pageNumberList"
      :totalPage="totalPage"
    />

  </div>
</template>

<script>
import axios from 'axios';
import BoardList from "../components/Board/List.vue";
import Pagination from '@/components/Board/Pagination.vue';
import "../css/views/Board.css";
import { onMounted, ref } from '@vue/runtime-core';

export default {
  name: "TheBoard",
  components: { BoardList, Pagination },
  setup(){

    onMounted(()=>{
      getBoard();
    })

    const pageList = ref();
    const board = ref();
    const page = ref();
    const prev = ref();
    const next = ref();
    const start = ref();
    const end = ref();
    const pageNumberList = ref();
    const totalPage = ref();

    const getBoard = async() => {
      const url = "api/v1/articles"

      axios.get(url).then((res)=>{
        pageList.value = res.data.pageList;
        page.value = res.data.page;
        prev.value = res.data.prev;
        next.value = res.data.next;
        start.value = res.data.start;
        end.value = res.data.end;
        pageNumberList.value = res.data.pageNumberList;
        totalPage.value = res.data.totalPage;
        board.value = res.data;
        console.log(board.value)
        console.log(pageList.value)
      })
    }

    return{
      message:"Board",
      pageList,
      page,
      prev,
      next,
      start,
      end,
      pageNumberList,
      totalPage,
      board,
      getBoard
    }
  }
};
</script>
