<template>
  <div class="row row-cols-1 row-cols-md-1 g-4">
  <div class="col">
    <div id="card">
      <img src="../assets/img/banner.jpg" class="card-img-top" @click="link">
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

      router.push("/workout/detail")
    }
    return { link }
  }
};
</script>

<style></style>
