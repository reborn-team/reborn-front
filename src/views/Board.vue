<template>
  <div id="boardWrap">
    <div id="boardList">
      <h1 class="title">{{ message }}</h1>
      <BoardList />
      <a href="/board/write">
        <button type="button" class="btn btn-danger recode write">Write</button>
      </a>
    </div>
      <div id="searchBar">
        <select class="form-select">
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
        <input class="form-control" type="text" placeholder="Default input" />
        <button type="button" class="btn btn-danger recode search">
          Search
        </button>
      </div>
      <div class="pagination-div">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import BoardList from "../components/List.vue";
import "../css/views/Board.css";

export default {
  name: "TheBoard",
  components: { BoardList },
  data() {
    return { message: "Board" };
  },
};
</script>
