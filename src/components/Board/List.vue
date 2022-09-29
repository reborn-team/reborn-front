<template lang="ko">
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
        <tr v-for="i in pageList" :key="i" @click="link">
          <th scope="row" >{{i.id}}</th>
          <td>{{i.title}}</td>
          <td>{{i.memberNickname}}</td>
          <td>{{i.regDate}}</td>
          <td>{{i.viewCount}}</td>
        </tr>
      </tbody>
    </table> 
  </div>
</template>

<script>
import router from '@/router/router';
import "../../css/components/List.css";
export default {
  name: "TheList",
  props: ["pageList"],
  setup() {
    const link = () => {
      router.push("/board/content")
    };

    return { link };
  },
};
</script>
