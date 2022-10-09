<template>
  <div id="chart">
    <div class="linePeriod">
      <button class="btn btn-primary btn-sm" @click="prevWeek">&lt;</button>
      <span>{{ `${state.sunday} ~ ${state.saturday}` }}</span>
      <button class="btn btn-primary btn-sm" @click="nextWeek">&gt;</button>
    </div>
    <apexchart
      type="area"
      height="350"
      :options="chartMap.chartOptions"
      :series="chartMap.series"
      v-if="state.flag"
    ></apexchart>
  </div>
</template>

<script>
import "@/css/components/Chart/lineChart.css";
import { onMounted, reactive, ref } from "@vue/runtime-core";
import axios from "axios";

export default {
  name: "AreaChart",
  setup() {
    onMounted(() => {
      getWeekRecord(new Date().toISOString().substring(0, 10));
    });
    const Token = ref(sessionStorage.getItem("TOKEN"));
    const state = reactive({
      mon: 10,
      tue: 10,
      wed: 10,
      thu: 10,
      fri: 10,
      sat: 10,
      sun: 10,
      flag: false,
      sunday: "",
      saturday: "",
    });

    function getSunday(i) {
      let paramDate = new Date(i);
      let day = paramDate.getDay();
      let diff = paramDate.getDate() - day;
      return new Date(paramDate.setDate(diff));
    }

    function setWeekDate(date) {
      start.setDate(date.getDate());
      state.sunday = start.toISOString().substring(0, 10);
      let end = new Date(date);
      end.setDate(start.getDate() + 6);
      state.saturday = end.toISOString().substring(0, 10);
    }

    let today = new Date();
    let date = getSunday(today);
    let start = new Date();

    setWeekDate(date);

    function prevWeek() {
      state.flag = false;
      today.setDate(today.getDate() - 7);
      start = getSunday(today);
      setWeekDate(start);
      getWeekRecord(state.saturday);
    }

    function nextWeek() {
      state.flag = false;
      today.setDate(today.getDate() + 7);
      start = getSunday(today);
      setWeekDate(start);
      getWeekRecord(state.saturday);
    }

    let chartMap = {
      series: [
        {
          name: "",
          data: [10, 41, 35, 51, 49, 62, 69],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: "주간 운동 기록",
          align: "center",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        },
      },
    };

    const getWeekRecord = async (i) => {
      const url = `/api/v1/records/week?date=${i}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: Token.value,
      };
      axios.get(url, { headers }).then((res) => {
        if (res.status == 200) {
          state.mon = res.data.mon;
          state.tue = res.data.tue;
          state.wed = res.data.wed;
          state.thu = res.data.thu;
          state.fri = res.data.fri;
          state.sat = res.data.sat;
          state.sun = res.data.sun;
          chartMap.series = [
            {
              name: "",
              data: [
                state.sun,
                state.mon,
                state.tue,
                state.wed,
                state.thu,
                state.fri,
                state.sat,
              ],
            },
          ];
          state.flag = true;
        }
      });
    };

    return { getWeekRecord, state, chartMap, prevWeek, nextWeek };
  },
};
</script>