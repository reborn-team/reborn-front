<template>
  <div id="MyBoardPagi" class="pagination-div">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" aria-label="Previous" href="" v-if="prev" @click="prevPage">
          <span aria-hidden="true" @click="prevPage">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="i in pageNumberList" :key="i">
        <a class="page-link" href="" @click="currentPage(i)">{{ i }} </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="" aria-label="Next" @click="nextPage" v-if="page<end">
          <span aria-hidden="true" @click="nextPage" >&raquo;</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import router from '@/router/router';
export default {
  name: "ThePaginamtion",
  props: [
    "page",
    "pageNumberList",
    "prev",
    "end",
  ],
  setup(props) {
    const currentPage = (i) => {
      router.replace(`/mypage/board?page=${i}`);
    };

    const prevPage = () => {
      router.replace(`/mypage/board?page=${props.page-1}`);
    };

    const nextPage = () => {
      router.replace(`/mypage/board?page=${props.page+1}`);
    };

    return {
      currentPage,
      prevPage,
      nextPage,
    };
  },
};
</script>
