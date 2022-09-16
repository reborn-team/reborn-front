<template>
  <div class="row row-cols-3 g-1">
  <div class="col" v-for="i in page" :key="{i}">
    <div id="card" @click="link(i.workoutId)">
      <img :src="viewUrl(i.uploadFileName)" class="card-img-top" alt="#"  v-if="i.uploadFileName!='empty'">
      <img
        src="https://place-hold.it/300x300/666/fff/000.gif"
        alt=""
        v-if="i.uploadFileName == 'empty'"
      />
      <div class="card-body">
        <h5 class="card-title">{{i.workoutName}}</h5>
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
  props: ["page", "changeValue"],
  setup(){
    const link = (i) =>{
      router.push("/workout/"+i)
    }
    const viewUrl = (i) => {
      return "/api/v1/file/images?filename=" + i;
    };
    return { link ,viewUrl}
  }
};
</script>

<style></style>
