/*---------------------네이버 지도---------------------*/
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


/*---------------------모달 호출---------------------*/
var modal1 = document.getElementById("modal1");
var modal2 = document.getElementById("modal2");
var modal3 = document.getElementById("modal3");
var modal4 = document.getElementById("modal4");

// Get the button that opens the modal
var btn1 = document.querySelector(".btn1");
var btn2 = document.querySelector(".btn2");
var btn3 = document.querySelector(".btn3");
var btn4 = document.querySelector(".btn4");



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
}

/*---------------------클립보드---------------------*/
function copyText(text) {
  var textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);

  textarea.select();
  document.execCommand("copy");

  document.body.removeChild(textarea);

  alert("클립보드에 복사되었습니다.");
}

/*---------------------네이티브 쉐어---------------------*/
window.onload = function() {
    var btnShare = document.getElementById("sharebtn");
    btnShare.addEventListener("click", function() {

        var shareTitle = "보인, 유환 결혼식에 초대합니다.";
        var shareText = "이보인🤍이유환, 2023년 5월 6일 오후 2시 대전에스가든웨딩홀";
        var contentURL = "/Wedding_Invitation/";
        var URLPreFix = "";

        URLPreFix = URLPreFix + "//" + location.host;

        var shareURL = URLPreFix + contentURL;

        if (navigator.share) {
            navigator.share({
                    title: shareTitle,
                    text: shareText,
                })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        } else {
            alert("공유하기를 지원하지 않는 환경입니다.");
        }
    });
}
