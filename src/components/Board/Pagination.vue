<template>
  <div id="boardPagi" class="pagination-div">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" aria-label="Previous" v-if="prev" @click="prevPage">
          <span aria-hidden="true" >&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="i in pageNumberList" :key="i">
        <a class="page-link" href="" @click="currentPage(i)">{{ i }} </a>
      </li>
      <li class="page-item" v-if="next">
        <a class="page-link" @click="nextPage">
          <span aria-hidden="true" >&raquo;</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import router from "@/router/router";
export default {
  name: "ThePaginamtion",
  props: [
    "page",
    "pageNumberList",
    "prev",
    "next",
    "start",
    "end",
    "totalPage",
    "currentpage"
  ],
  setup(props) {
    const currentPage = (i) => {
      router.replace(`/board?page=${i}`);
    };

    const prevPage = () => {
      console.log(props.currentpage-1)
      router.replace(`/board?page=${props.currentpage-1}`);
    };

    const nextPage = () => {
        props.start + 10;
        props.end + 10;
        router.replace(`/board?page=${props.start+1}`);
    };

    return {
      currentPage,
      prevPage,
      nextPage,
    };
  },
};
</script>
