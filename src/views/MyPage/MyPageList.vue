<template lang="ko">
  <MyPageNavVue />
  <div id="myPageList">
    <div id="boardList">
      <MyList :pageList="pageList" :page="page" />
      <a href="/mypage/board/write">
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
import MyList from "@/components/MyPage/MyArticle.vue";
import Pagination from "@/components/MyPage/MyPagination.vue";
import MyPageNavVue from "@/components/MyPageNav.vue";
import axios from "axios";
import router from "@/router/router";
import { onMounted, ref } from "@vue/runtime-core";
import { useRoute } from "vue-router";

export default {
  name: "TheBoard",
  components: { MyList, Pagination, MyPageNavVue },
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

        router.replace(`/mypage/board?page=${currentpage}`);
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
