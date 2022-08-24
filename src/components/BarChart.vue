<template>
  <div class="example">
    <apexchart
      width="800"
      height="350"
      type="bar"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: "BarExample",
  data: function() {
    return {
      chartOptions: {
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        xaxis: {
          categories: ['등', '가슴', '하체', '코어']
        }
      },
      series: [
        {
          name: "series-1",
          data: [88, 83, 70, 91]
        }
      ]
    };
  },
};
</script>