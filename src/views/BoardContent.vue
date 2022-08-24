<template>
  <div class="article">
    <div class="article-subject">
      <h2>제목 :</h2>
      <div class="container subject" max-width="xl"></div>
    </div>
    <div class="container content"></div>
    <button type="button" class="btn btn-danger ">Modify</button>  
    <button type="button" class="btn btn-danger ">Delete</button>
  </div>
  <input type="text" class="form-control" />
  <button type="button" class="btn btn-danger enter">Enter</button>
  <hr />
  <div class="rely">
    <div class="reply-header">
      <h6 class="id">
        ID
      </h6>
      <p class="time">
        Time
      </p>
    </div>
    <div class="reply-body">
      <p>
        Content
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "BoardContent",
  data() {},
};
</script>

<style scoped>
.article {
  margin-bottom: 30px;
}
.article-subject {
  display: inline-flex;
}
.subject {
  width: 250px;
  height: 40px;
  border: 1px solid red;
  margin-left: 20px;
}
.content {
  width: 800px;
  height: 600px;
  border: 1px solid red;
}
.form-control {
  width: 800px;
  height: 70px;
  margin: 0px auto;
}
.enter {
  margin: 5px auto;
}
.rely{
  width: 800px;
  height: 120px;
  background-color: antiquewhite;
  margin: 5px auto;
  text-align: left;
  padding: 10px;
}
</style>
