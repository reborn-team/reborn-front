<template>
  <div ref="map" class="k-map" style="width: 100%; height: 450px"></div>
</template>

<script>
export default {
  props: ["options"],
  data() {
    return {
      mapInstance: null,
    };
  },
  mounted() {
    let kakao = window.kakao;
    var container = this.$refs.map;

    // var options = {
    //   center: new kakao.maps.LatLng(35.1605598, 129.0560362),
    //   level: 4,
    // };

    const { center, level } = this.options;
    this.mapInstance = new kakao.maps.Map(container, {
      center: new kakao.maps.LatLng(center.lat, center.lng),
      level,
    });
    // console.log(mapInstance);
  },
  watch: {
    "options.level"(cur, prev) {
      console.log(`[LEVEL CHANGED] ${prev} => ${cur}`);
      this.mapInstance.setLevel(cur);
    },
  },
};
</script>
