<template>
  <div id="nearby">
    <h1 class="title">{{ message }}</h1>
    <div class="map-area">
      <button type="button" @click="zoom(1)">
        <span class="material-symbols-outlined"> zoom_in </span>
      </button>
      <button type="button" @click="zoom(-1)">
        <span class="material-symbols-outlined"> zoom_out </span>
      </button>
      <MapAPI ref="kmap" class="kmap" :options="mapOptions" />
      <div class="overlay-popup" ref="harborOverlay">
        <div v-if="overlayHarbor">
          <slot></slot>
          <h3>{{ overlayHarbor.place }}</h3>
          <div>{{ overlayHarbor.addr }}</div>
          <a href="#" @click.prevent="closeOverlay()"
            ><span class="material-symbols-outlined"> close </span></a
          >
        </div>
      </div>
    </div>
    <div class="harbors">
      <div
        class="harbor"
        v-for="hbr in harbors"
        :key="hbr.seq"
        @click="showOnMap(hbr)"
        :class="{ active: hbr == activeHarbor }"
      >
        <h4>{{ hbr.place }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import "../css/views/Nearby.css";
import api from "../service/api";
import MapAPI from "@/components/KakaoMap/MapAPI.vue";
import MarkerHandler from "../components/KakaoMap/marker-handler";
import KakaoOverlay from "../components/KakaoMap/index";

export default {
  name: "TheNearby",
  components: { MapAPI },
  data() {
    return {
      mapOptions: {
        center: {
          lat: 35.1605598,
          lng: 129.0560362,
        },
        level: 3,
      },
      harbors: [],
      markers: null,
      activeHarbor: null,

      overlay: null,
      overlayHarbor: null,
    };
  },
  mounted() {
    const vueKakaoMap = this.$refs.kmap;

    this.markers = new MarkerHandler(vueKakaoMap, {
      markerClicked: (harbor) => {
        this.showOnMap(harbor);
        this.overlayHarbor = harbor;
        this.overlay.showAt(harbor.lat, harbor.lng);
      },
    });

    this.overlay = new KakaoOverlay(vueKakaoMap, this.$refs.harborOverlay);

    api.harbor.all((res) => {
      console.log("[헬스장 목록] :", res.harbors);
      this.harbors = res.harbors;

      this.markers.add(this.harbors, (harbor) => {
        return { lat: harbor.lat, lng: harbor.lng };
      });
    });
  },
  methods: {
    zoom(delta) {
      const level = Math.max(3, this.mapOptions.level + delta);
      this.mapOptions.level = level;
    },
    showOnMap(harbor) {
      this.activeHarbor = harbor;
      this.mapOptions.center = {
        lat: harbor.lat,
        lng: harbor.lng,
      };
    },
    closeOverlay() {
      this.overlay.hide();
    },
  },
  setup() {
    return {
      message: "주변 헬스장",
    };
  },
};
</script>
