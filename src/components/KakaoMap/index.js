const kakao = window.kakao;
class KakaoOverlay {
  constructor(vueMap, content) {
    this.vueMap = vueMap;
    this.content = content;
    this.instance = new kakao.maps.CustomOverlay({
      map: null,
      clickable: false,
      content: content,
      position: null,
      xAnchor: 0.5,
      yAnchor: 1,
      zIndex: 3,
    });
  }
  showAt(lat, lng) {
    this.instance.setMap(this.vueMap.mapInstance);
    const pos = new kakao.maps.LatLng(lat, lng);
    this.instance.setPosition(pos);
  }
  hide() {
    this.instance.setMap(null);
  }
}

export default KakaoOverlay;
