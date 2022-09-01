<template>
  <div id="list">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">글 번호</th>
          <th scope="col">제목</th>
          <th scope="col">작성자</th>
          <th scope="col">날짜</th>
          <th scope="col">조회 수</th>
        </tr>
      </thead>
      <tbody class="table-group-divider" >
        <tr v-for="i in 5" :key="{i}">
          <th scope="row">1</th>
          <td>더미 1</td>
          <td>김아무개</td>
          <td>2022/08/01</td>
          <td>42</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import "../css/components/List.css";
export default {
  name: "TheList",
  setup() {
    const moveTo = () => {};

    return { moveTo };
  },
};
</script>
