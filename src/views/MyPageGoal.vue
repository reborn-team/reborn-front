<template>
  <h1 class="title">{{message}}</h1>
  <LineChart/>
  <BarChart/>
</template>

<script>
import LineChart from '@/components/LineChart.vue';
import BarChart from '@/components/BarChart.vue';

export default {
  components: {LineChart, BarChart}
}
</script>

<style>

</style>