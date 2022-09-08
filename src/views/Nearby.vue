<template>
  <div id="nearby">
    <h1 class="title">{{ message }}</h1>
    <div class="map">
      <MapAPI />
      <table id="MapContent">
        <tr>
          <div v-for="i in 3" :key={i} >
            <input type="text" class="form-control" />
          </div>
        </tr>
      </table>
    </div>
    <hr />
    <div v-for="i in 4" :key={i}>
      <Reply/>    
    </div>
  </div>
</template>

<script>
import MapAPI from "@/components/MapAPI.vue";
import "../css/views/Nearby.css";
import Reply from "@/components/Reply.vue";

export default {
  name: "TheNearby",
  components: { MapAPI, Reply },
  setup(){
    return{
      message:"주변 헬스장"
    }
  }
};
</script>
