<template>
  <div>
    <img src="../assets/img/banner.jpg" class="img-fluid" alt="" />
    <div class="d-grid gap-2 d-md-block WoBtn">
      <button class="btn btn-primary" type="button">등</button>
      <button class="btn btn-primary" type="button">가슴</button>
      <button class="btn btn-primary" type="button">하체</button>
      <button class="btn btn-primary" type="button">코어</button>
    </div>
    <hr />
    <WoCard />
    <h3>인기 운동일지</h3>
    <hr />
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td colspan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import WoCard from "@/components/WoCard.vue";

export default {
  name: "TheHome",
  components: { WoCard },
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
.card img {
  width: 18rem;
  height: 12rem;
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
  margin: 40px 10px 0 0;
}
h3 {
  text-align: left;
  margin-top: 40px;
}
</style>
