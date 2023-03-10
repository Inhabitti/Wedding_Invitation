/* 방명록 입력 */
// 이벤트 리스너를 추가하여 form 전송 시 동작하도록 함
document.getElementById('guestbook-form').addEventListener('submit', function(event) {
  // 기본 전송 동작을 막음
  event.preventDefault();

  // 입력된 메시지를 가져와 변수에 저장
  var message = document.getElementById('guestbook-input').value;

  // 메시지를 표시할 li 요소를 생성
  var messageLi = document.createElement('li');

  // li 요소에 메시지 내용을 추가
  messageLi.textContent = message;

  // 메시지가 표시될 영역에 li 요소를 추가
  document.getElementById('guestbook-messages').appendChild(messageLi);

  // 입력 필드를 초기화하여 새로운 메시지를 입력할 수 있도록 함
  document.getElementById('guestbook-input').value = '';
});



/* 방명록 로컬 스토리지*/
function addMessageToLocalStorage(message) {
  // 로컬 스토리지에서 이전에 저장된 메시지들을 불러옵니다.
  const messages = JSON.parse(localStorage.getItem('guestbookMessages')) || [];

  // 새로운 메시지 객체를 생성합니다.
  const newMessage = {
    id: Date.now(),
    text: message,
    timestamp: new Date().toISOString(),
  };

  // 새로운 메시지 객체를 로컬 스토리지의 메시지 배열에 추가합니다.
  messages.push(newMessage);

  // 로컬 스토리지에 메시지 배열을 저장합니다.
  localStorage.setItem('guestbookMessages', JSON.stringify(messages));
}
function getMessagesFromLocalStorage() {
  // 로컬 스토리지에서 이전에 저장된 메시지들을 불러옵니다.
  const messages = JSON.parse(localStorage.getItem('guestbookMessages')) || [];

  return messages;
}
window.addEventListener('load', () => {
  const messages = getMessagesFromLocalStorage();

  messages.forEach((message) => {
    const li = document.createElement('li');
    li.innerHTML = `${message.text} <span class="timestamp">${new Date(message.timestamp).toLocaleString()}</span>`;
    guestbookMessages.appendChild(li);
  });
});


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

var contentString = [
    '<div class="iw_inner">',
    '   <h3>S가든웨딩</h3>',
    '   <p>대전광역시 서구 월드컵대로484번안길 10<br />',
    '       <a href="nmap://route/public?dlat=36.3456884&dlng=127.3545292&dname=S%EA%B0%80%EB%93%A0%EC%9B%A8%EB%94%A9/" target="_blank">길찾기</a>',
    '   </p>',
    '</div>'
].join('');

var infowindow = new naver.maps.InfoWindow({
    content: contentString,
    maxWidth: 350,
    backgroundColor: "#eee",
    borderColor: "#010101",
    borderWidth: 1,
    anchorSize: new naver.maps.Size(30, 30),
    anchorSkew: true,
    anchorColor: "#eee",
    pixelOffset: new naver.maps.Point(20, -20)
});

naver.maps.Event.addListener(marker, "click", function(e) {
    if (infowindow.getMap()) {
        infowindow.close();
    } else {
        infowindow.open(map, marker);
    }
});


/*타이핑애니메이션*/
const content = "INVITATION";
const text = document.querySelector(".text");
let i = 0;

text.style.position = "relative";
text.style.left = "0";
text.style.right = "0";
text.style.margin = "auto";

function typing() {
  let txt = content[i++];
  text.innerHTML += txt;
  if (i === content.length) {
    setTimeout(resetTyping, 5000); // 타이핑 종료 후 5초 딜레이 후에 초기화
  } else {
    setTimeout(typing, 200); // 타이핑 중 200ms 딜레이
  }
}

function resetTyping() {
  text.textContent = "";
  i = 0;
  setTimeout(typing, 5000); // 초기화 후 5초 딜레이 후에 타이핑 시작
}

setTimeout(typing, 0); // 최초 딜레이 없이 타이핑 시작


