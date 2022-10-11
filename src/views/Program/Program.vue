<template lang="ko">
  <div id="program">
    <h1 class="title">{{ message }}</h1>
    <div id="collector">
      <select class="form-select one" size="7" v-model="selectCategory" @change="onchangeCategory" >
        <option style="font-weight: bold;" disabled>부위</option>
        <option value="BACK">등</option>
        <option value="CHEST">가슴</option>
        <option value="LOWER_BODY">하체</option>
        <option value="CORE">코어</option>
      </select>
      <select
        class="form-select two"
        size="7"
        aria-label="size 7 select example"
        v-model="selected"
        @change="onchange"
      >
      <option style="font-weight: bold;" disabled>세부사항</option>
      <option id="selectName" :value="JSON.stringify(i)" v-for="i in workout" :key="i">{{i.workoutName}}</option>
      </select>
      <div class="programImg">
        <img
        src="@/assets/img/noImage.gif"
        alt="Error"
        v-if="selected.uploadFileName == 'empty'"
        />
        <img :src="viewUrl(selected.uploadFileName)"  alt="= 운동을 선택해주세요" v-else/>
      </div>
    </div>
    <div id="createBtn">
      <button type="button" class="btn btn-danger" @click="minusWorkout">-</button>
      <button type="button" class="btn btn-danger" @click="addWorkout">+</button>
    </div>
    <Table :arr="arr" :changeValue="changeValue" />
    <br />
    <button type="button" class="btn btn-danger recode" @click="recode">Create</button>
  </div>
  
</template>

<script>
import "@/css/views/Program/Program.css";
import Table from "@/components/WorkoutTable.vue";
import { reactive, ref } from "@vue/reactivity";
import axios from "axios";
import router from "@/router/router";

export default {
  name: "WorkoutCreate",
  components: { Table },
  setup() {
    const category = ref();
    const Token = ref(sessionStorage.getItem("TOKEN"));
    const workout = ref("");
    const selected = ref("");
    const selectCategory = ref("back");
    const seletName = ref("");
    const arr = reactive([]);
    let check = {};

    const onchangeCategory = async (i) => {
      category.value = i.target.value;

      const url = `/api/v1/workouts/me/program?category=${category.value}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: Token.value,
      };
      await axios.get(url, { headers }).then((res) => {
        if (res.status === 200) {
          workout.value = res.data.list;
        }
      });
    };

    const onchange = (res) => {
      selected.value = JSON.parse(res.target.value);
    };

    const addWorkout = () => {
      if (check[selected.value.workoutName]) {
        return alert("중복된 운동입니다.");
      }
      check[selected.value.workoutName] = true;
      arr.push({
        workoutName: selected.value.workoutName,
        total: 0,
        myWorkoutId: selected.value.myWorkoutId,
        workoutCategory: selectCategory.value,
      });
    };

    const minusWorkout = () => {
      if (arr.length) {
        let pop = arr.pop();
        check[pop.workoutName] = false;
      }
    };

    const changeValue = (res, idx, k) => {
      let v = parseInt(res.target.value);
      arr[idx][k] = v > 0 ? v : 0;
      arr[idx]["total"] =
        arr[idx]["set"] * arr[idx]["rep"] * arr[idx]["weight"];
    };

    const viewUrl = (i) => {
      if (i != undefined) {
        return "/api/v1/files/images?filename=" + i;
      }
    };

    const recode = async () => {
      const url = "/api/v1/records ";
      const headers = {
        "Content-Type": "application/json",
        Authorization: Token.value,
      };
      const body = {
        recordList: arr,
      };
      await axios.post(url, body, { headers }).then((res) => {
        if (res.status == 201) {
          alert("운동 기록이 저장되었습니다");
          router.go();
        }
      });
    };

    return {
      category,
      workout,
      selected,
      seletName,
      selectCategory,
      arr,
      onchangeCategory,
      onchange,
      addWorkout,
      minusWorkout,
      viewUrl,
      changeValue,
      recode,
      message: "프로그램",
    };
  },
};
</script>
