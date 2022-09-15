<template>
  <div class="row row-cols-3 g-1">
  <div class="col" v-for="i in 6" :key="{i}">
    <div id="card">
      <img src="../assets/img/banner.jpg" class="card-img-top" alt="#" @click="link">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import router from '@/router/router';
import '../css/components/Card.css'

export default {
  name: "TheCard",
  setup(){

    


    const link = () =>{
      router.push("/routine/:workoutID")
    }
    return { link }
  }
};
</script>

<style></style>
