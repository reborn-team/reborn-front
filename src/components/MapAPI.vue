<template>
  <div ref="map" style="width: 100%; height: 450px"></div>
</template>

<script>
export default {
  mounted() {
    let kakao = window.kakao;
    var container = this.$refs.map; 
  
    var options = {
      center: new kakao.maps.LatLng(35.1605598, 129.0560362),
      level: 4, 
    };

    var map = new kakao.maps.Map(container, options);
    console.log(map);
  },
};
</script>
