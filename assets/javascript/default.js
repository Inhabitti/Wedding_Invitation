

/*네이버 지도*/
var HOME_PATH = window.HOME_PATH || '.';

var WeddingHall = new naver.maps.LatLng(36.3456884, 127.3545292),
    map = new naver.maps.Map('map', {
        center: WeddingHall.destinationPoint(0, 500),
        zoom: 15,
        logoControl: false,
        scaleControl: false
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
var zoomControl = new naver.maps.ZoomControl({
    position: naver.maps.Position.TOP_LEFT
});


// Get the modal
var modal1 = document.getElementById("modal1");
var modal2 = document.getElementById("modal2");
var modal3 = document.getElementById("modal3");
var modal4 = document.getElementById("modal4");
var modal5 = document.getElementById("modal5");
var modal6 = document.getElementById("modal6");
var modal7 = document.getElementById("modal7");
var modal8 = document.getElementById("modal8");

// Get the button that opens the modal
var btn1 = document.querySelector(".btn1");
var btn2 = document.querySelector(".btn2");
var btn3 = document.querySelector(".btn3");
var btn4 = document.querySelector(".btn4");
var btn5 = document.querySelector(".btn5");
var btn6 = document.querySelector(".btn6");
var btn7 = document.querySelector(".btn7");
var btn8 = document.querySelector(".btn8");

// When the user clicks the button, open the modal 
btn1.onclick = function() {
  modal1.style.display = "block";
}
btn2.onclick = function() {
  modal2.style.display = "block";
}
btn3.onclick = function() {
  modal3.style.display = "block";
}
btn4.onclick = function() {
  modal4.style.display = "block";
}
btn5.onclick = function() {
  modal5.style.display = "block";
}
btn6.onclick = function() {
  modal6.style.display = "block";
}
btn7.onclick = function() {
  modal7.style.display = "block";
}
btn8.onclick = function() {
  modal8.style.display = "block";
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal1) {
    modal1.style.display = "none";
  }
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
  if (event.target == modal3) {
    modal3.style.display = "none";
  }
  if (event.target == modal4) {
    modal4.style.display = "none";
  }
  if (event.target == modal5) {
    modal5.style.display = "none";
  }
  if (event.target == modal6) {
    modal6.style.display = "none";
  }
  if (event.target == modal7) {
    modal7.style.display = "none";
  }
  if (event.target == modal8) {
    modal8.style.display = "none";
  }
}


function copyText(text) {
  // 텍스트 영역 생성
  var textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);

  // 복사 실행
  textarea.select();
  document.execCommand("copy");

  // 텍스트 영역 제거
  document.body.removeChild(textarea);

  // 복사 완료 메시지 출력
  alert("복사되었습니다.");
}

