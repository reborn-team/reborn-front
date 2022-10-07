<template>
  <div id="boardPagi" class="pagination-div">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="i in pageNumberList" :key="i">
        <a class="page-link" href="" @click="currentPage(i)">{{ i }} </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true" >&raquo;</span>
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
  ],
  setup() {
    const currentPage = (i) => {
      router.replace(`/mypage/list?page=${i}`)
    };

    return {
      currentPage,
    };
  },
};
</script>
