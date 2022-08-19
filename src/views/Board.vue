<template>
  <div>
    <h1 class="title">{{message}}</h1>
    <BoardList/>
    <button type="button" class="btn btn-danger recode write">Write</button>
  </div>
  <div class="searchBar">
    <select class="form-select">
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
    <input class="form-control" type="text" placeholder="Default input">
    <button type="button" class="btn btn-danger recode search">Search</button>
  </div>
</template>

<script>
import BoardList from '../components/BoardList.vue';

export default {
  name: "TheBoard",
  components: {BoardList},
  data(){
    return {message:"Board"}
  }
}
</script>

<style scoped>
.title {
  display: flex;
  text-decoration: underline red;
  margin: 50px 170px;
}
.write {
  float: right;
  margin: 15px 70px;
}
.searchBar{
}
input.form-control{
  width: 30%;
  margin: 100px auto;
}
input.form-select{
  width: 10%;
}
</style>