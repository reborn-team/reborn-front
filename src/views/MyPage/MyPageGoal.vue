<template lang="ko">
  <MyPageNav/>
  <div id="myPageGoal">
    <h1 class="title">{{message}}</h1>
    <LineChart/>
    <BarChart/>
  </div>
</template>

<script>
import LineChart from "@/components/Chart/LineChart.vue";
import BarChart from "@/components/Chart/BarChart.vue";
import "@/css/components/Chart/BarChart.css";
import "@/css/views/MyPage/MypageGoal.css";
import MyPageNav from "@/components/MyPageNav.vue";

export default {
  components: { LineChart, BarChart, MyPageNav },
  setup() {},
};
</script>
