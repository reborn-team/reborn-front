<template>
  <div>
    <h1 class="title">{{ message }}</h1>
    <select class="form-select" size="7" aria-label="size 7 select example">
      <option selected>부위</option>
      <option value="1">등</option>
      <option value="2">가슴</option>
      <option value="3">하체</option>
      <option value="4">코어</option>
    </select>
    <select class="form-select" size="7" aria-label="size 7 select example">
      <option value="1">렛풀다운</option>
      <option value="2">풀업</option>
      <option value="3">바벨로우</option>
      <option value="4">인버티드 로우</option>
    </select>
    <div>
      <button type="button" class="btn btn-danger">+</button><br />
      <button type="button" class="btn btn-danger">-</button>
    </div>
    <select class="form-select" size="8" aria-label="size 8 select example" ></select><br />
    <div class="thumbnail">
      <img src="../assets/img/banner.jpg" class="img-thumbnail" alt="" width="500px" height="400px"/>
      <div class="explain"></div>
    </div><br>
  <button type="button" class="btn btn-danger recode">Create</button>
  </div>
</template>

<script>
export default {
  name: "WoCreate",
  data() {
    return { message: "Create Workout Program" };
  },
};
</script>

<style scoped>
div {
  display: inline-block;
}
.title {
  text-align: left;
  text-decoration: underline red;
  margin: 50px 40px 0px;
}
.form-select {
  display: inline-block;
  width: 300px;
  margin: 20px;
}
.thumbnail {
  display: inline-flex;
  margin-top: 50px;
  float: left;
}
.explain {
  width: 500px;
  height: 400px;
  border-bottom: 1px solid red;
}
.btn {
  text-align: center;
  width: 35px;
  height: 35px;
  margin: 2px 10px;
  --bs-btn-active-color: #dc3545;
  --bs-btn-active-bg: white;
}
.recode {
  margin-top: 20px;
  width: 7rem;
  float: right;
}
</style>
