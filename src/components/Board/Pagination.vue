<template>
  <div id="boardPagi" class="pagination-div">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous" :aria-disabled="start===1">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="i in pageNumberList" :key="i"><a class="page-link" href="#">{{i}}
        </a></li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true" @click="nextPage">&raquo;</span>
          </a>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: "ThePaginamtion",
  props: ['page','prev','next','start','end','pageNumberList','totalPage'],
  setup(){
    const nextPage = (props) => {
      props.page += 1;
    }

    return {
      nextPage
    }
  }
}
</script>