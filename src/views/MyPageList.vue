<template>
  <MyPageNav/>
  <div id="MyPageList">
    <List/>
        <!-- 서치 옵션 -->
        <div id="searchBar">
      <select class="form-select">
        <option value="1">제목</option>
        <option value="2">작성자</option>
      </select>
      <input class="form-control" type="text" />
      <button type="button" class="btn btn-danger recode search">Search</button>
    </div>

    <!-- 페이지네이션 -->
    <div id="boardPagi" class="pagination-div">
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
import List from '@/components/List.vue';
import '../css/views/MyPageList.css';
import MyPageNav from '@/components/MyPageNav.vue';

export default {
    components: { List, MyPageNav }
}
</script>

<style>

</style>