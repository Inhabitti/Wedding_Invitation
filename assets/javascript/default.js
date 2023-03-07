/* 방명록 */
// 방명록 입력폼과 메시지 리스트를 가져오기
const guestbookForm = document.getElementById('guestbook-form');
const guestbookInput = document.getElementById('guestbook-input');
const guestbookMessages = document.getElementById('guestbook-messages');

// 방명록 메시지를 localStorage에서 불러오기
let guestbookData = localStorage.getItem('guestbookData');
guestbookData = guestbookData ? JSON.parse(guestbookData) : [];

// 메시지 리스트를 출력하는 함수
function renderMessages() {
  guestbookMessages.innerHTML = '';
  guestbookData.forEach((message) => {
    const li = document.createElement('li');
    li.textContent = message;
    guestbookMessages.appendChild(li);
  });
}

// 입력 폼 제출 시 실행되는 함수
function handleSubmit(event) {
  event.preventDefault();
  const message = guestbookInput.value.trim();
  if (!message) {
    return;
  }
  guestbookData.push(message);
  localStorage.setItem('guestbookData', JSON.stringify(guestbookData));
  renderMessages();
  guestbookInput.value = '';
}

// 페이지 로드 시 메시지 리스트 출력
renderMessages();

// 이벤트 리스너 등록
guestbookForm.addEventListener('submit', handleSubmit);

