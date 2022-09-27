<template lang="ko">
  <MyPageNav/>
  <div id="myPageGoal">
    <h1 class="title">{{message}}</h1>
    <LineChart/>
    <BarChart/>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart.vue';
import BarChart from '@/components/BarChart.vue';
import '../css/views/MypageGoal.css'
import MyPageNav from '@/components/MyPageNav.vue';

export default {
  components: { LineChart, BarChart, MyPageNav }
}
</script>
