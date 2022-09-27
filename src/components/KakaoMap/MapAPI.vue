<template lang="ko">
  <div ref="map" class="k-map" style="width: 100%; height: 500px"></div>
  <slot name="overlay"></slot>
</template>

<script>
let kakao = window.kakao
export default {
  props: ["options"],
  data() {
    return {
      mapInstance: null,
    };
  },
  mounted() {
    kakao = kakao || window.kakao;
    var container = this.$refs.map;

    const { center, level } = this.options;
    this.mapInstance = new kakao.maps.Map(container, {
      center: new kakao.maps.LatLng(center.lat, center.lng),
      level,
    });
  },
  watch: {
    "options.level"(cur, prev) {
      console.log(`[LEVEL CHANGED] ${prev} => ${cur}`);
      this.mapInstance.setLevel(cur);
    },
    "options.center"(cur){
      this.mapInstance.panTo(new kakao.maps.LatLng(cur.lat, cur.lng));
      console.log(cur.lat, cur.lng)
    }
  },
};
</script>
