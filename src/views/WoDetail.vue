<template>
  <h1 class="title">{{ message }}</h1>
  <div class="explain">
    <div class="card" style="width: 18rem">
      <img src="../assets/img/banner.jpg" class="card-img-top" alt="" href="#"/>
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
      </div>
    </div>
    <div class="detail"></div>
  </div>
</template>

<script>
export default {
  name: "WoDetail",
  data() {
    return { message: "WorkOut Name" };
  },
};
</script>

<style scoped>
.title {
  display: flex;
  text-decoration: underline red;
  margin: 50px 170px;
}
.explain{
  display: inline-flex;
}
.detail {
  width: 500px;
  height: 400px;
  border-bottom: 1px solid red;
}
</style>
