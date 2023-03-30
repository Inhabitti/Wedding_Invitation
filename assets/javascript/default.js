

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


// Get the modal
var modal1 = document.getElementById("modal1");
var modal2 = document.getElementById("modal2");

// Get the button that opens the modal
var btn1 = document.querySelector(".btn1");
var btn2 = document.querySelector(".btn2");

// Get the <span> element that closes the modal
var close1 = document.querySelector("#modal1 .close");
var close2 = document.querySelector("#modal2 .close");

// When the user clicks the button, open the modal 
btn1.onclick = function() {
  modal1.style.display = "block";
}
btn2.onclick = function() {
  modal2.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
close1.onclick = function() {
  modal1.style.display = "none";
}
close2.onclick = function() {
  modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal1) {
    modal1.style.display = "none";
  }
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
}

// 모달창 닫기 함수
function closeModal(modal) {
  modal.classList.remove('modal');
}

// 모든 닫기 버튼에 대해 이벤트 리스너 추가
var closeBtns = document.querySelectorAll('.close');
closeBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    var modal = this.closest('.modal');
    closeModal(modal);
  });
});

// 모든 모달창에 대해 열기 버튼에 이벤트 리스너 추가
var openBtns = document.querySelectorAll('.btn1');
openBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    var modal = this.nextElementSibling;
    modal.classList.add('modal');
  });
});
