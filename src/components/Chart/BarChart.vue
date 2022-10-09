<template lang="ko">
  <div id="barChart">
    <div class="linePeriod">
      <button class="btn btn-primary btn-sm" @click="getDay(-1)">&lt;</button>
      <span>{{ `${state.today}` }}</span>
      <button class="btn btn-primary btn-sm" @click="getDay(1)">&gt;</button>
    </div>
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
import "@/css/components/Chart/BarChart.css";
import { onMounted, reactive, ref } from "@vue/runtime-core";
import axios from "axios";

export default {
  name: "BarExample",
  setup() {
    onMounted(() => {
      getTodayRecord(new Date().toISOString().substring(0, 10));
    });
    const Token = ref(sessionStorage.getItem("TOKEN"));
    const state = reactive({
      back: 10,
      chest: 10,
      lowerBody: 10,
      core: 10,
      flag: false,
      today: "",
    });
    let chartMap = {
      chartOptions: {
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        title: {
          text: "일간 부위별 운동 기록",
          align: "center",
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
    let today = new Date();
    state.today = today.toISOString().substring(0, 10);

    function getDay(i) {
      state.flag = false;
      today.setDate(today.getDate() + i);
      state.today = today.toISOString().substring(0, 10);
      getTodayRecord(state.today);
    }

    const getTodayRecord = async (i) => {
      const url = "/api/v1/records/day?date=" + i;
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
              name: "",
              data: [state.back, state.chest, state.lowerBody, state.core],
            },
          ];
          state.flag = true;
        }
      });
    };

    return { getTodayRecord, getDay, state, chartMap };
  },
};
</script>