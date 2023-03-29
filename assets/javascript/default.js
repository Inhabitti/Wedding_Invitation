

/*네이버 지도*/
var HOME_PATH = window.HOME_PATH || '.';

var WeddingHall = new naver.maps.LatLng(36.3456884, 127.3545292),
    map = new naver.maps.Map('map', {
        center: WeddingHall.destinationPoint(0, 500),
        zoom: 15
    }),
    marker = new naver.maps.Marker({
        map: map,
        position: WeddingHall
    });

var marker = new naver.maps.Marker({
  map: map,
  position: WeddingHall,
  iconImage: {
    size: new naver.maps.Size(30, 30)
  }
});


