<template>
  <div id="boardPagi" class="pagination-div">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" aria-label="Previous" v-if="prev">
          <span aria-hidden="true" @click="prevPage">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="i in pageNumberList" :key="i">
        <a class="page-link" href="" @click="currentPage(i)">{{ i }} </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next" v-if="next">
          <span aria-hidden="true" @click="nextPage">&raquo;</span>
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
  ],
  setup(props) {
    const currentPage = (i) => {
      router.push(`/board?page=${i}`);
    };

    const prevPage = () => {
      props.start - 10;
      props.end - 10;
      if (props.page < 10) {
        router.replace(`/board?page=1`);
      }
      router.replace(`/board?page=${props.start}`);
    };

    const nextPage = () => {
      if (props.next == true) {
        props.start + 10;
        props.end + 10;
        router.replace("/board?page=${props.page+10}");
      }
    };

    return {
      currentPage,
      prevPage,
      nextPage,
    };
  },
};
</script>
