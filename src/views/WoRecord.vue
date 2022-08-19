<template>
  <h1 class="title">{{message}}</h1>
</template>

<script>
export default {
  name: "WoRecord",
  data(){
    return {message:"Record Workout Program"}
  }
}
</script>

<style>
.title {
  text-align: left;
  text-decoration: underline red;
  margin: 50px 40px 0px;
}
</style>