<template lang="ko">
  <div id="barChart">
    <apexchart
      width="700"
      height="300"
      type="bar"
      :options="chartMap.chartOptions"
      :series="chartMap.series"
      v-if="state.flag"
    ></apexchart>
  </div>
</template>

<script>
import "@/css/components/Chart/BarChart.css"
import { onMounted, reactive, ref } from '@vue/runtime-core';
import axios from 'axios';

export default {
  name: "BarExample",
  setup() {
    onMounted(() => {
      getTodayRecord();
    });
    const Token = ref(sessionStorage.getItem("TOKEN"));
    const state = reactive({
      back: 10,
      chest: 10,
      lowerBody: 10,
      core: 10,
      flag: false,
    });
    let chartMap = {
      chartOptions: {
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        title : {
          text: "일간 부위별 운동 기록",
          align: "center"
        },
        xaxis: {
          categories: ["등", "가슴", "하체", "코어"],
        },
      },
      series: [
        {
          name: "series-1",
        },
      ],
    };

    const getTodayRecord = async () => {
      const url = "/api/v1/record/today";
      const headers = {
        "Content-Type": "application/json",
        Authorization: Token.value,
      };
      axios.get(url, { headers }).then((res) => {
        if (res.status == 200) {
          state.back = res.data.back;
          state.chest = res.data.chest;
          state.lowerBody = res.data.lowerBody;
          state.core = res.data.core;
          chartMap.series = [
            {
              name: "series-1",
              data: [state.back, state.chest, state.lowerBody, state.core],
            },
          ];
          state.flag = true;
        }
      });
    };

    return { getTodayRecord, state, chartMap };
  },
};
</script>