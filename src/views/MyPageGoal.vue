<template>
  <div id="goal">
    <h1 class="title">{{message}}</h1>
    <LineChart/>
    <BarChart/>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart.vue';
import BarChart from '@/components/BarChart.vue';
import '../css/views/MypageGoal.css'

export default {
  components: {LineChart, BarChart}
}
</script>

<style>

</style>