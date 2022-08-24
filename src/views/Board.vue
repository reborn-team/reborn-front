<template>
  <div>
    <h1 class="title">{{ message }}</h1>
    <BoardList />
    <button type="button" class="btn btn-danger recode write">Write</button>
  </div>
  <div class="searchBar">
    <select class="form-select">
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
    <input class="form-control" type="text" placeholder="Default input" />
    <button type="button" class="btn btn-danger recode search">Search</button>
  </div><br>
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
</template>

<script>
import BoardList from "../components/List.vue";

export default {
  name: "TheBoard",
  components: { BoardList },
  data() {
    return { message: "Board" };
  },
};
</script>

<style scoped>
.write {
  float: right;
  margin: 15px 70px;
}
.searchBar {
  margin: 50px auto ;
  display: inline-flex;
}
.form-select {
  width: 10rem;
}
.pagination{
  display: inline-flex;
  margin: 0 auto;
}
</style>
