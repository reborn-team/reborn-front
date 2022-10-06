<template lang="ko">
  <MyPageNav/>
  <div id="myPageGoal">
    <h1 class="title">{{message}}</h1>
    <LineChart/>
  <div id="barChart">
    <apexchart
      width="700"
      height="300"
      type="bar"
      :options="chartMap.chartOptions"
      :series="chartMap.series"
    ></apexchart>
  </div>
  </div>
</template>

<script>
import LineChart from "@/components/Chart/LineChart.vue";
import BarChart from "@/components/Chart/BarChart.vue";
import "@/css/components/Chart/BarChart.css";
import "@/css/views/MyPage/MypageGoal.css";
import MyPageNav from "@/components/MyPageNav.vue";
import axios from "axios";
import { onMounted, reactive, ref } from "@vue/runtime-core";

export default {
  components: { LineChart, BarChart, MyPageNav },
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
    });
    let chartMap = {
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
        }
      });
    };

    return { getTodayRecord, state, chartMap };
  },
};
</script>
