<template>
  <div id="barChart">
    <apexchart
      width="700"
      height="300"
      type="bar"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import "../css/components/BarChart.css"

export default {
  name: "BarExample",
  setup() {
    return {
      chartOptions: {
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        xaxis: {
          categories: ["등", "가슴", "하체", "코어"],
        },
      },
      series: [
        {
          name: "series-1",
          data: [88, 83, 70, 91],
        },
      ],
    };
  },
};
</script>