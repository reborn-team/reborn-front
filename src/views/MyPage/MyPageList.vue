<template lang="ko">
  <MyPageNavVue />
  <div id="myPageList">
    <div id="boardList">
      <BoardList :pageList="pageList" :page="page" />
      <a href="/board/write">
        <button type="button" class="btn btn-danger recode write">Write</button>
      </a>
    </div>

    <!-- 서치 옵션 -->
    <div id="searchBar">
      <select class="form-select" v-model="condition" @click="onClick">
        <option value="" selected disabled>----</option>
        <option value="title">제목</option>
      </select>
      <input class="form-control" type="text" v-model="input" />
      <button type="button" class="btn btn-danger recode search" @click="search">Search</button>
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
import "@/css/views/MyPage/MyPageList.css";
import BoardList from "@/components/Board/List.vue";
import Pagination from "@/components/Board/Pagination.vue";
import MyPageNavVue from "@/components/MyPageNav.vue";
import axios from "axios";
import router from "@/router/router";
import { onMounted, ref } from "@vue/runtime-core";
import { useRoute } from "vue-router";

export default {
  name: "TheBoard",
  components: { BoardList, Pagination, MyPageNavVue },
  setup() {
    onMounted(() => {
      getBoard();
    });

    const pageList = ref();
    const board = ref();
    const page = ref();
    const prev = ref();
    const next = ref();
    const start = ref();
    const end = ref();
    const pageNumberList = ref();
    const totalPage = ref();
    const Token = ref(sessionStorage.getItem("TOKEN"));

    const route = useRoute();
    const currentpage = route.query.page;
    
    const condition = ref("");
    const input = ref("");

    const getBoard = async () => {
      const url = `/api/v1/articles/me?page=1`;
      const headers = {
        "Content-Type": "application/json;",
        Authorization: Token.value,
      };

      axios.get(url,{headers}).then((res) => {
        pageList.value = res.data.pageList;
        page.value = res.data.page;
        prev.value = res.data.prev;
        next.value = res.data.next;
        start.value = res.data.start;
        end.value = res.data.end;
        pageNumberList.value = res.data.pageNumberList;
        totalPage.value = res.data.totalPage;
        board.value = res.data;

        router.replace(`/mypage/list/?page=${currentpage}`);
      });
    };

    const onClick = (res) => {
      condition.value = res.target.value
    }

    const search = () => {
      const url = `/api/v1/articles/me?page=${currentpage}&${condition.value}=${input.value}`;
      axios.get(url).then((res) => {
        pageList.value = res.data.pageList;

        router.replace(`/mypage/list/?page=${currentpage}&${condition.value}=${input.value}`)
        input.value = ""
      })
    }

    return {
      pageList,
      page,
      prev,
      next,
      start,
      end,
      pageNumberList,
      totalPage,
      board,
      currentpage,
      condition,
      input,
      Token,
      getBoard,
      search,
      onClick,
    };
  },
};
</script>
