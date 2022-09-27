<template lang="ko">
  <div id="program">
    <h1 class="title">{{ message }}</h1>
    <div id="collector">
      <select class="form-select one" size="7"  @change="onchangeCategory">
        <option style="font-weight: bold;"  disabled>부위</option>
        <option value="back">등</option>
        <option value="chest">가슴</option>
        <option value="lower-body">하체</option>
        <option value="core">코어</option>
      </select>
      <select
        class="form-select two"
        size="7"
        aria-label="size 7 select example"
        v-model="selected"
        @change="onchange"
      >
        <option style="font-weight: bold;" disabled >세부사항</option>
        <option :value="i.uploadFileName" v-for="i in workout" :key="i">{{i.workoutName}}</option>
      </select>
      <div>
        <img :src="viewUrl(selected)"  alt="No image" v-if="selected!='empty'"/>
        <img
        src="../assets/img/noImage.gif"
        alt="Error"
        v-else
      />
      </div>
    </div>
    <div id="createBtn">
      <button type="button" class="btn btn-danger" @click="minusWorkout">-</button>
      <button type="button" class="btn btn-danger" @click="addWorkout">+</button>
    </div>
    <Table :arr="arr" :changeValue="changeValue" />
    <br />
    <button type="button" class="btn btn-danger recode">Create</button>
  </div>
</template>

<script>
import "../css/views/Program.css";
import Table from "@/components/Table.vue";
import { reactive, ref } from "@vue/reactivity";
import axios from "axios";

export default {
  name: "WorkoutCreate",
  components: { Table },
  setup() {
    const category = ref();
    const Token = ref(sessionStorage.getItem("TOKEN"));
    const workout = ref("");
    const selected = ref("");

    const onchangeCategory = async (i) => {
      category.value = i.target.value;

      const url = `/api/v1/my-workout/program?category=${category.value}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: Token.value,
      };
      await axios.get(url, { headers }).then((res) => {
        if (res.status === 200) {
          workout.value = res.data.list;
          console.log(workout.value);
        }
      });
    };

    const onchange = (res) => {
      selected.value = res.target.value;
      console.log(selected.value);
    };

    const arr = reactive([]);
    const addWorkout = () => {
      arr.push({
        workout: "asfwseagarsasf",
        set: 0,
        rep: 0,
        weight: 0,
        total: 0,
      });
    };
    const minusWorkout = () => {
      arr.pop();
    };
    const changeValue = (res, idx, k) => {
      let v = parseInt(res.target.value);
      arr[idx][k] = v > 0 ? v : 0;
      arr[idx]["total"] =
        arr[idx]["set"] * arr[idx]["rep"] * arr[idx]["weight"];
    };

    const viewUrl = (i) => {
      if (i != undefined) {
        return "/api/v1/file/images?filename=" + i;
      }
    };

    return {
      category,
      workout,
      selected,
      arr,
      onchangeCategory,
      onchange,
      addWorkout,
      minusWorkout,
      viewUrl,
      changeValue,
      message: "프로그램",
    };
  },
};
</script>
