<template lang="ko">
  <MyPageNavVue />
  <div id="myPageList">
    <div id="boardList">
      <BoardList :pageList="pageList" :page="page" />
      <a href="/board/write">
        <button type="button" class="btn btn-danger recode write">Write</button>
      </a>
    </div>

    <Pagination
      :page="page"
      :pageNumberList="pageNumberList"
      :prev="prev"
      :end="end"
    />
  </div>
</template>

<script>
import "@/css/views/MyPage/MyPageList.css";
import BoardList from "@/components/Board/List.vue";
import Pagination from "@/components/Board/MyPagination.vue";
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

    const board = ref();
    const pageList = ref();
    const page = ref();
    const pageNumberList = ref();
    const prev = ref();
    const end = ref();
    const Token = ref(sessionStorage.getItem("TOKEN"));

    const route = useRoute();
    const currentpage = route.query.page;

    const condition = ref("");
    const input = ref("");

    const getBoard = async () => {
      const url = `/api/v1/articles/me?page=${currentpage}`;
      const headers = {
        "Content-Type": "application/json;",
        Authorization: Token.value,
      };

      axios.get(url, { headers }).then((res) => {
        pageList.value = res.data.pageList;
        page.value = res.data.page;
        prev.value = res.data.prev;
        end.value = res.data.end;
        pageNumberList.value = res.data.pageNumberList;
        board.value = res.data;

        router.replace(`/mypage/list?page=${currentpage}`);
      });
    };

    return {
      pageList,
      page,
      prev,
      end,
      pageNumberList,
      board,
      currentpage,
      condition,
      input,
      Token,
      getBoard,
    };
  },
};
</script>
