<template lang="ko">
  <div id="program">
    <h1 class="title">{{ message }}</h1>
    <div id="collector">
      <select class="form-select one" size="7" v-model="selected" @change="onchangeCategory">
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
        <option value="렛풀다운" >렛풀다운</option>
        <option value="풀업">풀업</option>
        <option value="바벨로우">바벨로우</option>
        <option value="인버티드로우">인버티드 로우</option>
          <option value="" v-for="i in back" :key="i">{{i}}</option>
      </select>
      <div>
        <img :src="`${back[selected]}`"  alt="" />
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
// import program from '../service/program.json'

export default {
  name: "WorkoutCreate",
  components: { Table },
  setup() {
    const category = ref();

    const selected = ref("렛풀다운");
    const back = {
      렛풀다운:
        "https://images.unsplash.com/photo-1534872724459-3a23213491fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80",
      풀업: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      바벨로우:
        "https://images.unsplash.com/photo-1616803689943-5601631c7fec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      인버티드로우:
        "https://images.unsplash.com/photo-1603503364272-6e28e046b37a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80",
    };

    const onchangeCategory = (res) => {
      category.value = res.target.value;
      console.log(category.value)
    }

    const onchange = (res) => {
      selected.value = res.target.value;
      console.log(selected.value)
    };

    const arr = reactive([]);
    const addWorkout = () => {
      arr.push({
        workout: selected.value,
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

    return {
      category,
      selected,
      back,
      arr,
      onchangeCategory,
      onchange,
      addWorkout,
      minusWorkout,
      changeValue,
      message:"프로그램"
    };
  },
};
</script>
