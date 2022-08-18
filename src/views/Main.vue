<template>
  <div>
    <img src="../assets/img/banner.jpg" class="img-fluid" alt="" />
    <hr >
    <div class="card" style="width: 18rem">
      <img src="../assets/img/banner.jpg" class="card-img-top" alt="" href="#" />
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheHome",
  data() {
    return { message: "Home" };
  },
};
</script>

<style scoped>
img {
  width: 100vw;
  height: 35vw;
}
.card img{
  width: 18rem;
  height: 12rem;
}
</style>
