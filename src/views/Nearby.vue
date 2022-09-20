<template>
  <div id="nearby">
    <h1 class="title">{{ message }}</h1>
      <button type="button" class="btn btn-danger" @click="zoom(1)">
        <span class="material-symbols-outlined"> zoom_in </span>
      </button>
      <button type="button" class="btn btn-danger" @click="zoom(-1)">
        <span class="material-symbols-outlined"> zoom_out </span>
      </button>
      <div class="map-area">
        <div class="harbors">
          <div class="harbor" v-for="hbr in harbors" :key="hbr.seq">
            <h4>{{hbr.place}}</h4>
          </div>
        </div>
        <MapAPI :options="mapOptions" />
      </div>
    <hr />
    <div v-for="i in 4" :key="{ i }">
      <Reply />
    </div>
  </div>
</template>

<script>
import MapAPI from "@/components/MapAPI.vue";
import api from "../service/api";
import "../css/views/Nearby.css";
import Reply from "@/components/Reply.vue";

export default {
  name: "TheNearby",
  components: { MapAPI, Reply },
  data() {
    return {
      mapOptions: {
        center: {
          lat: 35.1605598,
          lng: 129.0560362,
        },
        level: 4,
      },
      harbors: [],
    };
  },
  mounted() {
    api.harbor.all((res) => {
      console.log("[헬스장 목록] :", res.harbors);
      this.harbors = res.harbors;
    });
  },
  methods: {
    zoom(delta) {
      const level = Math.max(3, this.mapOptions.level + delta);
      this.mapOptions.level = level;
    },
  },
  setup() {
    return {
      message: "주변 헬스장",
    };
  },
};
</script>
