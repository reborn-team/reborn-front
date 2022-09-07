<template>
  <div id="create">
    <h1 class="title">{{ message }}</h1>
    <div id="collector">
      <select class="form-select one" size="7" aria-label="size 7 select example">
        <option disabled>부위</option>
        <option value="1">등</option>
        <option value="2">가슴</option>
        <option value="3">하체</option>
        <option value="4">코어</option>
      </select>
      <select
        class="form-select two"
        size="7"
        aria-label="size 7 select example"
        v-model="selected"
        @change="onchange"
      >
        <option disabled>세부사항</option>
        <option value="렛풀다운">렛풀다운</option>
        <option value="풀업">풀업</option>
        <option value="바벨로우">바벨로우</option>
        <option value="인버티드로우">인버티드 로우</option>
      </select>
      <div>
        <img :src="`${tmp[selected]}`" class="img three" alt="" />
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
import "../css/views/Workout.css";
import Table from "@/components/Table.vue";
import { reactive, ref } from "@vue/reactivity";

export default {
  name: "WorkoutCreate",
  components: { Table },
  setup() {
    const selected = ref("인버티드로우");
    const tmp = {
      렛풀다운:
        "https://images.unsplash.com/photo-1534872724459-3a23213491fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80",
      풀업: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      바벨로우:
        "https://images.unsplash.com/photo-1616803689943-5601631c7fec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      인버티드로우:
        "https://images.unsplash.com/photo-1603503364272-6e28e046b37a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80",
    };

    const onchange = (res) => {
      console.log(res.target.value);
      selected.value = res.target.value;
    };

    const arr = reactive([]);

    // 버튼

    const addWorkout = () => {
      console.log(selected.value);
      console.log(arr);
      // arr.value.push(name);
      arr.push({
        workout: selected.value,
        set: 0,
        rep: 0,
        weight: 0,
        total: 0,
      });
      console.log(arr);
    };

    const changeValue = (res, idx, k) => {
      let v = parseInt(res.target.value);
      arr[idx][k] = v > 0 ? v : 0;
      arr[idx]["total"] =
        arr[idx]["set"] * arr[idx]["rep"] * arr[idx]["weight"];
    };

    const minusWorkout = () => {
      arr.pop();
    };

    return {
      selected,
      tmp,
      arr,
      onchange,
      addWorkout,
      minusWorkout,
      changeValue,
      message:"프로그램"
    };
  },
};
</script>
