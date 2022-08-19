<template>
  <h1 class="title">{{ message }}</h1>
  <div class="d-grid gap-2 d-md-block WoBtn">
    <button class="btn btn-primary" type="button">등</button>
    <button class="btn btn-primary" type="button">가슴</button>
    <button class="btn btn-primary" type="button">하체</button>
    <button class="btn btn-primary" type="button">코어</button>
  </div>
  <hr />
  <WoCard />
</template>

<script>
import WoCard from "@/components/WoCard.vue";

export default {
  name: "WoList",
  components: { WoCard },
  data() {
    return { message: "Workout List" };
  },
};
</script>

<style scoped>
.title {
  text-align: left;
  text-decoration: underline red;
  margin: 50px 40px;
}
.WoBtn {
  text-align: left;
  border-color: none;
  background-color: none;
}
.btn-primary {
  background-color: white;
  border-color: red;
  color: black;
  --bs-btn-hover-bg: red;
  --bs-btn-hover-border-color: none;
  margin: 0px 20px 0 30px;
}
</style>
