<template lang="ko">
  <div id="gym">
    <h1 class="title">{{ message }}</h1>
    <div class="button">
      <div class="insert">
        <input type="text" v-model="state.addr"/>
        <button type="button" class="btn btn-danger btn-sm" @click="insertGym">추가</button>
      </div>
      <div class="zoom">
        <button type="button" @click="zoom(-1)">
          <span class="material-symbols-outlined"> zoom_in </span>
        </button>
        <button type="button" @click="zoom(1)">
          <span class="material-symbols-outlined"> zoom_out </span>
        </button>
      </div>
    </div>
    
    <div class="map-area">
      <div class=searchbox>
        <div>
          <input type="text" value="헬스장" @keyup.enter="searchPlace" />
        </div>
        <div class="results">
          <div class="place" v-for="i in search.results" :key="i.id" @click="showPlace(i)">
            <h4>{{i.place_name}}</h4>
            <div class="addr">{{i.address_name}}</div>
          </div>
        </div>
      </div>
      <MapAPI ref="kmap" class="kmap" :options="mapOptions" />
      <div class="overlay-popup" ref="harborOverlay">
        <div v-if="overlayHarbor">
          <slot></slot>
          <h3>{{ overlayHarbor.place }}</h3>
          <div>{{ overlayHarbor.addr }}</div>
          <a href="#" @click.prevent="closeOverlay()"
          ><span class="material-symbols-outlined"> close </span></a>
        </div>
      </div>
    </div>

    <div class="harbors">
      <div
        class="harbor"
        v-for="hbr in harbors"
        :key="hbr.id"
        @click="showOnMap(hbr)"
        :class="{ active: hbr == activeHarbor }">
        <h4>{{ hbr.place }}</h4>
        <button class="btn btn-secondary btn-sm" @click="deleteGym(hbr)" v-if="hbr.author">삭제</button>
      </div>
    </div>
  </div>
</template>

<script>
import "@/css/views/Gym/Gym.css";
import api from "@/service/api";
import MapAPI from "@/components/KakaoMap/MapAPI.vue";
import MarkerHandler from "@/components/KakaoMap/marker-handler";
import KakaoOverlay from "@/components/KakaoMap/index";

import { reactive, ref } from "@vue/reactivity";
import axios from "axios";
import router from "@/router/router";

export default {
  name: "TheNearby",
  components: { MapAPI },
  setup() {
    const state = reactive({
      place: "",
      addr: "설명",
      lat: "",
      lng: "",
      token: sessionStorage.getItem("TOKEN"),
    });

    const mapOptions = reactive({
      center: {
        lat: 37.51726969824833,
        lng: 126.90310512252393,
      },
      level: 3,
    });

    const gym = ref();
    const gymId = ref();
    const myLat = ref();
    const myLng = ref();

    function success({ coords }) {
      mapOptions.center = {
        lat: coords.latitude,
        lng: coords.longitude,
      };
    }
    
    function getUserLocation() {
      if (!navigator.geolocation) {
        throw "위치 정보가 지원되지 않습니다.";
      }
      navigator.geolocation.getCurrentPosition(success);
    }
    getUserLocation()

    const search = reactive({
      keyword: null,
      pagination: null,
      results: [],
    });

    const searchPlace = (e) => {
      const keyword = e.target.value.trim();
      if (keyword.lenth === 0) {
        return;
      }
      const ps = new window.kakao.maps.services.Places();
      ps.keywordSearch(keyword, (data, status, pagination) => {
        (search.keyword = keyword), (search.pagination = pagination);
        search.results = data;
      });
    };

    const showPlace = (place) => {
      mapOptions.center = {
        lat: place.y,
        lng: place.x,
      };
      state.place = place.place_name;
      state.lat = mapOptions.center.lat;
      state.lng = mapOptions.center.lng;
    };

    const insertGym = async () => {
      const url = "/api/v1/gym";
      const headers = {
        "Content-Type": "application/json;",
        Authorization: state.token,
      };
      const body = {
        place: state.place,
        addr: state.addr,
        lat: state.lat,
        lng: state.lng,
      };
      await axios
        .post(url, body, { headers })
        .then((res) => {
          if (res.status == 201) {
            console.log(res.data);
            router.go();
          }
        })
        .catch(() => {
          alert("동일한 헬스장이 이미 있습니다.");
        });
    };

    const deleteGym = async (hbr) => {
      const url = `/api/v1/gym/${hbr.id}`;
      console.log(url);
      const headers = {
        "Content-Type": "application/json;",
        Authorization: state.token,
      };
      await axios.delete(url, { headers }).then((res) => {
        console.log(res.status);
        router.go();
      });
    };

    return {
      message: "헬스장",
      state,
      gym,
      gymId,
      mapOptions,
      search,
      myLat,
      myLng,
      searchPlace,
      showPlace,
      insertGym,
      deleteGym,
    };
  },

  data() {
    return {
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

    const Token = ref(sessionStorage.getItem("TOKEN"));
    const getGym = () => {
      const url = "/api/v1/gym";
      const headers = {
        "Content-Type": "application/json;",
        Authorization: Token.value,
      };
      axios.get(url, { headers }).then((res) => {
        if (res.status == 200) {
          console.log(res.data)
          this.gym = res.data;
          this.gymId = res.data.id;

          api.harbor.all(() => {
            this.harbors = this.gym;

            this.markers.add(this.harbors, (harbor) => {
              return { lat: harbor.lat, lng: harbor.lng };
            });
          });
        }
      });
    };
    getGym();

    
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
};
</script>
