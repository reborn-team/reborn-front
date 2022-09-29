<template lang="ko">
  <div id="nearby">
    <h1 class="title">{{ message }}</h1>
    <div class="map-area">
      <div class="zoom">
        <button type="button" @click="zoom(-1)">
          <span class="material-symbols-outlined"> zoom_in </span>
        </button>
        <button type="button" @click="zoom(1)">
          <span class="material-symbols-outlined"> zoom_out </span>
        </button>
      </div>
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

    <div class="input-container">
      <textarea class="form-control reply-input"></textarea>
      <select class="form-select" aria-label="Default select example">
        <option selected disabled>별점</option>
        <option value="1">⭐</option>
        <option value="2">⭐⭐</option>
        <option value="3">⭐⭐⭐</option>
        <option value="3">⭐⭐⭐⭐</option>
        <option value="3">⭐⭐⭐⭐⭐</option>
      </select>
      <button class="btn btn-danger btn-sm enterBtn">등록</button>
    </div>

    <h6 class="reply">평가</h6>
    <div class="reviewsWrap p-4" v-for="i in 4" :key="i">
      <div class="reviews-members">
        <div class="reviews-members-header">
          <div>
            <h6 class="mb-0">작성자</h6>
            <p class="text-gray mb-3">작성시간</p>
          </div>          
            <div>⭐⭐⭐⭐⭐</div>
        </div>
        <div class="reviews-members-body">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique,
            enim exercitationem quisquam quas culpa nostrum ea porro minima
            molestias? Fugit inventore numquam tempore eveniet, minima incidunt
            laborum nobis harum quibusdam!
          </p>
        </div>
        <div class="review-members-btn">
          <button class="btn btn-warning btn-sm mBtn">수정</button>
          <button class="btn btn-secondary btn-sm">삭제</button>
          <!-- <div style="margin-top: 10px">
              <input type="text" />
              <button class="btn">확인</button>
            </div> -->
        </div>
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
          lat: 35.1544453,
          lng: 129.060646,
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
      message: "평가",
    };
  },
};
</script>
